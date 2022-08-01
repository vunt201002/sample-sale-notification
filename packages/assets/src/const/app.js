const appRoute = {
  embed: '/embed',
  standalone: ''
};

export default appRoute;

export const getRoutePrefix = isEmbedApp => (isEmbedApp ? appRoute.embed : appRoute.standalone);
