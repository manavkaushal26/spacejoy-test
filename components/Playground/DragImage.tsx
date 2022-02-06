import React, { useEffect, useReducer, useRef } from 'react';
import { Circle, Sprite, Text, Transformer } from 'react-konva';
import { PlaygroundAssetType } from 'store/PlaygroundAssets';
import useImage from 'use-image';

interface DragImageInterface {
  index: number;
  image: PlaygroundAssetType;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs) => void;
  rotationValue?: number;
  belongsToGroup: boolean;
  onSpriteLoad?: (parentCollageId: string, assetId: string, loaded: boolean) => void;
  parentId?: string;
}

const initialState = {
  src: '',
  x: 0,
  y: 0,
  isDragging: false,
};

const reducer = (state, action) => {
  const {
    payload: { isDragging, x, y },
  } = action;

  switch (action.type) {
    case 'DRAG_START':
      return { ...state, isDragging };
    case 'DRAG_END':
      return { ...state, isDragging, x, y };
    case 'UPDATE_ASSET_IMAGE': {
      const { payload } = action;

      return { ...state, ...payload };
    }
    default:
      throw new Error();
  }
};

const getAnimationObject = (boxSize, boxHeight) => {
  const animationObject = {};
  for (let i = 0; i < 100; i += 8) {
    animationObject[i.toString()] = [Math.ceil(i / 8) * boxSize, 0, boxSize, boxHeight];
  }
  animationObject['96'] = animationObject['0'];

  return animationObject;
};

const DragImage: React.FC<DragImageInterface> = ({
  index,
  image,
  isSelected,
  onSelect,
  onChange,
  rotationValue = '0',
  belongsToGroup,
  onSpriteLoad,
  parentId,
}) => {
  const [state, dispatch] = useReducer(reducer, image || initialState);
  const trRef = useRef(null);
  const AssetRef = useRef(null);

  const [img, status] = useImage(
    `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,f_auto,q_100,w_${
      state?.playgroundWidth
        ? Math.ceil(state?.playgroundWidth * state.count * (state?.currentScale || 1))
        : Math.ceil(state?.width) * state?.count * 175 * (state?.currentScale || 1)
    }/${state?.stitchedAssetImage}`,
    'anonymous'
  );

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASSET_IMAGE', payload: image });
  }, [image?.stitchedAssetImage]);

  useEffect(() => {
    // status === 'loading' ? notify() : dismiss();
    if (status === 'loaded') {
      onSpriteLoad && onSpriteLoad(parentId, image?.id, true);
      trRef?.current?.forceUpdate();
      if (trRef && trRef?.current && isSelected) {
        trRef?.current?.nodes([AssetRef.current]);
        trRef?.current?.getLayer().batchDraw();
      } else {
        trRef?.current?.nodes([]);
      }
    }
  }, [status]);

  const animations = getAnimationObject(img?.width / image.count, img?.height);

  useEffect(() => {
    if (trRef && trRef?.current && isSelected && AssetRef?.current) {
      trRef?.current?.nodes([AssetRef.current]);
      trRef?.current?.getLayer().batchDraw();
    } else {
      trRef?.current?.nodes([]);
    }
  }, [index, isSelected]);

  const onAssetChange = () => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = AssetRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    // we will reset it back

    node.scaleX(scaleX);
    node.scaleY(scaleY);
    onChange({
      ...image,
      x: node.x(),
      y: node.y(),
      playgroundWidth: Math.max(node.width() * scaleX),
      playgroundHeight: Math.max(node.height() * scaleY),
    });
  };

  const height = img?.height || 0;
  const width = img?.width / image.count || 0;
  const draggableProps = {
    draggable: false,
    ...(!belongsToGroup && {
      onClick: onSelect,
      // onTap: onSelect,
      // onDragStart: () => dispatch({ type: 'DRAG_START', payload: { isDragging: true } }),
      // onDragEnd: (e) => {
      //   onAssetChange();
      //   dispatch({ type: 'DRAG_END', payload: { isDragging: false, x: e.target.x(), y: e.target.y() } });
      // },
      // onTransformEnd: onAssetChange,
    }),
  };

  return (
    <>
      {status === 'loading' ? (
        <>
          <Circle x={state?.x - 15} y={state?.y + 5} radius={5} fill="#FCD34D" />
          <Text
            x={state?.x}
            y={state?.y}
            offsetX={width ? width / 2 : 0}
            offsetY={height ? height / 2 : 0}
            text="Loading..."
          />
        </>
      ) : (
        <Sprite
          {...draggableProps}
          ref={AssetRef}
          alt={state?.name}
          name="object"
          image={img}
          id={state?.id}
          x={state?.x}
          y={state?.y}
          offsetX={width ? width / 2 : 0}
          offsetY={height ? height / 2 : 0}
          scaleX={state?.playgroundWidth ? 1 : 0.5}
          scaleY={state?.playgroundHeight ? 1 : 0.5}
          width={width}
          height={height}
          isSelected={isSelected}
          animations={animations}
          animation={rotationValue as string}
        />
      )}

      {isSelected && !belongsToGroup && (
        <Transformer
          className="transform-boundary"
          ref={trRef}
          keepRatio={true}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270]}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          anchorFill="#FEE2E2"
          anchorStroke="#EF4444"
          borderStroke="#EF4444"
          anchorSize={8}
          borderDash={[3, 3]}
          boundBoxFunc={(oldBox, newBox) => ((newBox.width < 10 || newBox.height) < 10 ? oldBox : newBox)}
        />
      )}
    </>
  );
};

export default React.memo(DragImage);
