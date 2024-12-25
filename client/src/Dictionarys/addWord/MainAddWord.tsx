import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const MainAddWord: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [germanWord, setGemanWord] = useState<string>('');
  const [translatedWord, setTranslatedWord] = useState<string>('');

  const handleGetData = () => {
    console.log('germanWord:', germanWord);
    console.log('translatedWord:', translatedWord);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        הוסף מילה למילון
      </Button>

      {/* overlay and container */}
      {open && (
        <div style={styles.overlay}>
          <div style={styles.container}>
            {/* Close button */}
            <div style={styles.header}>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setOpen(false)}
                style={styles.closeButton}
              />
            </div>

            {/* Inputs */}
            <div style={styles.body}>
              <Input
                placeholder="Input 1"
                value={germanWord}
                onChange={(e) => setGemanWord(e.target.value)}
                style={styles.input}
              />
              <Input
                placeholder="Input 2"
                value={translatedWord}
                onChange={(e) => setTranslatedWord(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Get Data Button */}
            <div style={styles.footer}>
              <Button type="primary" onClick={handleGetData} style={styles.getDataButton}>
                Get the Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Styles for the components
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'hsla(220, 14.3%, 95.9%, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    textAlign: 'right',
    borderBottom: '1px solid #ddd',
  },
  closeButton: {
    fontSize: '16px',
  },
  body: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  footer: {
    padding: '10px',
    borderTop: '1px solid #ddd',
    textAlign: 'center',
  },
  getDataButton: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
};

export default MainAddWord;
