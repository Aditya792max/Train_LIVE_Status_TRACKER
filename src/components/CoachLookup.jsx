import { useState } from 'react';
import Icon from './Icon.jsx';
import { displayValue, formatLabel } from '../lib/trainData.js';

export default function CoachLookup({ onSearch, loading, result, error, compact = false }) {
  const [trainNumber, setTrainNumber] = useState('');
  const [stationCode, setStationCode] = useState('');
  const entries = result && typeof result === 'object'
    ? Object.entries(result).filter(([, value]) => typeof value !== 'object').slice(0, 12)
    : [];

  function submit(event) {
    event.preventDefault();
    onSearch(trainNumber.trim(), stationCode.trim());
  }

  return (
    <section className={`coach-card ${compact ? 'coach-card-compact' : ''}`}>
      <div className="coach-card-heading">
        <span className="coach-icon"><Icon name="coach" size={21} /></span>
        <div>
          <span className="eyebrow">PLATFORM READY</span>
          <h2>Find your coach</h2>
        </div>
      </div>
      <p className="coach-intro">Know where to stand before the train pulls in.</p>
      <form className="coach-form" onSubmit={submit}>
        <label>
          Train number
          <input inputMode="numeric" maxLength={5} onChange={(event) => setTrainNumber(event.target.value.replace(/\D/g, ''))} placeholder="e.g. 12123" value={trainNumber} />
        </label>
        <label>
          Station code
          <input autoCapitalize="characters" maxLength={10} onChange={(event) => setStationCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="e.g. CSMT" value={stationCode} />
        </label>
        <button className="button button-dark coach-submit" disabled={loading} type="submit">
          {loading ? <span className="button-spinner" /> : <>Show coach position <Icon name="arrow" size={16} /></>}
        </button>
      </form>
      {error && <p className="coach-error" role="alert">{error}</p>}
      {result && (
        <div aria-live="polite" className="coach-result">
          <div className="coach-result-heading"><strong>Coach details</strong><span>{trainNumber} · {stationCode}</span></div>
          {entries.length > 0 ? (
            <div className="coach-data-grid">
              {entries.map(([key, value]) => <div key={key}><span>{formatLabel(key)}</span><strong>{displayValue(value)}</strong></div>)}
            </div>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
      <div className="coach-hint"><Icon name="pin" size={15} /><span>Use the station code where you’ll board.</span></div>
    </section>
  );
}
