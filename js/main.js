document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://data.wa.gov/resource/f6w7-q2d2.csv');
        const data = await response.text();
        const jsonData = parseCSVtoJSON(data);
        console.log('testing data');
        console.log(jsonData); // Log data to console for testing
        populateTable(jsonData);
        // Further code to process jsonData and update chart
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function parseCSVtoJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    // Trim quotes and whitespace, then split by comma
    const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentline = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
        
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result; // JSON result
}


function populateTable(data) {
    const tableHeaderRow = document.getElementById('dataHeaderRow');
    const tableBody = document.getElementById('dataBody');

    // Clear previous headers and rows
    tableHeaderRow.innerHTML = '';
    tableBody.innerHTML = '';

    // Define the headers you want to display
    const headers = ['city', 'state', 'zip_code', 'model_year', 'make', 'model'];

    // Create header row
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.replace('_', ' '); // Replace underscores with spaces for display
        tableHeaderRow.appendChild(th);
    });

    // Populate the table rows
    data.forEach(item => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            // Account for possible leading/trailing spaces or quotes in keys
            td.textContent = item[header.trim().replace(/^"|"$/g, '')]; // Use bracket notation to match the header keys
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
