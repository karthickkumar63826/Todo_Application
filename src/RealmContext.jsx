
import React, { createContext, useContext } from 'react';
import {  useRealm as useRealmHook } from '../hooks/useRealm';


const RealmContext = createContext(null);

export const RealmProvider = ({ children }) => {
  const realm = useRealmHook();
  return <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>;
};

export const useRealmContext = () => {
  return useContext(RealmContext);
};
