import App from './App';
import React from 'react';
import './styles/app.scss';
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';
import {
  // collectActiveShopData,
  api,
  // pushDataToCrisp,
  store
} from './helpers';
import {setLoading} from './actions/layout/setLoadingAction';
// import {setActiveShop} from './actions/shop/getShopsActions';
import {isEmpty} from '@avada/utils';
// import {setUser} from './actions/layout/setUserAction';
// import {isShopUpgradable} from '@avada/functions/src/config/subscription/plans';
// import {getSubscription} from './actions/subscription/getSubscriptionActions';
// import loadCrisp from './helpers/loadCrisp';

(async () => {
  store.dispatch(setLoading(true));

  const {shop, shopInfo} = await api('/shops');
  if (!isEmpty(shop)) {
    // loadCrisp('72a663b0-4cda-4e3b-8878-426bdd79364c', shop.crispSessionToken);
    // const activeShop = {
    //   ...collectActiveShopData({shop, shopInfo})
    // };
    // const user = {
    //   email: activeShop.email,
    //   displayName: shopInfo.shopOwner
    // };
    // store.dispatch(setActiveShop(activeShop));
    // store.dispatch(setUser(user));
    // window.activeShop = activeShop;
    // if (
    //   window.location.pathname !== '/subscription' &&
    //   isShopUpgradable(activeShop, true)
    // ) {
    //   store.dispatch(getSubscription());
    // }
    // pushDataToCrisp({shopData: activeShop, user});
  }

  store.dispatch(setLoading(false));

  const loading = document.getElementById('PreLoading');
  if (loading !== null) {
    loading.style.display = 'none';
  }

  ReactDOM.render(
    <Provider store={store}>
      <App isEmbedApp={true} />
    </Provider>,
    document.getElementById('app')
  );
})();
