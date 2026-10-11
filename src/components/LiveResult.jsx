import Icon from './Icon.jsx';
import { displayValue, formatLabel, getTrainSummary } from '../lib/trainData.js';

export default function LiveResult({ result, error, trainNumber }) {
  if (error) {
    return (
      <section className="result-card result-error" role="alert">
        <span className="result-icon"><Icon name="signal" size={20} /></span>
        <div>
          <strong>We couldn’t get a live update.</strong>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  const summary = getTrainSummary(result, trainNumber);
  const fields = [
    ['Current station', summary.currentStation],
    ['Next station', summary.nextStation],
    ['Destination', summary.destination]
  ].filter(([, value]) => value);

  return (
    <section aria-live="polite" className="result-card">
      <div className="result-topline">
        <div className="result-heading">
          <span className="result-icon"><Icon name="train" size={21} /></span>
          <div>
            <span className="eyebrow">LIVE TRAIN</span>
            <h3>{summary.name || `Train ${summary.number}`}</h3>
          </div>
        </div>
        <span className="live-badge"><span className="live-pulse" /> Live</span>
      </div>
      {summary.status && <p className="result-status">{summary.status}</p>}
      {fields.length > 0 ? (
        <div className="result-facts">
          {fields.map(([label, value]) => (
            <div className="result-fact" key={label}>
              <span>{label}</span>
              <strong>{displayValue(value)}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="result-raw">
          <span>Train number</span>
          <strong>{summary.number}</strong>
          <span className="muted-copy">The provider returned live train data. See response fields below.</span>
        </div>
      )}
      {summary.updatedAt && <p className="result-updated">Updated {displayValue(summary.updatedAt)}</p>}
      {fields.length === 0 && (
        <div className="result-data-grid">
          {Object.entries(summary.details)
            .filter(([, value]) => typeof value !== 'object')
            .slice(0, 8)
            .map(([key, value]) => (
              <div className="data-chip" key={key}>
                <span>{formatLabel(key)}</span>
                <strong>{displayValue(value)}</strong>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
