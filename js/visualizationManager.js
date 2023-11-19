// visualizationManager.js





// Function to create and render a pie chart
function renderEvTypeDistributionChart(data) {
    const ctx = document.getElementById('evTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'], // Add more colors as needed
            }]
        },
        options: {
            title: {
                responsive: true,
                maintainAspectRatio: true,
                display: true,
                text: 'EV Type Distribution'
            }
        }
    });
}


// Function to render a line chart
function renderEvCountByYearChart(data) {
    const ctx = document.getElementById('evCountYearChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // or 'line'
        data: {
            labels: Object.keys(data).sort(),
            datasets: [{
                label: 'Number of EVs',
                data: Object.keys(data).sort().map(year => data[year]),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize as needed
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'EV Count by Year'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


// Function to render a bar chart
function renderTopEvMakesModelsChart(data, topN = 10) {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, topN);
    const ctx = document.getElementById('topEvMakesModelsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedData.map(item => item[0]),
            datasets: [{
                label: 'Count',
                data: sortedData.map(item => item[1]),
                backgroundColor: 'rgba(153, 102, 255, 0.6)', // Customize as needed
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Top EV Makes and Models'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


export { renderEvTypeDistributionChart, renderEvCountByYearChart, renderTopEvMakesModelsChart };
