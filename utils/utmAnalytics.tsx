// import fetcher from "@utils/fetcher";
import { reactLocalStorage } from './helpers';

const saveUtmClick = async (flow: string, params = { orderId: '', sum: 0 }) => {
  const utmClickId = reactLocalStorage.get('utmClickId');
  if (utmClickId) {
    const { orderId, sum } = params;
    const endPoint =
      flow === 'signup'
        ? `https://offers-spacejoy.affise.com/postback?clickid=${utmClickId}`
        : `https://offers-spacejoy.affise.com/postback?clickid=${utmClickId}&goal=2&action_id=${orderId}&sum=${sum}`;
    await fetch(endPoint, { method: 'GET' });
    reactLocalStorage.remove('utmClickId');
  }
};
const trackUtmClick = (utmClickId) => {
  const { clickId = '' } = utmClickId;
  if (clickId) reactLocalStorage.set('utmClickId', clickId);
};
export { trackUtmClick, saveUtmClick };
