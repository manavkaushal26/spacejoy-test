import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

const GroupTransformer = ({ groupNodes, isSelected, loaded }) => {
  const transformerRef = useRef(null);

  useEffect(() => {
    if (transformerRef && transformerRef?.current && isSelected) {
      if (groupNodes) {
        transformerRef?.current?.nodes([groupNodes]);
        transformerRef?.current?.getLayer().batchDraw();
        if (loaded) {
          transformerRef?.current?.forceUpdate();
        }
      }
    } else {
      transformerRef?.current?.nodes([]);
    }
  }, [groupNodes, isSelected, loaded]);

  return (
    <Transformer
      className="transform-boundary"
      ref={transformerRef}
      keepRatio={true}
      rotationSnaps={[0, 45, 90, 135, 180, 225, 270]}
      enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
      anchorFill="#FEE2E2"
      anchorStroke="#EF4444"
      borderStroke="#EF4444"
      anchorSize={8}
      borderDash={[3, 3]}
    />
  );
};

export default GroupTransformer;
