document.addEventListener("DOMContentLoaded", function() {
    // Get all the "Calculate" buttons for the bottom table
    var calculateButtons = document.querySelectorAll('button[class^="bottom-"]');

    // Attach event listeners to each button
    calculateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the index of the column (button's parent td's index)
            var columnIndex = button.parentNode.cellIndex;

            // Get all the input elements in the same column
            var inputs = document.querySelectorAll('.table:nth-of-type(3) td:nth-child(' + (columnIndex + 1) + ') input');

            // Calculate the sum of values in the column
            var sum = 0;
            inputs.forEach(function(input) {
                sum += parseFloat(input.value) || 0; // Convert input value to number, default to 0 if NaN
            });

            // Update the "Results" cell in the same column with the sum
            var resultCell = document.querySelector('.bottom-results:nth-child(' + (columnIndex + 1) + ')');
            resultCell.textContent = sum;
        });
    });
});