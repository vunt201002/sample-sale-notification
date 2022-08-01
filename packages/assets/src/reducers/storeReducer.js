import React, {createContext, useContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {reducer} from '@assets/actions/storeAction';
import {isShopUpgradable} from '@assets/services/shopService';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * @type {React.Context<{state: {loading, user, shop, subscription, isToast, toast}, dispatch: function}>}
 */
const StoreReducer = createContext({});

export const useStore = () => useContext(StoreReducer);

export const StoreProvider = ({children, user, activeShop: shop}) => {
  const {fetchApi: getSubscription} = useFetchApi('/subscription', {}, null, false);
  const [state, dispatch] = useReducer(reducer, {user, shop});
  const handleDispatch = (type, payload = null) => dispatch({type, payload});

  window.activeShop = shop; // for debugging only

  useEffect(() => {
    if (window.location.pathname !== '/subscription' && isShopUpgradable(shop)) {
      getSubscription();
    }
  }, []);

  return (
    <StoreReducer.Provider value={{state, dispatch: handleDispatch}}>
      {children}
    </StoreReducer.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  activeShop: PropTypes.any
};
