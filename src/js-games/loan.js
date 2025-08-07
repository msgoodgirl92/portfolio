function computeLoan(){
    // Get input values
    const amount = parseFloat(document.querySelector('#amount').value);
    const interest_rate = parseFloat(document.querySelector('#interest_rate').value);
    const months = parseInt(document.querySelector('#months').value);

    // Check if all fields are filled
    if (!amount || !interest_rate || !months) {
        alert('Molimo vas da popunite sva polja!');
        return;
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = interest_rate / 100 / 12;

    // Calculate monthly payment using loan formula
    const monthlyPayment = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                          (Math.pow(1 + monthlyInterestRate, months) - 1);

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
