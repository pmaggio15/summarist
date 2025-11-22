export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('intendedDestination');
  }
};

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const isSubscribed = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isSubscribed') === 'true';
};

export const login = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isLoggedIn', 'true');
  }
};

export const setSubscription = (subscribed: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isSubscribed', subscribed.toString());
  }
};

export const setIntendedDestination = (path: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('intendedDestination', path);
  }
};

export const getIntendedDestination = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('intendedDestination');
};

export const clearIntendedDestination = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('intendedDestination');
  }
};
