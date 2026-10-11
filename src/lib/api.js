const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api')
  .replace(/\/+$/, '');
const API_ROOT_URL = API_BASE_URL.replace(/\/api$/i, '');

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers
      }
    });
  } catch {
    throw new Error('Could not reach the Train Tracker API. Check that the server is running.');
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || `Request failed (${response.status}).`);
  }

  return body;
}

export function getTrainLive(trainNumber) {
  return request(`/trains/${encodeURIComponent(trainNumber)}/live`);
}

export function getCoachPositions(trainNumber, stationCode) {
  return request(
    `/coaches/${encodeURIComponent(trainNumber)}/${encodeURIComponent(stationCode)}`
  );
}

export async function checkApiHealth() {
  let response;

  try {
    response = await fetch(API_ROOT_URL);
  } catch {
    throw new Error('Could not reach the Train Tracker API. Check that the server is running.');
  }

  if (!response.ok) {
    throw new Error('API is unavailable.');
  }

  return response.json();
}
