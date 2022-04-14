// import fetcher from "@utils/fetcher";
import Cookies from 'js-cookie';
import { isProduction } from './config';
const EcommGoalValue = 3;

const saveUtmClick = async (params = { orderId: '', sum: 0 }) => {
  const utmClickId = Cookies.get('clickId');

  if (utmClickId) {
    const { orderId, sum } = params;
    let sumValue = sum;
    if (typeof sumValue === 'string') {
      sumValue = parseFloat(sumValue);
    }
    sumValue = isNaN(sumValue) ? 0 : sumValue / 100;

    // Since this repo only contains the code for Ecommerce purchases
    // const endPoint = `https://offers-spacejoy.affise.com/postback?clickid=${utmClickId}&goal=${EcommGoalValue}&action_id=${orderId}&sum=${sumValue?.toFixed(
    //   2
    // )}`;
    const endPoint = `https://psb1.reachaff.com/postbacks?clickid=${utmClickId}&goal=${EcommGoalValue}&action_id=${orderId}&sum=${sumValue?.toFixed(
      2
    )}&campaign_id=90`;
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
