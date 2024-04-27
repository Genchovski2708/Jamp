document.addEventListener("DOMContentLoaded", function() {
    var rows = document.querySelectorAll('table:last-of-type tbody tr');

    rows.forEach(function(row, index) {
        var inputs = row.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                var value = parseInt(input.value);

                // Set the limit based on the row index
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
            });
        });
    });
});
