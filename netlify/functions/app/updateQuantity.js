const { postToShopify } = require('./postToShopify')

/**
 * @param {string} cartId - Target cart to update
 * @param lineId - Line id that the item belongs to
 */
exports.updateCart = async ({ cartId, lineId, quantity }) => {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        mutation updateItemsInCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        "cartId": cartId,
        "lines": {
          "id": lineId,
          "quantity": parseInt(quantity),
        },
      },
    })

    return shopifyResponse
  } catch (error) {
    console.log(error)
  }
}
