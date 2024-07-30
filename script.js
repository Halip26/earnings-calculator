function calculateBMI() {
  const earningsInput = document.getElementById("earnings");
  const rates = 196;
  const tax = 2.5;
  const showResultDiv = document.getElementById("show-result");

  // konversi ke data type float
  const earningsINR = parseFloat(earningsInput.value);
  const exchangeRate = parseFloat(rates);
  const taxInPercent = tax / 100;

  if (isNaN(earningsINR) || isNaN(exchangeRate)) {
    showResultDiv.innerHTML = `<div class="container"><div class="isNan">Please enter a valid total earnings!</div></div>`;
    return;
  }

  const totalEarnings =
    earningsINR * exchangeRate - earningsINR * exchangeRate * taxInPercent;

  // Change totalEarnings format to rupiah
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
