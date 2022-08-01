import {getRoutePrefix} from '../const/app';
import {isEmbeddedApp} from '../helpers';

const getUrl = url => getRoutePrefix(isEmbeddedApp()) + url;

export default getUrl;
