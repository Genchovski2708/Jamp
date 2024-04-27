
    // Get all the "Calculate" buttons
    var calculateButtons = document.querySelectorAll('button[class^="top-"]');

    // Attach event listeners to each button
    calculateButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the index of the column (button's parent td's index)
        var columnIndex = button.parentNode.cellIndex;

        // Get all the input elements in the same column
        var inputs = document.querySelectorAll('.top:nth-child(' + (columnIndex + 1) + ') input');

        // Calculate the sum of values in the column
        var sum = 0;
        inputs.forEach(function(input) {
            sum += parseFloat(input.value) || 0; // Convert input value to number, default to 0 if NaN
        });
        if(sum >= 60){
            var additionalAmount = Math.floor((sum - 30) / 10) * 10;
            sum += additionalAmount;
        }
        // Update the "Results" cell in the same column with the sum
        var resultCell = document.querySelector('.results:nth-child(' + (columnIndex + 1) + ')');
        resultCell.textContent = sum;
    });
});

