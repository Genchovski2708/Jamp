document.addEventListener("DOMContentLoaded", function() {
    // Get the "Calculate" button for the final score
    var calculateButton = document.querySelector('.calculate-final-score');

    // Attach an event listener to the button
    calculateButton.addEventListener('click', function() {

        // Get all the result elements
        var results = document.querySelectorAll('.res');

        // Calculate the sum of values
        var sum = 0;
        results.forEach(function(result) {
            sum += parseFloat(result.textContent) || 0; // Convert result value to number, default to 0 if NaN
        });

        // Update the final score
        var finalScoreCell = document.querySelector('.final-score');
        finalScoreCell.innerHTML = sum.toString();
    });
});
