import * as signalR from '@microsoft/signalr';
import * as React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { Result } from '../data/models';
//@ts-ignore
import baseUrl from './websocket';

type RealTimeProviderType = {
  updatedStudyId: string;
  updatedResult: Result;
};

const Context = React.createContext<RealTimeProviderType>(null);

const connection = new signalR.HubConnectionBuilder()
  .withUrl(baseUrl)
  .configureLogging(signalR.LogLevel.None)
  .withAutomaticReconnect()
  .build();

const initialState = {
  stationId: 0,
  created: '',
  sensorId: 0,
  value: 0,
};

export const RealTimeUpdatesProvider = ({ children }) => {
  const [updatedStudyId, setStudyId] = React.useState<string>(null);
  const [updatedResult, setResult] = React.useState<Result>(initialState);

  const handleOnConnection = () => {
    connection.on('Update', (studyId: string, result: Result) => {
      setResult(result);
      setStudyId(studyId);
    });
  };

  const handleStartConnection = () => connection.start();

  React.useEffect(() => {
    handleOnConnection();
    handleStartConnection();
  }, []);

  return <Context.Provider value={{ updatedResult, updatedStudyId }}>{children}</Context.Provider>;
};

export const RealTimeUpdatesConsumer = Context.Consumer;
export const RealTimeUpdatesContext = Context;

type useUpdateResultsType = {
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
  studyId: string;
  stationId?: number;
};

export const useUpdateResults = ({ studyId, stationId, setResults }: useUpdateResultsType) => {
  const { updatedResult, updatedStudyId } = React.useContext(RealTimeUpdatesContext);
  useDeepCompareEffect(() => {
    if (studyId === updatedStudyId && (!stationId || stationId === updatedResult.stationId))
      setResults(items => {
        items.pop();
        return [updatedResult, ...items];
      });
  }, [updatedStudyId, updatedResult]);
};
