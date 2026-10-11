import { useEffect, useRef, useState } from 'react';
import CoachLookup from './components/CoachLookup.jsx';
import Icon from './components/Icon.jsx';
import LiveLookup from './components/LiveLookup.jsx';
import LiveResult from './components/LiveResult.jsx';
import Overview from './components/Overview.jsx';
import PageHeader from './components/PageHeader.jsx';
import Sidebar from './components/Sidebar.jsx';
import TrainCollection from './components/TrainCollection.jsx';
import TrainFormModal from './components/TrainFormModal.jsx';
import { checkApiHealth, getCoachPositions, getTrainLive } from './lib/api.js';
import { readSavedTrains, writeSavedTrains } from './lib/storage.js';

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [trains, setTrains] = useState(readSavedTrains);
  const [modalTrain, setModalTrain] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);
  const [liveTrainNumber, setLiveTrainNumber] = useState('');
  const [liveResult, setLiveResult] = useState(null);
  const [liveError, setLiveError] = useState('');
  const [liveLoading, setLiveLoading] = useState(false);
  const [coachResult, setCoachResult] = useState(null);
  const [coachError, setCoachError] = useState('');
  const [coachLoading, setCoachLoading] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const liveRequestId = useRef(0);
  const coachRequestId = useRef(0);

  useEffect(() => {
    checkApiHealth().then(() => setApiOnline(true)).catch(() => setApiOnline(false));
  }, []);

  useEffect(() => {
    setStorageError(!writeSavedTrains(trains));
  }, [trains]);

  function openAddModal() {
    setModalTrain(null);
    setModalOpen(true);
  }

  function saveTrain(formData) {
    if (modalTrain) {
      setTrains((current) => current.map((train) => (
        train.id === modalTrain.id ? { ...train, ...formData } : train
      )));
    } else {
      const id = globalThis.crypto?.randomUUID?.()
        || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setTrains((current) => [{ ...formData, id }, ...current]);
    }

    setModalOpen(false);
    setModalTrain(null);
  }

  function editTrain(train) {
    setModalTrain(train);
    setModalOpen(true);
  }

  function deleteTrain(id) {
    setTrains((current) => current.filter((train) => train.id !== id));
  }

  async function searchLive(number) {
    if (!/^\d{5}$/.test(number)) {
      liveRequestId.current += 1;
      setLiveTrainNumber(number);
      setLiveResult(null);
      setLiveError('Enter a valid 5-digit train number.');
      setLiveLoading(false);
      return;
    }

    const requestId = liveRequestId.current + 1;
    liveRequestId.current = requestId;
    setLiveTrainNumber(number);
    setLiveLoading(true);
    setLiveError('');
    setLiveResult(null);

    try {
      const response = await getTrainLive(number);
      if (requestId === liveRequestId.current) {
        setLiveResult(response);
        setApiOnline(true);
      }
    } catch (error) {
      if (requestId === liveRequestId.current) {
        setLiveError(error.message);
      }
    } finally {
      if (requestId === liveRequestId.current) {
        setLiveLoading(false);
      }
    }
  }

  async function searchCoach(number, stationCode) {
    if (!/^\d{5}$/.test(number)) {
      coachRequestId.current += 1;
      setCoachError('Enter a valid 5-digit train number.');
      setCoachResult(null);
      setCoachLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9]{2,10}$/.test(stationCode)) {
      coachRequestId.current += 1;
      setCoachError('Enter a valid station code (2–10 letters or numbers).');
      setCoachResult(null);
      setCoachLoading(false);
      return;
    }

    const requestId = coachRequestId.current + 1;
    coachRequestId.current = requestId;
    setCoachLoading(true);
    setCoachError('');
    setCoachResult(null);

    try {
      const response = await getCoachPositions(number, stationCode);
      if (requestId === coachRequestId.current) {
        setCoachResult(response);
        setApiOnline(true);
      }
    } catch (error) {
      if (requestId === coachRequestId.current) {
        setCoachError(error.message);
      }
    } finally {
      if (requestId === coachRequestId.current) {
        setCoachLoading(false);
      }
    }
  }

  function trackTrain(number) {
    setActiveView('overview');
    searchLive(number);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} apiOnline={apiOnline} onNavigate={setActiveView} />
      <main className="main-content">
        <PageHeader activeView={activeView} onAddTrain={openAddModal} savedCount={trains.length} />
        {storageError && <div className="storage-warning" role="status">Browser storage is full. Your latest changes may not be saved.</div>}
        <div className="page-content" key={activeView}>
          {activeView === 'overview' && (
            <Overview
              coachError={coachError}
              coachLoading={coachLoading}
              coachResult={coachResult}
              liveError={liveError}
              liveLoading={liveLoading}
              liveResult={liveResult}
              liveTrainNumber={liveTrainNumber}
              onAdd={openAddModal}
              onCoachSearch={searchCoach}
              onDelete={deleteTrain}
              onEdit={editTrain}
              onLiveSearch={searchLive}
              onTrack={trackTrain}
              onViewTrains={() => setActiveView('trains')}
              trains={trains}
            />
          )}
          {activeView === 'trains' && (
            <div className="view-panel">
              <div className="panel-intro"><Icon name="bookmark" size={19} /><span>Keep the trains you travel on often in one easy place.</span></div>
              <TrainCollection onAdd={openAddModal} onDelete={deleteTrain} onEdit={editTrain} onTrack={trackTrain} trains={trains} />
            </div>
          )}
          {activeView === 'coaches' && (
            <div className="coach-page-layout">
              <div className="coach-page-copy">
                <span className="eyebrow">A BETTER BOARDING MOMENT</span>
                <h2>Find your spot<br />on the platform.</h2>
                <p>Enter your train number and boarding station code to look up the coach arrangement.</p>
                <div className="coach-page-illustration" aria-hidden="true"><Icon name="train" size={50} strokeWidth={1.2} /><span /><span /><span /></div>
              </div>
              <CoachLookup error={coachError} loading={coachLoading} onSearch={searchCoach} result={coachResult} />
            </div>
          )}
        </div>
        <footer className="page-footer">
          <span>TRACKLINE <span className="footer-dot">●</span> MADE FOR THE WAY THERE</span>
          <span><Icon name="signal" size={14} /> {apiOnline ? 'Connected to your API' : 'Waiting for API connection'}</span>
        </footer>
      </main>
      {modalOpen && (
        <TrainFormModal
          onClose={() => setModalOpen(false)}
          onSave={saveTrain}
          train={modalTrain}
        />
      )}
      <button aria-label="Open overview" className="mobile-brand" onClick={() => setActiveView('overview')} type="button">
        <Icon name="train" size={20} /> trackline<span>.</span>
      </button>
    </div>
  );
}
