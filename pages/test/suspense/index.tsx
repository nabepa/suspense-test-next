import { NextPage } from 'next';
import { Suspense, useContext, useState } from 'react';
import { DataLoader } from '../../../component/DataLoader';
import { DataStore } from '../../../context/DataStore';
import { fetchData1 } from '../../../network/fetch';
import { Loadable } from '../../../network/Loadable';

const Index: NextPage = () => {
  const { storedData, reloadStoredData } = useContext(DataStore);
  const [data1, setData1] = useState(() => new Loadable(() => fetchData1('1')));
  const [data2, setData2] = useState(() => new Loadable(() => fetchData1('2')));
  const [data3, setData3] = useState(() => new Loadable(() => fetchData1('3')));

  return (
    <div>
      <button onClick={reloadStoredData}>reload stored Data</button>
      <h1>Stored Data: {storedData.current}</h1>
      <button
        onClick={() => {
          setData1(() => new Loadable(() => fetchData1('1')));
        }}
      >
        reload1
      </button>
      <button
        onClick={() => {
          setData2(() => new Loadable(() => fetchData1('2')));
        }}
      >
        reload2
      </button>
      <button
        onClick={() => {
          setData3(() => new Loadable(() => fetchData1('3')));
        }}
      >
        reload3
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data3} />
      </Suspense>
    </div>
  );
};

export default Index;
