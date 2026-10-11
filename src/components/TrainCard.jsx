import Icon from './Icon.jsx';

export default function TrainCard({ train, onTrack, onEdit, onDelete, compact = false }) {
  return (
    <article className={`train-card ${compact ? 'train-card-compact' : ''}`}>
      <div className="train-card-top">
        <span className="train-card-icon"><Icon name="train" size={21} /></span>
        <div className="train-card-actions">
          <button aria-label={`Edit ${train.name}`} className="icon-button" onClick={() => onEdit(train)} type="button">
            <Icon name="edit" size={17} />
          </button>
          <button aria-label={`Delete ${train.name}`} className="icon-button danger-hover" onClick={() => onDelete(train.id)} type="button">
            <Icon name="trash" size={17} />
          </button>
        </div>
      </div>
      <div className="train-card-title-row">
        <h3>{train.name}</h3>
        <span className="train-number">#{train.number}</span>
      </div>
      <div className="route-line">
        <div className="route-point">
          <span className="route-dot" />
          <span>{train.from || 'Origin not set'}</span>
        </div>
        <span className="route-connector" />
        <div className="route-point route-point-end">
          <span>{train.to || 'Destination not set'}</span>
          <span className="route-dot route-dot-end" />
        </div>
      </div>
      <div className="train-card-bottom">
        <span className="departure-time"><Icon name="clock" size={15} />{train.departure || 'Time not set'}</span>
        <button className="track-link" onClick={() => onTrack(train.number)} type="button">
          Track <Icon name="arrow" size={15} />
        </button>
      </div>
    </article>
  );
}
