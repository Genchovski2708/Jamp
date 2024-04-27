document.addEventListener("DOMContentLoaded", function() {
    var calculateButtons = document.querySelectorAll('.mid-down, .mid-s, .mid-up, .mid-n, .mid-r');

    calculateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var columnIndex = button.parentElement.cellIndex; // Get the column index of the button


            var rows = document.querySelectorAll('table:nth-of-type(2) tbody tr');
            var firstRowValues = document.querySelectorAll('table:nth-of-type(1) .first input');


            // Loop through each row to get the input values for the corresponding column index
            var firstRowValue = parseInt(rows[0].querySelectorAll('td')[columnIndex].querySelector('input').value);
            var secondRowValue = parseInt(rows[1].querySelectorAll('td')[columnIndex].querySelector('input').value);
            var firstRowFirstTable = parseInt(document.querySelector('table:nth-of-type(1) tbody tr:first-child').querySelectorAll('td')[columnIndex].querySelector('input').value);


            // Handle NaN values by setting them to 0
            firstRowValue = isNaN(firstRowValue) ? 0 : firstRowValue;
            secondRowValue = isNaN(secondRowValue) ? 0 : secondRowValue;
            firstRowFirstTable = isNaN(firstRowFirstTable) ? 0 : firstRowFirstTable;

            // Calculate the difference between the input values of the first and second rows
            var difference = firstRowValue - secondRowValue;

            // Get the corresponding cell in the first table
            var resultCell = document.querySelectorAll('table:nth-of-type(2) tbody tr:last-child td')[columnIndex];

            // Calculate the result by multiplying the difference by the value from the first row of the first table
            var result = difference * firstRowFirstTable;

            // Update the "Results" cell in the same column with the calculated result
            resultCell.textContent = result;
        });
    });
});
