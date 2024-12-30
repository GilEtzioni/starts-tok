import React, { useState } from 'react';
import { Button, Input, Alert, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { styles } from "./StyleAddWord";
import "./buttns.css";

import { usePatchNewItem } from "../dataDictionary/patchAxios";

const MainAddWord: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [germanWord, setGemanWord] = useState<string>('');
  const [translatedWord, setTranslatedWord] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const patchNewItem = usePatchNewItem();

  const handleGetData = (germanWord: string, translatedWord: string) => {

    console.log("german word: ", germanWord);
    console.log("translatedWord word: ", translatedWord);

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
      <Button className='buttons' type="primary" onClick={() => setOpen(true)}>
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
              <Input
                placeholder="המילה בגרמנית"
                value={germanWord}
                onChange={(e) => setGemanWord(e.target.value)}
                style={{
                  ...styles.input,
                  borderColor: !germanWord && errorMessage ? 'red' : undefined,
                }}
              />
              <Input
                placeholder="תרגום בעברית"
                value={translatedWord}
                onChange={(e) => setTranslatedWord(e.target.value)}
                style={{
                  ...styles.input,
                  borderColor: !translatedWord && errorMessage ? 'red' : undefined,
                }}
              />
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