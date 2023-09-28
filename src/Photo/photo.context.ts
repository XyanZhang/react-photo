import { createContext } from 'react';
export type UpdateItemType = (dataType: any) => void;

export interface PhotoContextType {
  show: (key: number) => void;
  update: UpdateItemType;
  remove: (key: number) => void;
  nextId: () => number;
}

export default createContext<PhotoContextType>({
  nextId: () => 1,
  update: () => undefined,
  remove: () => undefined,
  show: () => undefined
} as unknown as PhotoContextType);
