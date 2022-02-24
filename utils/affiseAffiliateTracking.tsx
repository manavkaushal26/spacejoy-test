// import fetcher from "@utils/fetcher";
import Cookies from 'js-cookie';
import { isProduction } from './config';
const EcommGoalValue = 3;

const saveUtmClick = async (params = { orderId: '', sum: 0 }) => {
  const utmClickId = Cookies.get('clickId');

  if (utmClickId) {
    const { orderId, sum } = params;
    // Since this repo only contains the code for Ecommerce purchases
    const endPoint = `https://offers-spacejoy.affise.com/postback?clickid=${utmClickId}&goal=${EcommGoalValue}&action_id=${orderId}&sum=${Math.floor(
      sum
    )}`;
    await fetch(endPoint, { method: 'GET' });
  }
};
const trackUtmClick = (utmClickId) => {
  const { clickId = '' } = utmClickId;
  if (clickId && typeof window !== undefined) {
    const domain = window.location.host.split('.').splice(-2).join('.');
    Cookies.set('clickId', clickId, { expires: 30, domain: isProduction ? `.${domain}` : 'localhost' });
  }
};
export { trackUtmClick, saveUtmClick };
