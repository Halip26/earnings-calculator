// Function to format number with commas
function formatNumberWithCommas(value) {
  // Remove any non-digit characters
  const num = value.replace(/[^0-9]/g, "");
  // Add commas
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to remove commas from formatted number
function removeCommas(value) {
  return value.replace(/,/g, "");
}

window.onload = function () {
  const earningsInput = document.getElementById("earnings");

  earningsInput.addEventListener("input", function (event) {
    // Get the input value
    let value = earningsInput.value;

    // Format the value with commas
    value = formatNumberWithCommas(value);

    // Set the formatted value back to the input field
    earningsInput.value = value;
  });

  earningsInput.addEventListener("keydown", function (event) {
    // Call the calculateEarnings() function if the Enter key is pressed
    if (event.key === "Enter") {
      calculateEarnings();
    }
  });

  // Call the loadEarningsData function when the page loads
  loadEarningsData();
};

// Function to calculate earnings
function calculateEarnings() {
  // Exchange rate and tax rate (in percent)
  const rates = 196;
  const tax = 2.5;

  // Get the div where the result will be displayed
  const showResultDiv = document.getElementById("show-result");

  // Get input value and remove commas
  const earningsInput = document.getElementById("earnings");
  const earningsINR = parseFloat(removeCommas(earningsInput.value));
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
    const earningsInput = document.getElementById("earnings");
    earningsInput.value = formatNumberWithCommas(
      earningsData.earningsINR.toString()
    );
    showResultDiv.innerHTML = `<div class="container">
                    <div id="result">Your monthly earnings are: </br> <div class="total-earnings">Rp${earningsData.formattedTotalEarnings}</div></div></div>`;
  }
}

// Function to clear input fields and localStorage
function clearFields() {
  document.getElementById("earnings").value = "";
  document.getElementById("show-result").innerHTML = "";
  localStorage.removeItem("earningsData");
}
