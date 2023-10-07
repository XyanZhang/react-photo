import PreventScroll from "../components/PreventScroll";
import SlidePortal from "../components/SlidePortal";
import useAnimationVisible from "../hooks/useAnimationVisible";
import useSetState from "../hooks/useSetState";
import { DataType, PhotoProviderBase } from "../utis/type";
import { defaultOpacity } from "../utis/variables";

type PhotoSliderState = {
  // 偏移量
  x: number;
  // 图片处于触摸的状态
  touched: boolean;
  // 是否暂停 transition
  pause: boolean;
  // Reach 开始时 x 坐标
  lastCX: number | undefined;
  // Reach 开始时 y 坐标
  lastCY: number | undefined;
  // 背景透明度
  bg: number | null | undefined;
  // 上次关闭的背景透明度
  lastBg: number | null | undefined;
  // 是否显示 overlay
  overlay: boolean;
  // 是否为最小状态，可下拉关闭
  minimal: boolean;
  // 缩放
  scale: number;
  // 旋转
  rotate: number;
  // 缩放回调
  onScale?: (scale: number) => void;
  // 旋转回调
  onRotate?: (rotate: number) => void;
};

const initialState: PhotoSliderState = {
  x: 0,
  touched: false,
  pause: false,
  lastCX: undefined,
  lastCY: undefined,
  bg: undefined,
  lastBg: undefined,
  overlay: true,
  minimal: true,
  scale: 1,
  rotate: 0,
};

export interface IPhotoSliderProps extends PhotoProviderBase {
  // 图片列表
  images: DataType[];
  // 图片当前索引
  index?: number;
  // 索引改变回调
  onIndexChange?: (index: number) => void;
  // 可见
  visible: boolean;
  // 关闭回调
  onClose: (evt?: React.MouseEvent | React.TouchEvent) => void;
  // 关闭动画结束后回调
  afterClose?: () => void;
}

export default function PhotoSlider(props: IPhotoSliderProps) {
  const {
    className,
    maskOpacity = defaultOpacity,
    portalContainer,
    visible,
    onClose,
    afterClose,
  } = props;
  const [state, updateState] = useSetState(initialState);
  
  const {
    x,
    touched,
    pause,

    lastCX,
    lastCY,

    bg = maskOpacity,
    lastBg,
    overlay,
    minimal,

    scale,
    rotate,
    onScale,
    onRotate,
  } = state;
  // 显示动画处理
  const [realVisible, activeAnimation, onAnimationEnd] = useAnimationVisible(visible, afterClose);


  const currentOverlayVisible = overlay && !activeAnimation;

  return (
    <SlidePortal
      className={`PhotoView-Portal${!currentOverlayVisible ? ' PhotoView-Slider__clean' : ''}${
        !visible ? ' PhotoView-Slider__willClose' : ''
      }${className ? ` ${className}` : ''}`}
      role="dialog"
      onClick={(e) => e.stopPropagation()}
      container={portalContainer}
    >
      {visible && <PreventScroll />}
    </SlidePortal>
    
  )
}