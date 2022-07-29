import App from './App';
import React from 'react';
import './styles/app.scss';
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {setUser} from './actions/layout/setUserAction';
import {
  auth,
  // collectActiveShopData,
  api,
  // pushDataToCrisp,
  store
} from './helpers';
import {setLoading} from './actions/layout/setLoadingAction';
import {isEmpty} from '@avada/utils';
// import {setActiveShop} from './actions/shop/getShopsActions';
// import {isShopUpgradable} from '@avada/functions/src/config/subscription/plans';
// import {getSubscription} from './actions/subscription/getSubscriptionActions';
// import TagManager from 'react-gtm-module';
// import loadCrisp from './helpers/loadCrisp';

window.isAuthenticated = false;

auth.onAuthStateChanged(async user => {
  if (user === null && !window.isAuthenticated) {
    window.location.href = 'auth/login';
    ReactDOM.render(<div />, document.getElementById('app'));
  } else {
    window.isAuthenticated = true;
    store.dispatch(setLoading(true));
    const {shop, shopInfo} = await api('/shops');
    if (!isEmpty(shop)) {
      // const firebaseUser = await auth.currentUser.getIdTokenResult();
      // const userCustomClaims = firebaseUser.claims;
      // const activeShop = {
      //   ...userCustomClaims,
      //   vendor: firebaseUser.claims.type || 'others',
      //   ...collectActiveShopData({shop, shopInfo})
      // };
      // window.activeShop = activeShop;
      // store.dispatch(setActiveShop(activeShop));
      // if (
      //   window.location.pathname !== '/subscription' &&
      //   isShopUpgradable(activeShop, true)
      // ) {
      //   store.dispatch(getSubscription());
      // }
      // TagManager.initialize({gtmId: 'GTM-W5HFBRT'});
      // if (!userCustomClaims.isCrmLogin) {
      //   loadCrisp(
      //     '72a663b0-4cda-4e3b-8878-426bdd79364c',
      //     shop.crispSessionToken
      //   );
      //   pushDataToCrisp({shopData: shop, user});
      // }
    }

    store.dispatch(setUser(user));
    store.dispatch(setLoading(false));

    const loading = document.getElementById('PreLoading');
    if (loading !== null) {
      loading.style.display = 'none';
    }
    ReactDOM.render(
      <Provider store={store}>
        <App isEmbedApp={false} />
      </Provider>,
      document.getElementById('app')
    );
  }
});

// Register a service worker for PWA application
serviceWorker.register();
