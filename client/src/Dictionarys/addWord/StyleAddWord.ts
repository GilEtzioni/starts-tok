export const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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