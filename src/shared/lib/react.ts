import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debauncedValue, setDebauncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebauncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debauncedValue;
}
