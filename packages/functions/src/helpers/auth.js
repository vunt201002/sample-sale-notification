/**
 * Get current user from Koa context
 *
 * @param ctx
 * @returns {*}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user;
}
