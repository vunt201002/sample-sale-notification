export const getUserTypes = {
  GET_USER_SUCCEED: '@@user/GET_USER_SUCCEED'
};

/**
 * An action creator to create a new action that is dispatched after get the current user successfully
 *
 * @param {object} user
 * @return {{payload: *, type: string}}
 */
export function getUserSucceed(user) {
  return {type: getUserTypes.GET_USER_SUCCEED, payload: user};
}
