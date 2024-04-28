document.addEventListener("DOMContentLoaded", function() {
    // Get all input elements
    var inputs = document.querySelectorAll('input[type="number"]');

    // Add event listener to each input element
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            // Execute value correction logic
            valueCorrection(input);

            // Calculate results
            calculateResults(input);

            // Check if the input belongs to the top table
            if (input.closest('.top')) {
                // Get the column index of the input
                var columnIndex = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode) - 1; // Adjust for the additional column

                // Recalculate result for the corresponding column in the middle table
                recalculateMiddleTableResults(columnIndex);
            }
        });
    });
});


// Function to recalculate result for the middle table based on the updated input in the top table
function recalculateMiddleTableResults(columnIndex) {
    // Get the input element from the corresponding column in the middle table
    var inputElement = document.querySelectorAll('table.mid tbody tr:first-child td')[columnIndex].querySelector('input');

    // Check if the input element exists and has a value
    if (inputElement && inputElement.value !== undefined) {
        // Get the input values from the corresponding rows in the middle and top tables
        var firstRowValue = parseInt(document.querySelectorAll('table.mid tbody tr:first-child td')[columnIndex].querySelector('input').value);
        var secondRowValue = parseInt(document.querySelectorAll('table.mid tbody tr:nth-child(2) td')[columnIndex].querySelector('input').value);
        var firstRowFirstTable = parseInt(document.querySelectorAll('table.top tbody tr:first-child td')[columnIndex + 1].querySelector('input').value); // Adjust column index to skip the additional column

        // Handle NaN values by setting them to 0
        firstRowValue = isNaN(firstRowValue) ? 0 : firstRowValue;
        secondRowValue = isNaN(secondRowValue) ? 0 : secondRowValue;
        firstRowFirstTable = isNaN(firstRowFirstTable) ? 0 : firstRowFirstTable;

        // Calculate the difference between the input values of the first and second rows
        var difference = firstRowValue - secondRowValue;

        // Get the corresponding cell in the middle table
        var resultCell = document.querySelectorAll('table.mid tbody tr:last-child td')[columnIndex];

        // Calculate the result by multiplying the difference by the value from the first row of the top table
        var result = difference * firstRowFirstTable;

        // Update the "Results" cell in the same column with the calculated result
        resultCell.textContent = result;
    } else {


    }
}






// Function to perform value correction based on the input
function valueCorrection(input) {
    // Get the parent table of the input
    var table = input.closest('table');
    if (!table) return;

    // Determine the correction logic based on the table
    var rows = table.querySelectorAll('tbody tr');
    var index = Array.from(rows).indexOf(input.closest('tr'));

    // Apply correction based on the row index and table type
    // Check if the table contains the class 'top'
    if (table.classList.contains('top')) {
        // Apply correction logic for the first table
        // Adjust the limit and increment based on the row index
        var limit = (index + 1) * 5;
        var increment = index + 1;

        // Get the input value
        var value = parseInt(input.value);

        // Validate the input value against the limit and increment
        if (value < 0) {
            input.value = 0;
        } else if (value > limit) {
            input.value = limit;
        } else if (value % increment !== 0) {
            input.value = Math.floor(value / increment) * increment;
        }
    } else if (table.classList.contains('mid')) {
        // Apply correction logic for the middle table
        // Check if the value is NaN or less than 0
        var value = parseInt(input.value);
        if (isNaN(value) || value < 0) {
            input.value = ''; // Clear the input value
        } else if (value > 30) { // Check if the value is greater than 30
            input.value = '30'; // Set the input value to 30
        }
    } else if (table.classList.contains('bottom')) {
        // Apply correction logic for the last table
        // Get the input value
        var value = parseInt(input.value);

        // Determine limit based on row index
        var limit;
        switch(index) {
            case 0:
                limit = (value === 0) ? 0 : (value < 20) ? 20 : (value > 38) ? 38 : value;
                break;
            case 1:
                limit = (value === 0 || value === 45 || value === 50) ? value : 0;
                break;
            case 2:
                limit = (value === 0) ? 0 : (value < 40) ? 40 : (value > 68) ? 68 : value;
                break;
            case 3:
                limit = (value === 0) ? 0 : (value < 50) ? 50 : (value > 74) ? 74 : value;
                break;
            case 4:
                limit = (value === 0) ? 0 : (value < 60) ? 60 : (value > 100) ? 100 : value;
                break;
            default:
                limit = value; // Default limit, no restrictions
                break;
        }

        input.value = limit;
    }
}

// Function to calculate results based on the input
function calculateResults(input) {
    // Get the parent table of the input
    var table = input.closest('table');
    if (!table) return;

    // Determine the index of the column
    var columnIndex = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);

    // Check if the current table is the middle table
    if (table.classList.contains('mid')) {
        // Calculate the result for the middle table

        var columnIndex = columnIndex - 1; // Adjust the column index to skip the additional column

        var rows = document.querySelectorAll('table:nth-of-type(2) tbody tr');
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
    }
    else {
        // Get all the input elements in the same column
        var inputs = table.querySelectorAll('tbody tr td:nth-child(' + (columnIndex + 1) + ') input');

        // Calculate the sum of values in the column
        var sum = 0;
        inputs.forEach(function(input) {
            sum += parseFloat(input.value) || 0; // Convert input value to number, default to 0 if NaN
        });

        // Check if we are calculating in the top table and sum is greater than or equal to 60
        if (table.classList.contains('top') && sum >= 60) {
            var additionalAmount = Math.floor((sum - 30) / 10) * 10;
            sum += additionalAmount;
        }

        // Update the "Results" cell in the same column with the sum
        var resultCell = table.querySelector('tr:last-child td:nth-child(' + (columnIndex + 1) + ')');
        resultCell.textContent = sum;
    }
}


