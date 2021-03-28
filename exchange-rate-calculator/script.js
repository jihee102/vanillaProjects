const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swapBtn  = document.getElementById("swap")


// Fetch exchange rate and update the DOM
function calculate(){
    const currency1 = currencyEl_one.value;
    const currency2 = currencyEl_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then(res=>res.json())
    .then(data =>{
        console.log(data);
        const rate = data.rates[currency2];

        rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`;

        amountEl_two.value= (amountEl_one.value*rate).toFixed(2);
    });
}

// Event listners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swapBtn.addEventListener('click', ( )=>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();