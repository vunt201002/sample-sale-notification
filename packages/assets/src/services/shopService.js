import {auth} from '@assets/helpers';
import {setLoading, setToast} from '@assets/actions/storeAction';

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
    console.log(e);
    setToast(dispatch, e.message, true);
  } finally {
    setLoading(dispatch, false);
  }
}
