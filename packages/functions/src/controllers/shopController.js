import {getCurrentShop} from '../helpers/auth';
import {getShopInfoByShopId} from '@functions/repositories/shopInfoRepository';
import {getShopById} from '@functions/repositories/shopRepository';

/**
 * @param ctx
 * @returns {Promise<{shop, shopInfo: *}>}
 */
export async function getUserShops(ctx) {
  // todo: Strip access token by default
  const shopId = getCurrentShop(ctx);
  const [shop, shopInfo] = await Promise.all([getShopById(shopId), getShopInfoByShopId(shopId)]);
  ctx.body = {shop, shopInfo};
}
