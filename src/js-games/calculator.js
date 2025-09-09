// iOS Calculator JavaScript
let display;
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function takeValue(value) {
    if (!display) {
        console.error('Display element not found');
        return;
    }

    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }

    // Handle special cases
    switch(value) {
        case '±':
            if (display.value !== '' && display.value !== '0') {
                if (display.value.startsWith('-')) {
                    display.value = display.value.substring(1);
                } else {
                    display.value = '-' + display.value;
                }
            }
            break;

        case '%':
            if (display.value !== '' && display.value !== '0') {
                display.value = (parseFloat(display.value) / 100).toString();
            }
            break;

        default:
            // Prevent multiple decimal points
            if (value === '.' && display.value.includes('.')) {
                return;
            }

            // Handle leading zero
            if (display.value === '0' && value !== '.') {
                display.value = value;
            } else {
                display.value += value;
            }
            break;
    }
}

function clearInput() {
    if (display) {
        display.value = '0';
    }
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
}

function calculateResult() {
    if (!display || display.value === '' || display.value === '0') return;

    try {
        let result = eval(display.value);

        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            // Format the result
            if (result % 1 !== 0) {
                // Limit decimal places for floating point results
                result = parseFloat(result.toFixed(8));
            }
            display.value = result.toString();
        }

        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}

// Initialize display
function initializeCalculator() {
    display = document.getElementById('inputwindow');
    if (!display) {
        console.error('Display element not found');
        return;
    }

    display.value = '0';

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        // Number keys
        if (key >= '0' && key <= '9') {
            takeValue(key);
        }
        // Operators
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            takeValue(key);
        }
        // Decimal point
        else if (key === '.') {
            takeValue('.');
        }
        // Enter or equals for calculation
        else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculateResult();
        }
        // Escape or 'c' for clear
        else if (key === 'Escape' || key.toLowerCase() === 'c') {
            clearInput();
        }
        // Backspace for deleting last character
        else if (key === 'Backspace') {
            if (display && display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            } else if (display) {
                display.value = '0';
            }
        }
    });

    // Prevent default form submission
    document.addEventListener('submit', function(event) {
        event.preventDefault();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalculator);
