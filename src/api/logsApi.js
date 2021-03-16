const logsUrl = 'https://join.reckon.com/stock-pricing';

export function getLogs() {
  return fetch(logsUrl)
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 400) {
      const error = await response.text();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
}