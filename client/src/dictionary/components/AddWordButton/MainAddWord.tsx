
import React, { useState } from 'react';
import { useAddNewWord } from '../../api/fetchingDictionary';
import { Button, Input, Alert, Spin , ConfigProvider} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { styles } from './StyleAddWord'; 
import heIL from "antd/es/locale/he_IL"; // hebrew antd
import classNames from 'classnames';

const MainAddWord: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [germanWord, setGemanWord] = useState<string>('');
  const [translatedWord, setTranslatedWord] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const patchNewItem = useAddNewWord();

  const handleGetData = (germanWord: string, translatedWord: string) => {

    if (!germanWord || !translatedWord) {
      setErrorMessage("עליך למלא את שני השדות");
      return;
    }

    setErrorMessage(null);
    patchNewItem.mutate(
      { germanWord, translatedWord },
      {
        onSuccess: () => {
          setGemanWord('');
          setTranslatedWord('');
          setOpen(false); // close the component
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  return (
    <>
      <Button className="styles-[hsl(213.1,93.9%,67.8%)] text-white border-none px-4 py-2 text-base 
      font-bold rounded-full transition-all duration-300 ease-in-out hover:bg-[hsl(201.3,96.3%,32.2%)] hover:-translate-y-0.5" 
      type="primary" onClick={() => setOpen(true)}>
        הוסף מילה למילון
      </Button>

      {open && (
        <div style={styles.overlay}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Button type="text" icon={<CloseOutlined />} onClick={() => setOpen(false)} style={styles.closeButton} />
            </div>

            <div style={styles.body}>
              {errorMessage && <Alert message={errorMessage} type="error" />}
              <ConfigProvider direction="rtl" locale={heIL}>

            <div style={styles.body}>
              {errorMessage && <Alert message={errorMessage} type="error" />}
                <Input
                  placeholder="המילה בגרמנית"
                  value={germanWord}
                  onChange={(e) => setGemanWord(e.target.value)}
                  className={classNames(
                    "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    {
                      "border-red-500": !germanWord && errorMessage,
                      "border-gray-300": germanWord || !errorMessage,
                    }
                  )}
                />
                <Input
                  placeholder="תרגום בעברית"
                  value={translatedWord}
                  onChange={(e) => setTranslatedWord(e.target.value)}
                  className={classNames(
                    "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    {
                      "border-red-500": !translatedWord && errorMessage,
                      "border-gray-300": translatedWord || !errorMessage,
                    }
                  )}
                />
              </div>
              </ConfigProvider>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                onClick={() => handleGetData(germanWord, translatedWord)}
                disabled={patchNewItem.isLoading}
                style={styles.getDataButton}
              >
                {patchNewItem.isLoading ? <Spin /> : 'הוסף'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAddWord;