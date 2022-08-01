/**
 * Get support action
 */
export function getRawSupport() {
  if (!window.$crisp) return;
  window.$crisp.push(['do', 'chat:open']);
  window.$crisp.push(['set', 'message:text', `Hi,\nPlease help us to `]);
}
