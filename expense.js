$(document).ready(function () {
  // Handle form submission for adding a new expense
  $('#expenseForm').on('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission behavior (e.g., page reload)

      // Get the expense amount and category entered by the user
      const amount = parseFloat($('#expenseAmount').val()); // Convert the input value to a number
      const category = $('#expenseCategory').val(); // Get the selected category

      // Check if both amount and category are valid
      if (amount && category) {
          const expenseLog = $('#expenseLog'); // Reference the expense log list
          const totalExpense = $('#totalExpense'); // Reference the total expense value

          // Add the new expense as a list item
          const newItem = $('<li></li>').text(`₹${amount.toFixed(2)} - ${category}`); // Create a new list item
          expenseLog.append(newItem); // Add the new item to the expense log

          // Update the total expense displayed
          let currentTotal = parseFloat(totalExpense.text()); // Get the current total expense as a number
          currentTotal += amount; // Add the new expense to the total
          totalExpense.text(currentTotal.toFixed(2)); // Update the displayed total with the new value

          // Update the chart data for the selected category
          updateChartData(category, amount);

          // Reset the form fields for the next input
          $('#expenseForm')[0].reset();
      }
  });

  // Object to store expense data for each category
  const expenseData = {
      Food: 0,
      Rent: 0,
      Entertainment: 0,
      Utilities: 0,
      Others: 0
  };

  // Function to update the expense data and re-render the chart
  function updateChartData(category, amount) {
      expenseData[category] += amount; // Add the new expense to the correct category
      renderChart(); // Re-render the pie chart to reflect the updated data
  }

  let chartInstance = null; // Variable to store the chart instance so we can update or destroy it

  // Function to render the pie chart using the current expense data
  function renderChart() {
      const ctx = $('#expenseChart')[0].getContext('2d'); // Get the canvas context for the chart

      // If a chart already exists, destroy it before creating a new one
      if (chartInstance) {
          chartInstance.destroy(); // Clear the old chart
      }

      // Create a new pie chart using the expense data
      chartInstance = new Chart(ctx, {
          type: 'pie', // Define the chart type as a pie chart
          data: {
              labels: Object.keys(expenseData), // Categories (e.g., Food, Rent, etc.) are the labels
              datasets: [{
                  data: Object.values(expenseData), // Expense amounts are the data
                  backgroundColor: ['#957DAD', '#B3DEE2', '#EFF0D1', '#C0ECCC', '#F6A8A6'] // Colors for each category
              }]
          },
          options: {
              responsive: true, // Ensure the chart resizes with the window
              plugins: {
                  legend: {
                      position: 'top', // Place the legend at the top
                      labels: {
                          font: {
                              size: 18 // Set font size for legend labels
                          },
                          color: '#262730' // Set label color for readability
                      }
                  }
              }
          }
      });
  }

  // Initial render of the pie chart when the page loads
  renderChart();

  // Add the event listener for changing themes
  $("#toggle-theme").click(function () {
    const $body = $("body");
    const $themeButton = $(this);

    $body.toggleClass("dark");
    $themeButton.text($body.hasClass("dark") ? "☀️" : "🌙");
});
})