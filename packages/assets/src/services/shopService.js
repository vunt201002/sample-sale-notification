import {auth} from '@assets/helpers';
import {setLoading, setToast} from '@assets/actions/storeAction';
import {handleError} from '@assets/services/errorService';

/**
 * @param {Shop} shop
 * @param shopInfo
 * @return {*&{shopifyPhone: (string|string), createdAt: *, shopifyPlan: *, shopifyCountry: string, timezone: *, shopAddress: string}}
 */
export function collectActiveShopData({shop, shopInfo}) {
  return {
    ...shop,
    shopifyPlan: shopInfo.planName,
    shopifyCountry: shopInfo.country,
    shopAddress: `${shopInfo.address1 || ''}, ${shopInfo.country}`,
    shopifyPhone: shopInfo.phone || '',
    timezone: shopInfo.ianaTimezone,
    createdAt: shopInfo.createdAt
  };
}

export function isShopUpgradable(_shop) {
  return true;
}

export async function logout(dispatch) {
  try {
    setLoading(dispatch, true);
    await auth.signOut();
    setToast(dispatch, 'Logged out successfully');
    window.location.href = '/auth/login';
  } catch (e) {
    handleError(e);
    setToast(dispatch, e.message, true);
  } finally {
    setLoading(dispatch, false);
  }
}
