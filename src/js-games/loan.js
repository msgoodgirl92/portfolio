function computeLoan(){
    // Read raw values
    const amountEl = document.querySelector('#amount');
    const rateEl = document.querySelector('#interest_rate');
    const monthsEl = document.querySelector('#months');

    const amountVal = amountEl.value.trim();
    const rateVal = rateEl.value.trim();
    const monthsVal = monthsEl.value.trim();

    // Validate presence (do not allow empty fields)
    if (amountVal === '' || rateVal === '' || monthsVal === '') {
        alert('Molimo vas da popunite sva polja!');
        return;
    }

    // Parse numbers
    const amount = parseFloat(amountVal);
    const interest_rate = parseFloat(rateVal);
    const months = parseInt(monthsVal, 10);

    // Validate numeric values
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(interest_rate) || !Number.isFinite(months) || months <= 0) {
        alert('Uneti podaci nisu validni.');
        return;
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = interest_rate / 100 / 12;

    // Calculate monthly payment (handle 0% interest as a special case)
    let monthlyPayment;
    if (monthlyInterestRate === 0) {
        monthlyPayment = amount / months;
    } else {
        monthlyPayment = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                         (Math.pow(1 + monthlyInterestRate, months) - 1);
    }

    // Calculate total amount and total interest
    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - amount;

    // Format numbers with commas
    const formatNumber = (num) => {
        return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Display results
    document.querySelector('#payment').innerHTML = `${formatNumber(monthlyPayment)} RSD`;
    document.querySelector('#totalAmount').innerHTML = `${formatNumber(totalAmount)} RSD`;
    document.querySelector('#totalInterest').innerHTML = `${formatNumber(totalInterest)} RSD`;

    // Show the result section with animation
    const resultSection = document.querySelector('#result');
    resultSection.style.display = 'block';
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        resultSection.style.transition = 'all 0.5s ease';
        resultSection.style.opacity = '1';
        resultSection.style.transform = 'translateY(0)';
    }, 100);
}

function clearForm(){
    // Clear all input fields
    document.querySelector('#amount').value = '';
    document.querySelector('#interest_rate').value = '10';
    document.querySelector('#months').value = '12';

    // Hide result section with animation
    const resultSection = document.querySelector('#result');
    resultSection.style.transition = 'all 0.3s ease';
    resultSection.style.opacity = '0';
    resultSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        resultSection.style.display = 'none';
    }, 300);

    // Focus on first input field
    document.querySelector('#amount').focus();
}

// Add event listener for Enter key on input fields
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Check if all fields are filled before computing
                const amount = document.querySelector('#amount').value.trim();
                const interest_rate = document.querySelector('#interest_rate').value.trim();
                const months = document.querySelector('#months').value.trim();
                
                if (amount && interest_rate && months) {
                    computeLoan();
                } else {
                    alert('Molimo vas da popunite sva polja pre pritiskanja Enter!');
                }
            }
        });
    });
});
