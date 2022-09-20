(function(){

  /**
   * Initialize the cart
   */
  getCartSummaryDetails();

  /**
   * Add event listeners
   */

  /**
   * "Add to Cart" listner
   */
  document.addEventListener('submit', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.shopify-form-addToCart')) return;
    addToCart(event);
    // if we have a cartId stashed, we should add it to any cart form on this page
    event.target.elements['cartId'].value = localStorage.getItem('shopifyCartId') || "";
  });

  /**
   * Change cart item quantity listner
   */
  document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.shopify-button-changeQuantity')) return;
    changeQuantity(event);
  });

  /**
   * Remove item from cart listener
   */
  document.addEventListener('click', function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.shopify-button-removeItem')) return;
    removeItem(event);
  });

})();


/**
 * Fetch cart summary details from Netlify function API endpoints
 */
function getCartSummaryDetails() {
  if (localStorage.getItem('shopifyCartId')){
    postData('/api/get-cart', {
      'cartId': localStorage.getItem('shopifyCartId')
    })
    .then(data => {
      if(data.cart) {
        displayCartSummaryDetails(data.cart.id);
      }
      else {
        //clear a local cart if it has expired with Shopify
        localStorage.removeItem('shopifyCartId');
      }
    });
  } else {
    console.log(`No shopping cart yet`);
  }
}


/**
 * Update the page with latest cart info
 */
async function displayCartSummaryDetails(id) {
  const modalFrame = document.getElementById('shopify-cart-wrapper');
  if (modalFrame) {
    fetch(`/cart/?cartId=${id}`).then(function (response) {
      // The API call was successful!
      return response.text();
    }).then(function (html) {
      // This is the HTML from our response as a text string
      modalFrame.innerHTML = html;
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
}


/**
 * Helper function to make API calls
 */
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}


/**
 * Add an item to the cart, then update the cart summary details
 */
function addToCart(event) {
  event.preventDefault();
  const inputs = event.target.elements;
  const data = {
    cartId: inputs['cartId'].value == "undefined" ? null : inputs['cartId'].value,
    itemId: inputs['merchandiseId'].value,
    quantity: inputs['quantity'].value,
  };

  postData('/api/add-to-cart', data)
  .then(data => {
    // persist that cartId for subsequent actions
    localStorage.setItem('shopifyCartId', data.id);
    // update the cart ;abel in the navigation
    displayCartSummaryDetails(data.id);
  });
};

/**
 * Increment or decrement the quantity of an item in the cart, then update the cart summary details
 */
function changeQuantity(event) {
  console.log(event.currentTarget);
  const data = {
    cartId: event.target.dataset.cartid,
    itemId: event.target.dataset.merchandiseid,
    quantity: event.target.dataset.quantity,
  };
  postData('/api/update-quantity', data)
  .then(data => {
    displayCartSummaryDetails(event.target.dataset.cartid);
  });
}

/**
 * Remove an item from the cart, then update the cart summary details
 */
function removeItem(event) {
  console.log(event);
  const data = {
    cartId: event.target.dataset.cartid,
    itemId: event.target.dataset.merchandiseid,
  };
  postData('/api/remove-from-cart', data)
  .then(data => {
    displayCartSummaryDetails(event.target.dataset.cartid);
  });
}
