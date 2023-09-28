import { Children, cloneElement, useContext, useEffect, useMemo, useRef } from "react";
import useInitial from "../hooks/useInitial";
import useMethods from "../hooks/useMethods";
import { PhotoRenderParams } from "../utis/type";
import PhotoContext, { PhotoContextType } from './photo.context'

type TriggerType = ('onClick' | 'onDoubleClick')[];

interface PhotoViewProps {
  src?: string;
  render?: (props: PhotoRenderParams) => React.ReactNode;
  overlay?: React.ReactNode;
  width?: number;
  height?: number,
  children?: React.ReactElement;
  triggers?: TriggerType

}
const PhotoView: React.FC<PhotoViewProps> = ({
  src, 
  render,
  overlay,
  width,
  height,
  triggers = ['onClick'],
  children
}) => {
  const photoContext =  useContext<PhotoContextType>(PhotoContext);
  const key = useInitial(() => photoContext.nextId()); // 保存nextId获取 
  const originRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      photoContext.remove(key); // 组件卸载移除 photoContext
    }
  })

  function invokeChildrenFn(eventName: string, e: React.SyntheticEvent) {
    if (children) {
      const eventFn = children.props[eventName];
      if (eventFn) {
        eventFn(e);
      }
    }
  }

  const fn = useMethods({
    render(props: PhotoRenderParams) {
      return render && render(props);
    },
    show(eventName: string, e: React.MouseEvent) {
      photoContext.show(key);
      invokeChildrenFn(eventName, e);
    },
  });

  const eventListeners = useMemo(() => {
    const listener:any = {};
    triggers.forEach((eventName) => {
      listener[eventName] = fn.show.bind(null, eventName);
    });
    return listener;
  }, []);

  useEffect(() => {
    // 根据src进行更新
    photoContext.update({
      key,
      src,
      originRef,
      render: fn.render,
      overlay,
      width,
      height,
    });
  }, [src]);

  if (children) {
    return Children.only(cloneElement(children, { ...eventListeners, ref: originRef }));
  }
  
  return null
}

export default PhotoView;