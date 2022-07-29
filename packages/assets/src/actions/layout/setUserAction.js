export const setUserTypes = {
  SET_USER: '@@layout/SET_USER'
};

/**
 * Set user action
 *
 * @param {object} user
 * @return {{payload: *, type: string}}
 */
export function setUser(user) {
  return {type: setUserTypes.SET_USER, payload: user};
}
