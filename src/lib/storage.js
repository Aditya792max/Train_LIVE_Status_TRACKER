const STORAGE_KEY = 'trackline.saved-trains.v1';

export function readSavedTrains() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSavedTrains(trains) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trains));
    return true;
  } catch {
    return false;
  }
}
