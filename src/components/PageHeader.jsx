import Icon from './Icon.jsx';

const titles = {
  overview: ['Your journeys', 'A clearer view of what’s ahead.'],
  trains: ['My trains', 'The journeys you want to keep close.'],
  coaches: ['Coach position', 'Find your coach before you reach the platform.']
};

export default function PageHeader({ activeView, savedCount, onAddTrain }) {
  const [title, subtitle] = titles[activeView];
  const date = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  return (
    <header className="page-header">
      <div className="header-title-wrap">
        <span className="eyebrow">{date}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-actions">
        <div className="saved-count"><Icon name="bookmark" size={16} /><span>{savedCount} saved</span></div>
        <button className="button button-dark button-small" onClick={onAddTrain} type="button">
          <Icon name="plus" size={17} /> Add a train
        </button>
      </div>
    </header>
  );
}
