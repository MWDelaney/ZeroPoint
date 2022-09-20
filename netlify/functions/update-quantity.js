/**
 * Update quantity of Item From Cart API Endpoint
 *
 * * Purpose: Remove a single item from the cart
 * @param {string} cartId
 * @param {string} lineId - Not the item or variant id
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/remove-from-cart, {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 'S9Qcm9kdWN0VmFyaWFudC8zOTc0NDEyMDEyNzY5NA',
 *     lineId: 'RIJC3mn0c862e2fc3314ba5971bf22d73d7accb'
 *   })
 * })
 * ```
 */

 const { updateCart } = require('./app/updateQuantity')
 const querystring = require("querystring");

 exports.handler = async (event) => {

   let data = JSON.parse(event.body)
   let cartId = data.cartId
   let lineId = data.itemId
   let quantity = data.quantity

   try {
     console.log('--------------------------------')
     console.log('Updating quantity for item in cart...')
     console.log('--------------------------------')
     const shopifyResponse = await updateCart({
       cartId,
       lineId,
       quantity,
     })

     return {
       statusCode: 200,
       body: JSON.stringify(shopifyResponse),
     }

   } catch (error) {
     console.log(error)
   }
 }
