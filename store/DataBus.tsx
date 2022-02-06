import React, { useState } from 'react';
import { PlaygroundAssetType } from '../store/PlaygroundAssets';

export interface ProcessedCollageType {
  x: number;
  y: number;
  height: number;
  width: number;
  rotationValue: string;
  id: string;
  stitchedAssetImage: string;
  count: number;
  assetId: string;
}

export interface DatabusCollageType {
  type: 'collage';
  id: string;
  data: ProcessedCollageType[];
}
export interface DatabusAssetType {
  type: 'asset';
  id: string;
  data: PlaygroundAssetType;
}
export type BusDataType = DatabusCollageType | DatabusAssetType;
interface DataBusContext {
  busData: BusDataType;
  setBusData: React.Dispatch<React.SetStateAction<BusDataType>>;
}

const DataBusContext = React.createContext<DataBusContext>({
  busData: null,
  setBusData: () => {
    return;
  },
});

const DataBusContextProvider: React.FC = ({ children }) => {
  const [busData, setBusData] = useState<BusDataType>(null);

  return <DataBusContext.Provider value={{ busData, setBusData }}>{children}</DataBusContext.Provider>;
};

export { DataBusContext, DataBusContextProvider };
