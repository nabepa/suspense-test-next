import { Loadable } from '../network/Loadable';

type Props = {
  data: Loadable<string>;
};

export const DataLoader: React.FC<Props> = ({ data }) => {
  const value = data.current;
  return (
    <div>
      <div>Data is {value}</div>
    </div>
  );
};
