/**
 * Get current user uid from context.
 * UID here is Firebase Authentication UID
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user.sub;
}

/**
 * Get current shop id from Koa context
 * Shop ID was set from authentication step in Shopify login
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentShop(ctx) {
  return ctx.state.user.shopID;
}

/**
 * Get current shop id from Koa context
 *
 * @param ctx
 * @returns {*}
 */
export function getCurrentUserInstance(ctx) {
  return ctx.state.user;
}
