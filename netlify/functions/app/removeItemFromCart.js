const { postToShopify } = require('./postToShopify')

/**
 * @param {string} cartId - Target cart to update
 * @param lineId - Line id that the item belongs to
 */
exports.removeItemFromCart = async ({ cartId, lineId }) => {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        mutation removeItemFromCart($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          title
                          handle
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    })

    return shopifyResponse
  } catch (error) {
    console.log(error)
  }
}
