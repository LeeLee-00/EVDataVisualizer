// dataService.js



export function fetchData() {
  const API_URL = 'https://data.wa.gov/resource/f6w7-q2d2.json';
  const LIMIT = 50000; // Adjust the limit as needed

  return fetch(`${API_URL}?$limit=${LIMIT}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}