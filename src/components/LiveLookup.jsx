import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

export default function LiveLookup({ onSearch, loading, initialValue = '' }) {
  const [trainNumber, setTrainNumber] = useState(initialValue);

  useEffect(() => {
    setTrainNumber(initialValue);
  }, [initialValue]);

  function submit(event) {
    event.preventDefault();
    onSearch(trainNumber.trim());
  }

  return (
    <section className="live-hero" aria-labelledby="live-heading">
      <div className="hero-art" aria-hidden="true">
        <span className="hero-orbit orbit-one" />
        <span className="hero-orbit orbit-two" />
        <span className="hero-track-line" />
        <span className="hero-train-icon"><Icon name="train" size={37} strokeWidth={1.35} /></span>
        <span className="hero-station station-one" />
        <span className="hero-station station-two" />
      </div>
      <div className="hero-copy">
        <div className="hero-kicker"><span className="live-pulse" /> LIVE TRAIN STATUS</div>
        <h2 id="live-heading">Know where<br />your train is.</h2>
        <p>One quick search and you’re back in the loop.</p>
        <form className="lookup-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="live-train-number">Five digit train number</label>
          <Icon name="search" size={19} />
          <input
            autoComplete="off"
            id="live-train-number"
            inputMode="numeric"
            maxLength={5}
            onChange={(event) => setTrainNumber(event.target.value.replace(/\D/g, ''))}
            placeholder="Enter 5-digit train number"
            value={trainNumber}
          />
          <button aria-label="Search train" disabled={loading} type="submit">
            {loading ? <span className="button-spinner" /> : <Icon name="arrow" size={19} />}
          </button>
        </form>
        <span className="hero-footnote">Live data provided by RailRadar</span>
      </div>
      <div className="hero-index">01 <span /> 03</div>
    </section>
  );
}
