export function createTable(data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('Invalid data provided to createTable');
    return;
  }
  // Create the table element
  const table = document.createElement('table');
  table.className = 'responsive-table';

  // Create the table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key.replace(/_/g, ' ').toUpperCase();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement('tbody');
  data.forEach(item => {
    const row = document.createElement('tr');
    Object.keys(item).forEach(key => {
      const td = document.createElement('td');

      // Check if the value is an object and handle it accordingly
      if (typeof item[key] === 'object' && item[key] !== null) {
        td.textContent = JSON.stringify(item[key]);
      } else {
        td.textContent = item[key];
      }

      td.setAttribute('data-label', key.replace(/_/g, ' ').toUpperCase());
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  const tableContainer = document.getElementById('table-container');
  if (tableContainer) {
    tableContainer.innerHTML = ''; // Clear the previous table
    tableContainer.appendChild(table);
  } else {
    console.warn('Table container not found. Skipping createTable.');
  }

  const chartContainer = document.getElementById('chart-container');
  if (chartContainer) {
    chartContainer.innerHTML = ''; // Clear the previous table
  } else {
    console.warn('Table container not found. Skipping createTable.');
  }

  // Show only the rows for the current page
  setupPagination(data);
  displayPage(currentPage, data);
}


export function displayPage(pageNumber) {
  const rows = document.querySelectorAll('.responsive-table tbody tr');
  const startIndex = (pageNumber - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = ''; // Show row
    } else {
      row.style.display = 'none'; // Hide row
    }
  });
}

export function updatePageDisplay(pageNumber, totalRows) {
  const pageDisplay = document.getElementById('page-display');
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  pageDisplay.textContent = `Page ${pageNumber} of ${totalPages}`;
}


let currentPage = 1;
const rowsPerPage = 5;

export function setupPagination() {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Clear existing pagination

  // 'Previous' button
  const prevButton = document.createElement('button');
  prevButton.className = 'pagination-btn';
  prevButton.textContent = 'Previous';
  prevButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  // 'Next' button
  const nextButton = document.createElement('button');
  nextButton.className = 'pagination-btn';
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', function () {
    const totalRows = document.querySelectorAll('.responsive-table tbody tr').length;
    const maxPage = Math.ceil(totalRows / rowsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);
}
