import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
    <Card
        bordered={false}
        style={{
            backgroundColor: 'hsl(0, 72.2%, 50.6%)',
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            width: '300px',
            margin: '0 auto',
            borderRadius: '8px',
            top: '30px',
        }}
    >
        !טעות
    </Card>
);

export default App;
