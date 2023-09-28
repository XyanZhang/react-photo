import { useReducer } from 'react';

// 初始化
export default function useSetState<S extends Record<string, any>>(initialState: S) {
  return useReducer(
    (state: S, action: Partial<S> | ((state: S) => Partial<S>)) => ({
      ...state,
      ...(typeof action === 'function' ? action(state) : action),
    }),
    initialState,
  );
}