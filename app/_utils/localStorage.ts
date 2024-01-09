export const setInLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting value in localStorage:', error);
  }
};

// Function to get a value from localStorage
export const getFromLocalStorage = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Error getting value from localStorage:', error);
    return null;
  }
};
