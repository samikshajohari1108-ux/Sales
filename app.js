// 🧠 Sample Monthly Sales Data
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const sales = [12000, 15000, 18000, 16000, 20000, 21000, 25000, 24000, 23000, 26000, 30000, 32000];

// --------------------
// Step 1: Display Summary
// --------------------
const totalSales = sales.reduce((a, b) => a + b, 0);
const avgSales = (totalSales / sales.length).toFixed(2);
document.getElementById("summaryData").innerHTML = `
  <p><strong>Total Sales:</strong> ₹${totalSales.toLocaleString()}</p>
  <p><strong>Average Monthly Sales:</strong> ₹${avgSales}</p>
`;

// --------------------
// Step 2: Draw Current Sales Chart
// --------------------
const ctx1 = document.getElementById("salesChart").getContext("2d");
new Chart(ctx1, {
  type: "line",
  data: {
    labels: months,
    datasets: [{
      label: "Monthly Sales (₹)",
      data: sales,
      borderColor: "#007bff",
      backgroundColor: "rgba(0,123,255,0.2)",
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Company Monthly Sales" }
    }
  }
});

// --------------------
// Step 3: Predict Future Sales (Simple Linear Regression)
// --------------------
const n = sales.length;
const x = Array.from({ length: n }, (_, i) => i + 1); // months as numbers
const y = sales;

const xMean = x.reduce((a, b) => a + b, 0) / n;
const yMean = y.reduce((a, b) => a + b, 0) / n;

// Calculate slope (m) and intercept (b)
let num = 0, den = 0;
for (let i = 0; i < n; i++) {
  num += (x[i] - xMean) * (y[i] - yMean);
  den += Math.pow(x[i] - xMean, 2);
}
const m = num / den;
const b = yMean - m * xMean;

// Predict next 3 months
const futureMonths = [13, 14, 15];
const predictedSales = futureMonths.map(x => m * x + b);
const futureLabels = ["Jan (Next Year)", "Feb (Next Year)", "Mar (Next Year)"];

// Display predictions in console
console.log("Predicted Future Sales:", predictedSales);

// --------------------
// Step 4: Draw Prediction Chart
// --------------------
const ctx2 = document.getElementById("predictionChart").getContext("2d");
new Chart(ctx2, {
  type: "bar",
  data: {
    labels: [...months, ...futureLabels],
    datasets: [
      {
        label: "Actual Sales (₹)",
        data: [...sales, null, null, null],
        backgroundColor: "rgba(0,123,255,0.6)",
      },
      {
        label: "Predicted Sales (₹)",
        data: [...Array(sales.length).fill(null), ...predictedSales],
        backgroundColor: "rgba(255,99,132,0.6)",
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Future Sales Prediction" }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
