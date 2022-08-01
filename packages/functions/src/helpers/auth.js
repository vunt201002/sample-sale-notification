/**
 * Get current shop id from Koa context
 * Shop ID was set from authentication step in Shopify login
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentShop(ctx) {
  console.log(ctx.state.user);
  return ctx.state.user.shopID;
}

/**
 * Get current user from Koa context
 *
 * @param ctx
 * @returns {*}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user;
}
