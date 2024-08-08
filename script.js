// add event listener on input field
const earningsInput = document.getElementById("earnings");
earningsInput.addEventListener("keydown", function (event) {
  // call the calculateEarnings() function if the Enter key is pressed
  if (event.key === "Enter") {
    calculateEarnings();
  }
});

function calculateEarnings() {
  const rates = 196;
  const tax = 2.5;
  const showResultDiv = document.getElementById("show-result");

  // convert to float data type
  const earningsINR = parseFloat(earningsInput.value);
  const exchangeRate = parseFloat(rates);
  const taxInPercent = tax / 100;

  if (isNaN(earningsINR) || isNaN(exchangeRate)) {
    showResultDiv.innerHTML = `<div class="container"><div class="isNan">Please enter a valid total earnings!</div></div>`;
    return;
  }

  const totalEarnings =
    earningsINR * exchangeRate - earningsINR * exchangeRate * taxInPercent;

  // change totalEarnings format to rupiah
  const formattedTotalEarnings = totalEarnings.toLocaleString("id-ID", {
    minimumFractionDigits: 2, // set minimum number of decimals
  });

  showResultDiv.innerHTML = `<div class="container">
      <div id="result">Your monthly earnings are: </br> <div class="total-earnings">Rp${formattedTotalEarnings}</div>`;
}

function clearFields() {
  document.getElementById("earnings").value = "";
  document.getElementById("show-result").innerHTML = "";
}
