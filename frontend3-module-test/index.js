const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

// Fetch data using .then
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
    renderTable(data);
    addSearchFunctionality(data);
    addSortFunctionality(data);
    })
    .catch((error) => console.error("Error fetching data:", error));

// Fetch data using async/await
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderTable(data);
        addSearchFunctionality(data);
        addSortFunctionality(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

  // Uncomment to use async/await instead of .then
  // fetchData();

function renderTable(data) {
    const tbody = document.querySelector("#cryptoTable tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="30"></td>
        <td>${item.name}</td>
        <td>${item.symbol.toUpperCase()}</td>
        <td>${item.current_price}</td>
        <td>${item.total_volume}</td>
        `;
        tbody.appendChild(row);
    });
}


function addSearchFunctionality(data) {
    const searchInput = document.querySelector("#searchInput");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.symbol.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData);
    });
}

function addSortFunctionality(data) {
    const sortMarketCapButton = document.querySelector("#sortMarketCap");
    const sortPercentageChangeButton = document.querySelector("#sortPercentageChange");

    sortMarketCapButton.addEventListener("click", () => {
        const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    sortPercentageChangeButton.addEventListener("click", () => {
        const sortedData = [...data].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        renderTable(sortedData);
    });
}

