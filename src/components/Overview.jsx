import Icon from './Icon.jsx';
import LiveLookup from './LiveLookup.jsx';
import LiveResult from './LiveResult.jsx';
import TrainCollection from './TrainCollection.jsx';
import CoachLookup from './CoachLookup.jsx';

export default function Overview({
  trains,
  liveResult,
  liveError,
  liveLoading,
  liveTrainNumber,
  onLiveSearch,
  coachResult,
  coachError,
  coachLoading,
  onCoachSearch,
  onAdd,
  onEdit,
  onDelete,
  onTrack,
  onViewTrains
}) {
  return (
    <>
      <LiveLookup initialValue={liveTrainNumber} loading={liveLoading} onSearch={onLiveSearch} />
      {(liveResult || liveError) && <LiveResult error={liveError} result={liveResult} trainNumber={liveTrainNumber} />}
      <div className="dashboard-grid">
        <div className="dashboard-main-column">
          <TrainCollection
            compact
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
            onTrack={onTrack}
            trains={trains}
          />
          {trains.length > 2 && (
            <button className="view-all-link" onClick={onViewTrains} type="button">View all saved trains <Icon name="arrow" size={15} /></button>
          )}
        </div>
        <div className="dashboard-aside-column">
          <CoachLookup
            compact
            error={coachError}
            loading={coachLoading}
            onSearch={onCoachSearch}
            result={coachResult}
          />
          <div className="small-note-card">
            <span className="note-star"><Icon name="sparkle" size={19} /></span>
            <p>Small details make a smoother journey.</p>
            <span>TRACKLINE NOTES · 01</span>
          </div>
        </div>
      </div>
    </>
  );
}
