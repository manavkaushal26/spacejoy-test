import { XIcon } from '@heroicons/react/outline';
import { NavSelectContext } from '@store/NavSelect';
import { off, on } from '@utils/events';
import fetcher from '@utils/fetcher';
import { downloadURI } from '@utils/helpers';
import { KonvaEventObject } from 'konva/lib/Node';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { Stage as StageType } from 'konva/lib/Stage';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Group, Image as Img, Layer, Line, Rect, Stage } from 'react-konva';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataBusContext } from 'store';
import { useCollageListContext } from 'store/CollageList';
import { PlaygroundAssetsContext, PlaygroundAssetType } from 'store/PlaygroundAssets';
import { SelectedIdContext } from 'store/SelectedId';
import { ViewingModeContext } from 'store/ViewingModeContext';
import useImage from 'use-image';
import BgSelector from './BgSelector';
import DownloadModal from './DownloadModal';
import DragImage from './DragImage';
import GroupTransformer from './GroupTransformer';
import RecommendationsPanel from './Recommendations';

const sceneWidth = 1400;
interface PlaygroundInterface {
  w: number;
  h: number;
  collageData?: PlaygroundAssetType;
}

enum SAVE_TYPE {
  USER = 'user',
  DESIGNER = 'designer',
}

const Playground: React.FC<PlaygroundInterface> = ({ h, w, collageData }) => {
  const stageRef = useRef<StageType>();
  const GUIDELINE_OFFSET = 5;
  const [guides, setGuides] = useState([]);
  const { busData } = useContext(DataBusContext);
  const [currentMode] = useContext(ViewingModeContext);
  const router = useRouter();
  const { setCurrentCollageCategory } = useCollageListContext();

  const {
    PlaygroundAssets,
    setPlaygroundAssets,
    bg,
    getRotationValue,
    isCollageActive,
    selectedSubCategoryId,
    playgroundTotal,
    setActiveCollages,
    activeCollages,
    clearBoard,
    currentVerticalForRecommendations,
    updateCurrentVerticalForRecommendation,
  } = useContext(PlaygroundAssetsContext);
  const [nav, setNav] = useContext(NavSelectContext);

  React.useEffect(() => {
    const { query: { productId = '' } = {} } = router;

    if (productId && productId?.length) {
      (async () => {
        const { data: productSpriteData } = await fetcher({
          endPoint: `/v1/assets/${productId}/stitchImages`,
          method: 'GET',
        });
        if (productSpriteData) {
          const { count = 0, boxSize = 0, image = {} } = productSpriteData || {};

          const res = await fetcher({
            endPoint: '/v1/assets/getAssetsDetail',
            body: {
              assets: [productId],
              fields: ['price', 'name', 'renderImages', 'retailer', 'dimension', 'meta', 'image'],
            },
            method: 'POST',
          });
          const { data, statusCode } = res;
          const isError = statusCode < 300 ? false : true;
          const playgroundProductId = `in-playground-asset-${PlaygroundAssets.length}-${Math.random()}`;
          const assetData = {
            id: playgroundProductId,
            price: !isError ? data[productId as string]?.price : 0,
            displayPrice: !isError ? data[productId as string]?.price.toFixed(2)?.toString() : 0,
            retailer: !isError ? data[productId as string]?.retailer?.name : '',
            renderImages: !isError ? data[productId as string]?.renderImages : [{ cdn: '' }],
            name: !isError ? data[productId as string]?.name : '',
            depth: !isError ? data[productId as string]?.dimension?.depth : 0,
            vertical: !isError ? data[productId as string]?.meta?.vertical?.name : 0,
            assetId: productId as string,
            height: !isError ? data[productId as string]?.dimension?.height : 0,
            width: !isError ? data[productId as string]?.dimension?.width : 0,
            count,
            boxSize,
            stitchedAssetImage: image?.originalCdn,
            x: stageRef?.current?.width() / 2,
            y: stageRef?.current?.height() / 2,
            type: 'asset',
          };
          setPlaygroundAssets([...PlaygroundAssets, assetData]);
          setSelectedId(playgroundProductId);
        }
      })();
    }
  }, [router]);

  const [selectedId, setSelectedId, { swapState, setSwapState }] = useContext(SelectedIdContext);
  const {
    bgImgUrl: { value: bgValue, type: bgType },
  } = bg;
  const { setBgImgUrl } = bg;
  React.useEffect(() => {
    if (collageData) {
      const { categoryId = '', background } = collageData;
      setCurrentCollageCategory(categoryId);
      setActiveCollages([...activeCollages, collageData?.id]);
      if (background) setBgImgUrl(background, 'bg-img');

      if (currentMode === 'view') {
        setPlaygroundAssets([...collageData?.data]);
        const random = Math.floor(Math.random() * (collageData?.data?.length - 0 + 1) + 0);
        setSelectedId(collageData?.data[random]?.id);
      } else {
        setPlaygroundAssets([...collageData?.data] || []);
      }
    } else {
      setPlaygroundAssets([...PlaygroundAssets]);
    }
  }, [collageData]);

  const itemsRef = useRef([]);

  const [img] = useImage(bgValue, 'anonymous');
  const scale = w / sceneWidth;
  const { setData, data } = useCollageListContext();

  const sendDownloadNotification = async (value: { name: string; email: string; collageName: string }, collageId) => {
    if (collageId) {
      await fetcher({
        endPoint: `/v1/collages/${collageId}/sendNotification`,
        method: 'POST',
        body: {
          ...value,
        },
      });
    }
  };

  const download = (): void => {
    // PushEvent({
    //   category: `Download Design Set`,
    //   action: `Download Design Set ${data[data.length - 1]?._id ? `| ${data[data.length - 1]?._id}` : ``}`,
    //   label: 'Download Design Set',
    // });
    // toast.promise(
    // sendDownloadNotification(value).then(() => {
    if (stageRef?.current?.find('Transformer')?.length) {
      stageRef?.current?.findOne('Transformer').hide();
    }
    const uri = stageRef?.current?.toDataURL({
      pixelRatio: 2, // or other value you need
    });
    downloadURI(uri, `My-Design-${Date.now()}`);
    if (stageRef?.current?.find('Transformer')?.length) {
      stageRef?.current?.findOne('Transformer').show();
    }
    // }),
    // { pending: 'Preparing to download', success: 'Download started', error: 'Failed to initiate download' }
    // );
  };

  React.useEffect(() => {
    on('fetchRecommendations', () => {
      updateCurrentVerticalForRecommendation(selectedId);
    });

    return () => {
      off('publish', () => {
        updateCurrentVerticalForRecommendation(selectedId);
      });
    };
  }, [updateCurrentVerticalForRecommendation, selectedId]);

  const checkDeselect = (e): void => {
    if (e.target === e.target?.getStage()) {
      setSelectedId('');
      const unselectedPlaygroundAssets = PlaygroundAssets.map((plgItem) => {
        if (plgItem?.selected) {
          return { ...plgItem, selected: false };
        }

        return { ...plgItem };
      });
      setPlaygroundAssets(unselectedPlaygroundAssets);
    }
  };

  // where can we snap our objects?
  const getLineGuideStops = (skipShape: Shape<ShapeConfig> | StageType) => {
    // we can snap to stage borders and the center of the stage
    const vertical: number[] = [0, stageRef?.current.width() / 2, stageRef?.current.width()];
    const horizontal: number[] = [0, stageRef?.current.height() / 2, stageRef?.current.height()];

    // and we snap over edges and center of each object on the canvas
    stageRef?.current.find('.object').forEach((guideItem) => {
      if (guideItem === skipShape) return;
      const box = guideItem.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push(box?.x, box?.x + box?.width, box?.x + box?.width / 2);
      horizontal.push(box?.y, box?.y + box?.height, box?.y + box?.height / 2);
    });

    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  };

  // what points of the object will trigger to snapping?
  // it can be just center of the object
  // but we will enable all edges and center
  const getObjectSnappingEdges = (node) => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: 'end',
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: 'end',
        },
      ],
    };
  };

  // find all snapping possibilities
  const getGuides = (lineGuideStops, itemBounds) => {
    const resultV = [];
    const resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    const guides = [];

    // find closest snap
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      });
    }

    return guides;
  };

  const drawGuides = (guides) => {
    if (guides) {
      guides.forEach((lg) => {
        if (lg.orientation === 'H') {
          const guide = {
            points: [-6000, 0, 6000, 0],
            stroke: '#4B5563',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [3, 3],
            x: 0,
            y: lg.lineGuide,
          };
          setGuides([...guides, guide]);
        } else if (lg.orientation === 'V') {
          const guide = {
            points: [0, -6000, 0, 6000],
            stroke: '#4B5563',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [3, 3],
            x: lg.lineGuide,
            y: 0,
          };
          setGuides([...guides, guide]);
        }
      });
    }
  };

  const onDragMove = (e: KonvaEventObject<DragEvent>) => {
    // clear all previous lines on the screen
    // layer.find('.guid-line').destroy();

    // find possible snapping lines
    const lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    const itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    const guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
      return;
    }

    drawGuides(guides);

    const absPos = e.target.absolutePosition();
    // now force object position
    guides.forEach((lg) => {
      switch (lg.snap) {
        case 'start': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
            default:
              break;
          }
          break;
        }
        case 'center': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
            default:
              break;
          }
          break;
        }
        case 'end': {
          switch (lg.orientation) {
            case 'V': {
              absPos.x = lg.lineGuide + lg.offset;
              break;
            }
            case 'H': {
              absPos.y = lg.lineGuide + lg.offset;
              break;
            }
            default:
              break;
          }
          break;
        }
        default:
          break;
      }
    });
    e.target.absolutePosition(absPos);
  };

  const onDragEnd = () => {
    setGuides([]);
  };

  const onDropEvent = async (e) => {
    e.preventDefault();
    stageRef?.current?.setPointersPositions(e);

    if (busData.type === 'asset') {
      const {
        data: { id, dimension, renderImages, displayPrice, retailer, name, price, vertical = '' },
      } = busData;
      const activeDesignSets = activeCollages?.length ? activeCollages?.join(',') : 'null';
      // PushEvent({
      //   category: 'Main Menu - Product View',
      //   action: `Add New Product | ${activeDesignSets} | ${id}`,
      //   label: 'Load New Product',
      // });

      const { data } = await fetcher({ endPoint: `/v1/assets/${id}/stitchImages`, method: 'GET' });
      const { count, boxSize, image } = data;
      setPlaygroundAssets(
        PlaygroundAssets?.concat([
          {
            ...stageRef?.current?.getPointerPosition(),
            id:
              PlaygroundAssets.filter((item) => item.id === `in-playground-asset-${PlaygroundAssets.length}`).length ===
              0
                ? `in-playground-asset-${PlaygroundAssets.length}`
                : `in-playground-asset-${PlaygroundAssets.length}-${Math.random()}`,
            count,
            boxSize,
            height: dimension?.height,
            width: dimension?.width,
            depth: dimension?.depth,
            assetId: id,
            renderImages,
            stitchedAssetImage: image?.originalCdn,
            displayPrice,
            price,
            type: 'asset',
            retailer,
            name,
            vertical,
          },
        ])
      );
    }
    if (busData.type === 'collage') {
      const { id } = busData;
      setActiveCollages([...activeCollages, id]);
      const productIds = busData?.data?.map((item) => item?.assetId);
      // PushEvent({
      //   category: 'Main Menu - Design Set View',
      //   action: `Load New Design Set | ${id}}`,
      //   label: 'Load New Design Set',
      // });
      // // fetch product prices
      const res = await fetcher({
        endPoint: '/v1/assets/getAssetsDetail',
        body: { assets: [...productIds], fields: ['price', 'name', 'renderImages', 'retailer', 'dimension', 'meta'] },
        method: 'POST',
      });
      const { data, statusCode } = res;
      const isError = statusCode < 300 ? false : true;
      const collageData = {
        ...busData,
        data: busData?.data?.map((item) => {
          return {
            ...item,
            id: `in-playground-asset-${PlaygroundAssets.length}-${Math.random()}`,
            price: !isError ? data[item?.assetId]?.price : 0,
            displayPrice: !isError ? data[item?.assetId]?.price : 0,
            retailer: !isError ? data[item?.assetId]?.retailer?.name : '',
            renderImages: !isError ? data[item?.assetId]?.renderImages : [{ cdn: '' }],
            name: !isError ? data[item?.assetId]?.name : '',
            depth: !isError ? data[item?.assetId]?.dimension?.depth : 0,
            vertical: !isError ? data[item?.assetId]?.meta?.vertical?.name : 0,
          };
        }),
      };
      const newPlaygroundData =
        currentMode === 'view' ? [...PlaygroundAssets, ...collageData?.data] : [...PlaygroundAssets, collageData];
      setPlaygroundAssets(newPlaygroundData);
    }
  };

  // save collage
  const stageParentRef = useRef(null);
  const onCollageDragEnd = (collageId, currentGroup) => {
    const scalingFactor = stageParentRef?.current?.offsetWidth / 1400;
    const upatedAssetArray = [...PlaygroundAssets].map((item) => {
      if (item?.id === collageId) {
        return {
          ...item,
          data: item?.data?.map((asset, index) => {
            return {
              ...asset,
              x: currentGroup?.children[index].getAbsolutePosition().x / scalingFactor,
              y: currentGroup?.children[index].getAbsolutePosition().y / scalingFactor,
            };
          }),
        };
      }

      return { ...item };
    });
    setPlaygroundAssets(upatedAssetArray);
  };

  const initiateDownload = async (value: { name: string; email: string; collageName: string }) => {
    const collageInfo = {
      collageName: value.collageName,
      collageDescription: '',
      selectedTags: [],
      selectedThemes: [],
    };
    toast.promise(
      sendDownloadNotification(value, collageData?._id).then(() => {
        download();
      }),
      {
        error: 'Failed to download image',
        success: 'Downloaded image successfully',
        pending: 'Preparing to download',
      }
    );
  };

  // Group selection
  const [currentlySelectedGroup, setCurrentlySelectedGroup] = useState(null);
  // collage group scale WIP
  const updateGroupSelection = (collageId) => {
    if (collageId) {
      const updatedSelections = PlaygroundAssets.map((object) => {
        if (object?.id === collageId) {
          return { ...object, selected: true };
        }

        return { ...object };
      });
      setPlaygroundAssets(updatedSelections);
    } else {
      const resetSelections = PlaygroundAssets.map((object) => {
        return { ...object, selected: false };
      });
      setPlaygroundAssets(resetSelections);
    }
  };
  const onGroupTap = (collageId, currentlySelectedGroup) => {
    updateGroupSelection(collageId);
    setCurrentlySelectedGroup(currentlySelectedGroup);
  };
  const onGroupTransformEnd = (collageId, groupRef) => {
    const scalingFactor = stageParentRef?.current?.offsetWidth / 1400;
    const upatedAssetArray = [...PlaygroundAssets].map((item) => {
      if (item?.id === collageId) {
        return {
          ...item,
          data: item?.data?.map((asset, index) => {
            if (asset?.playgroundWidth) {
              return {
                ...asset,
                x: groupRef?.children[index].getAbsolutePosition().x / scalingFactor,
                y: groupRef?.children[index].getAbsolutePosition().y / scalingFactor,
                currentScale: groupRef?.getAbsoluteScale()?.x / scalingFactor,
              };
            } else {
              return {
                ...asset,
                x: groupRef?.children[index].getAbsolutePosition().x / scalingFactor,
                y: groupRef?.children[index].getAbsolutePosition().y / scalingFactor,
                currentScale: groupRef?.getAbsoluteScale()?.x / scalingFactor,
              };
            }
          }),
        };
      }

      return { ...item };
    });
    setPlaygroundAssets(upatedAssetArray);
  };
  const updateAssetLoad = (collageId, assetId, loadStatus) => {
    const updated = PlaygroundAssets.map((item) => {
      if (item?.id === collageId) {
        return {
          ...item,
          data: item?.data?.map((asset) => {
            if (asset?.id === assetId) {
              return { ...asset, loaded: loadStatus };
            }

            return { ...asset };
          }),
        };
      }

      return { ...item };
    });
    setPlaygroundAssets(updated);
  };
  const latestCollage = React.useMemo(() => {
    const collages = PlaygroundAssets?.filter((item) => item?.type === 'collage');

    return collages?.length ? collages[collages?.length - 1]?.id : '';
  }, [PlaygroundAssets?.length]);

  React.useEffect(() => {
    const latest = PlaygroundAssets?.filter((item) => item?.id === latestCollage);

    if (latest?.length && !latest[0].loaded) {
      const numOfAssets = latest[latest?.length - 1]?.data?.length;
      const loadedAssets = latest[latest?.length - 1]?.data?.filter((item) => item?.loaded)?.length;
      if (numOfAssets === loadedAssets) {
        const updated = PlaygroundAssets?.map((plgAsset) => {
          if (plgAsset?.id === latestCollage) {
            return {
              ...plgAsset,
              loaded: true,
              selected: true,
            };
          }

          return { ...plgAsset };
        });
        const index = PlaygroundAssets?.findIndex((x) => x.id === latest[0]?.id);
        setPlaygroundAssets(updated);
        setCurrentlySelectedGroup(itemsRef?.current[index]);
      }
    }
  }, [PlaygroundAssets]);

  // Group Selection

  useEffect(() => {
    if (swapState && !selectedId) {
      setSwapState(false);
    }
  }, [selectedId]);

  return (
    <>
      <ToastContainer
        theme="dark"
        hideProgressBar
        toastClassName={() => 'bg-gray-900 shadow rounded shadow p-4 flex flex-1 justify-between'}
        bodyClassName={() => 'text-white antialiased text-sm flex flex-1 space-x-1'}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="relative overflow-hidden"
        onDrop={onDropEvent}
        onDragOver={(e) => e.preventDefault()}
        ref={stageParentRef}
      >
        {PlaygroundAssets?.length !== 0 && (
          <div className="absolute left-4 top-4 z-10 flex flex-col space-y-2" id="canvas-download">
            <DownloadModal onOk={initiateDownload} />
            {/* {currentMode && currentMode === 'edit' && (
              <UnitAction position="left" title="Save Collage" onClick={() => saveCollageWithNotification({})}>
                <SaveIcon className="w-4 h-4" />
              </UnitAction>
            )} */}
          </div>
        )}
        {nav === 'recommendations' && swapState && (
          <div className="absolute inset-0">
            <button className="absolute  w-full bg-black/30 z-20 h-full cursor-auto" onClick={() => setNav()} />
            <div
              className={`absolute right-0 top-0 h-full z-20 bg-white w-1/3 shadow-inner transition-all  ${
                selectedId ? '' : 'translate-x-full'
              }`}
            >
              <button className="absolute right-2 top-2 cursor-pointer z-20 p-2" onClick={() => setSwapState(false)}>
                <XIcon className="w-6 h-6" />
              </button>
              <RecommendationsPanel />
            </div>
          </div>
        )}
        {nav === 'roomSelection' && (
          <div className="absolute inset-0">
            <button className="absolute w-full h-full bg-black/30  z-20 cursor-auto" onClick={() => setNav()} />
            <div className="overflow-scroll absolute z-20 right-0 top-0 bottom-0 w-1/3 h-full cursor-auto bg-white  shadow-md">
              <BgSelector />
            </div>
          </div>
        )}
        {/* {nav === 'designSetSelection' && (
          <div className="absolute inset-0">
            <button className="absolute w-full h-full bg-black/30  z-20 cursor-auto" onClick={() => setNav()}>
              <div className="overflow-scroll absolute z-20 right-0 top-0 bottom-0 w-1/3 h-full cursor-auto bg-white  shadow-md">
                <RecommendationsPanel />
              </div>
            </button>
          </div>
        )} */}
        <Stage
          ref={stageRef}
          width={w}
          height={h}
          scale={{ x: scale, y: scale }}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer onDragMove={(e) => onDragMove(e)} onDragEnd={onDragEnd}>
            {bgType === 'bg-color' && (
              <Rect
                x={0}
                y={0}
                width={sceneWidth}
                height={h / scale}
                fill={bgValue}
                listening={false}
                name="background-color-wall"
              />
            )}
            {bgType === 'bg-img' && (
              <Img x={0} y={0} width={sceneWidth} image={img} listening={false} name="background-image" />
            )}
            {guides.map((item, i) => {
              return <Line key={i} {...item} />;
            })}

            {PlaygroundAssets?.map((playgroundItem, index) => {
              return playgroundItem?.type === 'collage' ? (
                <>
                  <Group
                    // draggable
                    onDragEnd={() => onCollageDragEnd(playgroundItem?.id, itemsRef?.current[index])}
                    ref={(el) => (itemsRef.current[index] = el)}
                    onTap={() => onGroupTap(playgroundItem?.id, itemsRef?.current[index])}
                    onClick={() => onGroupTap(playgroundItem?.id, itemsRef?.current[index])}
                    onTransformEnd={() => onGroupTransformEnd(playgroundItem?.id, itemsRef?.current[index])}
                  >
                    {playgroundItem?.data?.map((item, i) => {
                      return (
                        <DragImage
                          index={i}
                          key={item.id}
                          image={item}
                          rotationValue={getRotationValue(item?.id)}
                          isSelected={item.id === selectedId}
                          onSelect={() => setSelectedId(item.id)}
                          belongsToGroup
                          onChange={(newAttrs): void => {
                            const tmp = [...PlaygroundAssets];
                            tmp[i] = newAttrs;
                            setPlaygroundAssets(tmp);
                          }}
                          onSpriteLoad={updateAssetLoad}
                          parentId={playgroundItem?.id}
                        />
                      );
                    })}
                  </Group>
                  {playgroundItem?.selected && (
                    <GroupTransformer
                      groupNodes={currentlySelectedGroup}
                      isSelected={playgroundItem?.selected}
                      loaded={playgroundItem?.loaded}
                    />
                  )}
                </>
              ) : (
                <DragImage
                  index={index}
                  belongsToGroup={false}
                  key={playgroundItem?.id}
                  image={playgroundItem}
                  rotationValue={getRotationValue(playgroundItem?.id)}
                  isSelected={playgroundItem.id === selectedId}
                  onSelect={() => setSelectedId(playgroundItem.id)}
                  onChange={(newAttrs): void => {
                    const tmp = [...PlaygroundAssets];
                    tmp[index] = newAttrs;
                    setPlaygroundAssets(tmp);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Playground;
