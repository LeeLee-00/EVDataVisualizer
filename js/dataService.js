// dataService.js



// Fetches the JSON data from the API endpoint and returns the JSON.
export function fetchData() {
  const API_URL = 'https://data.wa.gov/resource/f6w7-q2d2.json';
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
      
    });
}

