import {getSettings, updateSettings} from '@functions/repositories/settingsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function get(ctx) {
  try {
    // const shopDomain = ctx.state.user.shopifyDomain;
    const shopId = getCurrentShop(ctx);
    const settings = await getSettings(shopId);

    ctx.status = 200;
    return (ctx.body = {
      data: settings,
      success: true
    });
  } catch (err) {
    ctx.status = 404;
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false
    });
  }
}

export async function update(ctx) {
  try {
    const shopDomain = ctx.state.user.shopifyDomain;
    const shopId = getCurrentShop(ctx);
    const {data} = ctx.req.body;

    const res = await updateSettings(shopDomain, shopId, data);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      res
    });
  } catch (err) {
    ctx.status = 400;
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false
    });
  }
}
