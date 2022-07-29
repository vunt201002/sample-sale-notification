export const setLoadingTypes = {
  SET_LOADING: '@layout/SET_LOADING'
};

/**
 * Set loading action
 *
 * @param {boolean} loading
 * @return {{payload: boolean, type: string}}
 */
export function setLoading(loading = true) {
  return {type: setLoadingTypes.SET_LOADING, payload: loading};
}
