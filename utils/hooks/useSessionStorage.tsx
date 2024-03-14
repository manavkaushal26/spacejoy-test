import { useEffect, useState } from 'react';

// Custom hook to access session storage
export const useSessionStorage = <T,>(key: string, initialValue: T) => {
  // Initialize state with the value from session storage if it exists
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if window is available (for SSR or testing environments)
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.sessionStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from session storage:', error);

      return initialValue;
    }
  });

  // Function to set a value to session storage
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to session storage
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to session storage:', error);
    }
  };

  // Use useEffect to ensure this code only runs on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === key) {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        }
      };

      // Add event listener for changes in session storage
      window.addEventListener('storage', handleStorage);

      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener('storage', handleStorage);
      };
    }
  }, [initialValue, key]);

  return [storedValue, setValue] as const;
};
