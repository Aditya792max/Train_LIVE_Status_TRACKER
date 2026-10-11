const TRAIN_KEYS = ['train', 'trainDetails', 'train_details', 'data', 'result'];

function toRecord(value) {
  if (Array.isArray(value)) {
    return value.find((item) => item && typeof item === 'object') || {};
  }

  return value && typeof value === 'object' ? value : {};
}

export function unwrapTrainData(payload) {
  let current = toRecord(payload);

  for (let depth = 0; depth < 3; depth += 1) {
    const nextKey = TRAIN_KEYS.find(
      (key) => current[key] && typeof current[key] === 'object'
    );

    if (!nextKey) {
      break;
    }

    current = toRecord(current[nextKey]);
  }

  return current;
}

function firstValue(record, keys) {
  for (const key of keys) {
    const value = record[key];

    if (value !== undefined && value !== null && String(value).trim()) {
      return value;
    }
  }

  return null;
}

export function getTrainSummary(payload, fallbackNumber = '') {
  const train = unwrapTrainData(payload);

  return {
    name: firstValue(train, ['train_name', 'trainName', 'name', 'title']),
    number: firstValue(train, ['train_number', 'trainNumber', 'number', 'train_no']) || fallbackNumber,
    status: firstValue(train, ['status', 'running_status', 'runningStatus', 'message']),
    currentStation: firstValue(train, [
      'current_station',
      'currentStation',
      'current_location',
      'currentLocation',
      'last_station',
      'station_name'
    ]),
    nextStation: firstValue(train, ['next_station', 'nextStation', 'next_stop', 'nextStop']),
    destination: firstValue(train, ['destination', 'to', 'destination_name', 'destinationName']),
    updatedAt: firstValue(train, ['updated_at', 'updatedAt', 'last_updated', 'lastUpdated']),
    details: train
  };
}

export function formatLabel(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (character) => character.toUpperCase());
}

export function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (typeof value === 'object') {
    return Array.isArray(value) ? `${value.length} items` : JSON.stringify(value);
  }

  return String(value);
}
