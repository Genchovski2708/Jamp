document.addEventListener("DOMContentLoaded", function() {
    // Get all input elements in the first table
    var inputs = document.querySelectorAll('table:first-of-type input[type="number"]');

    // Add event listeners to each input element
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var value = parseInt(input.value); // Parse the input value as an integer

            // Check if the value is NaN or less than 0
            if (isNaN(value) || value < 0) {
                input.value = ''; // Clear the input value
            } else if (value > 30) { // Check if the value is greater than 30
                input.value = '30'; // Set the input value to 30
            }
        });
    });
});