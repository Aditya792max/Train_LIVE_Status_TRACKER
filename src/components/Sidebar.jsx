import Icon from './Icon.jsx';

const navigation = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'trains', label: 'My trains', icon: 'bookmark' },
  { id: 'coaches', label: 'Coach position', icon: 'coach' }
];

export default function Sidebar({ activeView, onNavigate, apiOnline }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate('overview')} type="button">
        <span className="brand-mark"><Icon name="train" size={22} strokeWidth={2} /></span>
        <span className="brand-name">trackline<span>.</span></span>
      </button>

      <div className="workspace-label">YOUR SPACE</div>
      <nav aria-label="Main navigation" className="side-nav">
        {navigation.map((item) => (
          <button
            aria-label={item.label}
            aria-current={activeView === item.id ? 'page' : undefined}
            className={`nav-item ${activeView === item.id ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="connection-card">
          <span className={`connection-dot ${apiOnline ? 'is-online' : ''}`} />
          <div>
            <strong>{apiOnline ? 'API connected' : 'API not connected'}</strong>
            <span>{apiOnline ? 'Ready for live updates' : 'Start your local server'}</span>
          </div>
        </div>
        <div className="sidebar-footnote">A little more certainty<br />for the way there.</div>
      </div>
    </aside>
  );
}
