import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [deBouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeOutId);
  }, [value, delay]);

  return deBouncedValue;
};
