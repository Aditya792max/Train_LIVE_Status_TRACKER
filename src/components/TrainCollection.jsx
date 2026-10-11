import Icon from './Icon.jsx';
import TrainCard from './TrainCard.jsx';

export default function TrainCollection({ trains, onAdd, onEdit, onDelete, onTrack, compact = false }) {
  const shownTrains = compact ? trains.slice(0, 2) : trains;

  return (
    <section className={`collection-section ${compact ? 'collection-compact' : ''}`}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>{compact ? 'Saved trains' : 'All your trains'}</h2>
        </div>
        {trains.length > (compact ? 2 : 0) && compact && (
          <span className="collection-total">{trains.length} saved</span>
        )}
        {!compact && (
          <button className="text-button" onClick={onAdd} type="button"><Icon name="plus" size={16} /> Add train</button>
        )}
      </div>
      {trains.length === 0 ? (
        <div className="empty-state">
          <span className="empty-train"><Icon name="train" size={25} /></span>
          <h3>A little room for the journeys ahead.</h3>
          <p>Save a train here to keep its route close and track it whenever you need.</p>
          <button className="button button-outline" onClick={onAdd} type="button"><Icon name="plus" size={16} /> Add your first train</button>
        </div>
      ) : (
        <div className="train-grid">
          {shownTrains.map((train) => (
            <TrainCard
              key={train.id}
              compact={compact}
              onDelete={onDelete}
              onEdit={onEdit}
              onTrack={onTrack}
              train={train}
            />
          ))}
        </div>
      )}
    </section>
  );
}
