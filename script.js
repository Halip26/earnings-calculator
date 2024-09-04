// Add an event listener to the input field
const earningsInput = document.getElementById("earnings");
earningsInput.addEventListener("keydown", function (event) {
  // Call the calculateEarnings() function if the Enter key is pressed
  if (event.key === "Enter") {
    calculateEarnings();
  }
});

// Function to calculate earnings
function calculateEarnings() {
  // Exchange rate and tax rate (in percent)
  const rates = 196;
  const tax = 2.5;

  // Get the div where the result will be displayed
  const showResultDiv = document.getElementById("show-result");

  // Convert input values to float data type
  const earningsINR = parseFloat(earningsInput.value);
  const exchangeRate = parseFloat(rates);
  const taxInPercent = tax / 100;

  // Check if input values are valid
  if (isNaN(earningsINR) || isNaN(exchangeRate)) {
    showResultDiv.innerHTML = `<div class="container"><div class="isNan">Please enter a valid total earnings!</div></div>`;
    return;
  }

  // Calculate total earnings after tax
  const totalEarnings =
    earningsINR * exchangeRate - earningsINR * exchangeRate * taxInPercent;

  // Format total earnings as Indonesian Rupiah (IDR)
  const formattedTotalEarnings = totalEarnings.toLocaleString("id-ID", {
    minimumFractionDigits: 2, // set minimum number of decimals
  });

  // Display the result
  showResultDiv.innerHTML = `<div class="container">
      <div id="result">Your monthly earnings are: </br> <div class="total-earnings">Rp${formattedTotalEarnings}</div></div></div>`;

  // Save data to localStorage
  const earningsData = {
    earningsINR: earningsINR,
    totalEarnings: totalEarnings,
    formattedTotalEarnings: formattedTotalEarnings,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("earningsData", JSON.stringify(earningsData));
}

// Function to load data from localStorage when the page loads
function loadEarningsData() {
  const showResultDiv = document.getElementById("show-result");
  const storedData = localStorage.getItem("earningsData");
  if (storedData) {
    const earningsData = JSON.parse(storedData);
    earningsInput.value = earningsData.earningsINR;
    showResultDiv.innerHTML = `<div class="container">
      <div id="result">Your monthly earnings are: </br> <div class="total-earnings">Rp${earningsData.formattedTotalEarnings}</div></div></div>`;
  }
}

// Function to clear input fields and localStorage
function clearFields() {
  earningsInput.value = "";
  document.getElementById("show-result").innerHTML = "";
  localStorage.removeItem("earningsData");
}

// Call the loadEarningsData function when the page loads
window.addEventListener("load", loadEarningsData);
