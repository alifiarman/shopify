var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
function formatMoney (cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};






// document.querySelectorAll('.remove').forEach((remove) =>{
//   remove.addEventListener("click" ,(e) => {
//     e.preventDefault();
   
//     const item = remove.closest('.cart-raw');
//     const key = item.getAttribute('data-key');
  


//     axios.post('/cart/change.js', {
//       id: key,
//       quantity: 0
//     }).then(res => {

//       if (res.data.items.length===0){
//         document.querySelector('#cart_form').remove();
        
        
//       }else{

//         item.remove();
//       }
     
//     });
//   });
// });




// document.querySelectorAll(".input-button-wrap button").forEach((button) => {
//     button.addEventListener("click", () => {


//         const input = button.parentElement.querySelector("input");
//         const value = Number(input.value);
//         const isPlus = button.classList.contains('plus');
//         const key = button.closest(".cart-raw").getAttribute("data-key");

//         if (isPlus){
//             const newValue = value + 1 ;
//             input.value = newValue;
//             changeItemQuantity(key, newValue)
//         } else if (value > 1){
//             const newValue = value - 1 ;
//             input.value = newValue;
//             changeItemQuantity(key, newValue)
//         }
//     });
// });

// function changeItemQuantity (key , quantity){
//     axios.post("/cart/change.js", {
//         id : key,
//         quantity,
//     }).then((res) => {
//         const format = document.querySelector('[data-money-format]').getAttribute('data-money-format')
//         const totalDiscount =formatMoney(res.data.total_discount , format) 
//         const totalPrice = formatMoney(res.data.total_price , format)
//         const item = res.data.items.find(item => item.key === key)
//         const itemPrice = formatMoney(item.final_line_price, format)


//         document.querySelector('#total-discount').textContent = totalDiscount;
//         document.querySelector('#sub-totla-price').textContent = totalPrice;
//         document.querySelector('#totla-price').textContent = totalPrice;
//         document.querySelector(`[data-key="${key}"] .line-total-price`).textContent = itemPrice;
     
//     })
// };