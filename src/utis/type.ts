import type React from 'react';

export type PhotoRenderParams = {
  /**
   * 自定义渲染 DOM 属性
   */
  attrs: Partial<React.HTMLAttributes<HTMLElement>>;
  scale: number;
  rotate: number;
};