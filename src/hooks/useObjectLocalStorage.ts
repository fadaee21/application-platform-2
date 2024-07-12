import { useState } from "react";
/**
 * Returns a tuple containing the stored value and a function to update the stored value in the local storage.
 *
 * @param {string} key - The key used to store the value in local storage.
 * @param {T} initialValue - The initial value to be stored in the local storage.
 * @return {[T, (value: T) => void]} A tuple containing the stored value and a function to update the stored value.
 */
function useObjectLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const readValue = (): T => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };
  const [storedValue, setStoredValue] = useState<T>(() => readValue());
  const setValue = (value: T): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

export default useObjectLocalStorage;
