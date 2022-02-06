import cookie from 'js-cookie';
import { reactLocalStorage } from './helpers';

export const logoutPinterest = () => {
  cookie.remove('pinterest_access_token');
  cookie.remove('pinterest_refresh_token');
  reactLocalStorage.remove('pinterest_user');
};
