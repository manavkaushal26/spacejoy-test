import { PricingData } from '@components/Pricing/PricingTypes';
import fetcher from '@utils/fetcher';
import { useSessionStorage } from '@utils/hooks/useSessionStorage';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const PricingContext = createContext({ userCountry: '', pricingData: [] });

const PricingPackagesProvider = ({ children }) => {
  const [fetchingCountry, setFetchingCountry] = useState(false);
  const [userCountry, setUserCountry] = useSessionStorage('userCountry', '');
  const [fetchingPackages, setFetchingPackages] = useState<boolean>(false);
  const [packages, setPackages] = useState<PricingData[]>([]);

  const fetchPricingPackages = async (country: string) => {
    setFetchingPackages(true);
    try {
      const res = await fetcher({
        endPoint: `https://apiv2.spacejoy.com/v1/package?country=${country}`,
        method: 'GET',
        hasBaseUrl: true,
      });
      if (res.statusCode <= 301) {
        setPackages(res.data.packages);
      } else {
        throw new Error('Error while fetching pricing options.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingPackages(false);
    }
  };

  const fetchCountry = useCallback(async () => {
    setFetchingCountry(true);
    try {
      const res = await fetcher({
        endPoint: `https://apiv2.spacejoy.com/v1/user/country`,
        method: 'GET',
        hasBaseUrl: true,
      });
      if (res.statusCode <= 301) {
        setUserCountry(res.data.country);
      } else {
        throw new Error('Error while fetching user country.');
      }
    } catch (e) {
      console.log('error ---', e.message);
    } finally {
      setFetchingCountry(false);
    }
  }, []);

  useEffect(() => {
    if (!userCountry) {
      fetchCountry();
    } else {
      fetchPricingPackages(userCountry || 'US');
    }
  }, [userCountry]);

  return <PricingContext.Provider value={{ userCountry, pricingData: packages }}>{children}</PricingContext.Provider>;
};

export const usePricingMeta = () => {
  return useContext(PricingContext);
};

export default PricingPackagesProvider;
