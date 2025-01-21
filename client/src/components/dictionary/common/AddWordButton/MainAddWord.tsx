
import React, { useState } from 'react';
import { useAddNewWord } from '../../requests/mutate'; 
import { Card, Input, Alert, Spin , ConfigProvider, Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { styles } from './StyleAddWord'; 
import heIL from "antd/es/locale/he_IL"; // hebrew antd
import classNames from 'classnames';

const MainAddWord: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [foreignWord, setGemanWord] = useState<string>('');
  const [translatedWord, setTranslatedWord] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: addNewWord, isLoading, isError  } = useAddNewWord();

  const handleGetData = (foreignWord: string, translatedWord: string) => {

    if (!foreignWord || !translatedWord) {
      setErrorMessage("עליך למלא את שני השדות");
      return;
    }

    setErrorMessage(null);
    addNewWord({ foreignWord, translatedWord },
      {
        onSuccess: () => {
          setGemanWord('');
          setTranslatedWord('');
          setOpen(false); // close the component
        },
      }
    );
  };

  if (isLoading) return <div>Loading dictionary...</div>;
  if (isError) return <div>Error loading dictionary.</div>;

  return (
    <>
      <Card
       onClick={() => setOpen(true)}
      className="duration-300 ease-in-out hover:-translate-y-0.5 bg-[#60a5fa] text-white border border-blue-500 border-b-4 border-0 h-8 text-center flex justify-center items-center h-12 transition-all duration-200 ease-linear !font-hebrew hover:bg-blue-500 hover:cursor-pointer"
        >
      הוסף מילה למילון <i className="fa-solid fa-plus"></i>
      </Card>

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
                  value={foreignWord}
                  onChange={(e) => setGemanWord(e.target.value)}
                  className={classNames(
                    "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                    {
                      "border-red-500": !foreignWord && errorMessage,
                      "border-gray-300": foreignWord || !errorMessage,
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
                onClick={() => handleGetData(foreignWord, translatedWord)}
                disabled={isLoading}
                style={styles.getDataButton}
              >
                {isLoading? <Spin /> : 'הוסף'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAddWord;