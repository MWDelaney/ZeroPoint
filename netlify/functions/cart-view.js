const { faColonSign } = require('@fortawesome/free-solid-svg-icons');
const fetch = require('node-fetch');

exports.handler = async (event) => {

  const rootURL = process.env.URL || "https://localhost:8888";

  const cartId = event.queryStringParameters.cartId;
  const result = await fetch(`${rootURL}/api/get-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartId: cartId
    }),
  })
  .then((res) =>{
    return res.json()
  });

  const checkout = await fetch(`${rootURL}/api/get-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartId: cartId
    }),
  })
  .then((res) =>{
    console.dir(res);
    return res.json()
  });


  const itemTotal = function(price, quantity) {
    const totalPrice = Number(price) * Number(quantity)
    return totalPrice.toFixed(2)
  }


  const cartItem = (cartId, item) => {
    const displayTitleModifier = item.merchandise.title == "Default Title" ? "" : item.merchandise.title;
    const increment = item.quantity + 1;
    const decrement = item.quantity - 1;
    return `
      <a href"=/products/${item.merchandise.product.handle}">
        <h3>${ item.merchandise.product.title }</h3>
      </a>
      <p><strong>$${item.merchandise.priceV2.amount}</strong></p>
        <div class="product-line d-flex">
        <button
            class="btn btn-primary rounded shopify-button shopify-button-changeQuantity"
            type="button"
            data-cartid="${cartId}"
            data-merchandiseid="${item.id}"
            data-quantity="${decrement}"
          >
          -
          </button>
          <span id="number">${ item.quantity }</span>
          <button
              class="btn btn-primary rounded shopify-button shopify-button-changeQuantity"
              type="button"
              data-cartid="${cartId}"
              data-merchandiseid="${item.id}"
              data-quantity="${increment}"
            >
                +
              </button>
              <button
              class="btn btn-link rounded shopify-button shopify-button-removeItem"
              type="button"
              data-cartid="${cartId}"
              data-merchandiseid="${item.id}"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
        </div>
`};

  const cartTotals = (cart) => {

    if (!cart.lines.edges.length) {
      console.log(`No basket`);
      return `<div class="cart-total-content">
        <div class="cart-total-column">
          <a href="/" target="_parent">Your cart is empty!</a>
        </div>
      </div>`;
    }

    return `
    <div class="cart-total-content">
      <div class="cart-total-column">
        <p>
          Subtotal: <strong>$${cart.estimatedCost.subtotalAmount.amount} ${cart.estimatedCost.totalAmount.currencyCode} </strong>
        </p>
        <p>Shipping: Free Shipping</p>
        <p>Total: <strong>$${cart.estimatedCost.totalAmount.amount} ${cart.estimatedCost.totalAmount.currencyCode} </strong></p>
      </div>
    </div>
    <section class="cart-checkout">
      <a class="btn btn-primary" href="${checkout.cart.checkoutUrl}" target="_parent">Proceed to Checkout</a>
    </section>`;
  }


  let items = "";
    result.cart.lines.edges.forEach(item => {
    items += cartItem(result.cart.id, item.node)
  });

  const pageTemplate = (items, totals) => {return `
      <div class="cart-page">
        <div class="row product-image">
          <div class="col-5">
            <img src="/assets/images/delaviebottle.png" alt="Aeonia Bottle"/>
          </div>
          <div class="col-7 product-info">
            <article class="cart-page-content">
              <h1>Shopping Cart</h1>
              <div>
                ${items}
                <section class="cart-total">
                  ${cartTotals(result.cart)}
                </section>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  `};

  return {
    statusCode: 200,
    body: pageTemplate(items, result.cart.estimatedCost)
  };
}
