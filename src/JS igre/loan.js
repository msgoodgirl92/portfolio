function computeLoan(){
    //The global constants of some class functions(value) are determined using the following three line codes
    const amount = document.querySelector('#amount').value;
    const interest_rate = document.querySelector('#interest_rate').value;
    const months = document.querySelector('#months').value;
    
    //The interest rate has been calculated.
    //The total amount of interest per month has been calculated by the following calculation.
    //That calculation is stored in a constant called "interest"
    const interest = (amount * (interest_rate * 0.01)) / months;
    
    //The bottom line calculates how much to pay each month.
    //Here the total amount is divided by the month (which you will input) and the monthly interest is added to it.
    //All these calculations are stored in a constant called "payment".     
    let payment = ((amount / months) + interest).toFixed(2); 
    
    //regedit to add a comma after every three digits
    //That is, a comma (,) will be added after every three numbers.
    //Example 50,000
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    
    //With the help of innerHTML, the information stored in the "payment" is displayed on the webpage.
    document.querySelector('#payment').innerHTML = `Mesecna rata = ${payment}`
    }