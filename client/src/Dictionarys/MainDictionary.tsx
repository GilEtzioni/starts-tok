// axios & react-query
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataDictionary/axiosInstance';
import { WordsType } from './types/wordType';

// components
import TopIcons from './dicComponents/TopComponents/TopIcons';
import ButtonsContainer from './dicComponents/TopComponents/ButtonsContainer';
import TableDictionary from './dicComponents/midComponents/TableDictionary';

const MainDictionary: React.FC = () => {

  const fetchItems = async (): Promise<WordsType[]> => {
    const { data } = await axiosInstance.get('/dictionary');
    return data;
  };

  const { data: words } = useQuery(['dictionary'], fetchItems);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            height: '120px',
            width: '800px',
            padding: '16px',
            border: '1px solid hsl(240, 5%, 64.9%)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <TopIcons />
          </div>
          <ButtonsContainer />
        </div>
      </div>

      <TableDictionary words={words || []} />
    </>
  );
};

export default MainDictionary;
