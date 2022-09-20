/**
 * API Endpoint
 *
 * * Purpose: Get checkout URL for a cart
 * @param {string} cartId
 *
 * Example:
 *```
 * fetch('/.netlify/functions/get-checkout', {
 *   method: 'POST',
 *   body: JSON.stringify({ cartId: '12345' })
 * })
 * ```
 *
 */

 const { postToShopify } = require('./app/postToShopify')

 exports.handler = async (event) => {
   const { cartId } = JSON.parse(event.body);
   try {
     console.log('--------------------------------')
     console.log('Passing cart to checkout...')
     console.log('--------------------------------')
     const shopifyResponse = await postToShopify({
       query: `
        query checkoutURL($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
          }
        }
       `,
       variables: {
         cartId,
       },
     })
     return {
       statusCode: 200,
       body: JSON.stringify(shopifyResponse),
     }
   } catch (error) {
     console.log(error)
   }
 }
