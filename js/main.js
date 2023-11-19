// main.js

import { fetchData } from './dataService.js';
import { createTable } from './tableManager.js';
import{processEvTypeData, processEvCountByYearData, processTopEvMakesModelsData} from './processedFunctions.js';
import { renderEvTypeDistributionChart, renderEvCountByYearChart, renderTopEvMakesModelsChart } from './visualizationManager.js';
// Import any other necessary functions like createTable, setupPagination, etc.


document.addEventListener('DOMContentLoaded', function() {
  fetchData().then(data => { 
      const evTypeData = processEvTypeData(data);
      const evCountByYearData = processEvCountByYearData(data);
      const topEvMakesModelsData = processTopEvMakesModelsData(data);

      renderEvTypeDistributionChart(evTypeData);
      renderEvCountByYearChart(evCountByYearData);
      renderTopEvMakesModelsChart(topEvMakesModelsData);

    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('table-container')) {
      // Code that should only run on pages that require table management
      fetchData().then(data => {
          createTable(data);
          setupPagination();
          // ... other table-related code
      }).catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  if (document.getElementById('evTypeChart')) {
      // Code for setting up charts on visualization.html
      fetchData().then(data => {
          // ... process and render data for charts
      }).catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  // ... other page-specific initialization code
});
