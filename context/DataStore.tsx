import React, { createContext, Suspense, useCallback, useState } from 'react';

import { Loadable } from '../network/Loadable';
import { fetchData1 } from '../network/fetch';

type DataStore = {
  storedData: Loadable<string>;
  reloadStoredData: () => void;
};

export const DataStore = createContext<DataStore>({} as DataStore);

export const DataStoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [storedData, setStoredData] = useState(
    new Loadable(() => fetchData1('store'))
  );
  const reloadStoredData = useCallback(() => {
    setStoredData(new Loadable(() => fetchData1('store')));
  }, []);

  return (
    <Suspense fallback={<h1>Loading Data Store</h1>}>
      <DataStore.Provider value={{ storedData, reloadStoredData }}>
        {children}
      </DataStore.Provider>
    </Suspense>
  );
};
