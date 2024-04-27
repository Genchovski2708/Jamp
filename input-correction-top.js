
    document.addEventListener("DOMContentLoaded", function() {
    var rows = document.querySelectorAll('table:first-of-type tbody tr');

    rows.forEach(function(row, index) {
    var inputs = row.querySelectorAll('input');
    inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
    var value = parseInt(input.value);

    // Set the limit and increment based on the row index
    var limit = (index + 1) * 5;
    var increment = index + 1;

    // Validate the input value against the limit and increment
    if (value < 0) {
    input.value = 0;
} else if (value > limit) {
    input.value = limit;
} else if (value % increment !== 0) {
    input.value = Math.floor(value / increment) * increment; // Round down to the nearest multiple of the increment
}
});
});
});
});

