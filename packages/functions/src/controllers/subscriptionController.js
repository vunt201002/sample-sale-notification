import {authentication} from '@avada/shopify-auth';

/**
 * Get current subscription of a shop
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function getSubscription(ctx) {
  try {
    const shop = await authentication.getShop(ctx);
    ctx.body = {shop};
  } catch (e) {
    console.error(e);
    ctx.body = {error: e.message};
  }
}
