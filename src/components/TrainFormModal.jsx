import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

const emptyForm = {
  name: '',
  number: '',
  from: '',
  to: '',
  departure: ''
};

export default function TrainFormModal({ train, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(train ? { ...emptyForm, ...train } : emptyForm);
  }, [train]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  }

  function updateTrainNumber(event) {
    setForm((current) => ({
      ...current,
      number: event.target.value.replace(/\D/g, '')
    }));
    setError('');
  }

  function submit(event) {
    event.preventDefault();

    if (!/^\d{5}$/.test(form.number)) {
      setError('Train number should have exactly 5 digits.');
      return;
    }

    if (!form.name.trim()) {
      setError('Give this train a name so it’s easy to find.');
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      from: form.from.trim(),
      to: form.to.trim()
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section aria-labelledby="train-modal-title" aria-modal="true" className="modal-card" role="dialog">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">YOUR TRAIN COLLECTION</span>
            <h2 id="train-modal-title">{train ? 'Edit train' : 'Add a train'}</h2>
          </div>
          <button aria-label="Close" className="icon-button" onClick={onClose} type="button"><Icon name="close" /></button>
        </div>
        <form className="train-form" onSubmit={submit}>
          <label>
            Train name
            <input autoFocus maxLength={60} name="name" onChange={updateField} placeholder="e.g. Deccan Queen" value={form.name} />
          </label>
          <label>
            Train number
            <input inputMode="numeric" maxLength={5} name="number" onChange={updateTrainNumber} placeholder="5 digit number" value={form.number} />
          </label>
          <div className="form-row">
            <label>
              From
              <input maxLength={50} name="from" onChange={updateField} placeholder="Origin station" value={form.from} />
            </label>
            <label>
              To
              <input maxLength={50} name="to" onChange={updateField} placeholder="Destination" value={form.to} />
            </label>
          </div>
          <label>
            Usual departure <span className="optional-label">OPTIONAL</span>
            <input name="departure" onChange={updateField} type="time" value={form.departure} />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <button className="button button-quiet" onClick={onClose} type="button">Cancel</button>
            <button className="button button-dark" type="submit">{train ? 'Save changes' : 'Save train'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
