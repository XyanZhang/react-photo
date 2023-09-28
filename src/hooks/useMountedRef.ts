import { useRef, useEffect } from 'react';

export default function useMountedRef():React.MutableRefObject<Boolean> {
  const mountRef: React.MutableRefObject<Boolean> = useRef<Boolean>(false);
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    }
  },[])
  return mountRef
}