import React from 'react';
import { Card } from 'antd';
import "./Main.css"

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

const App: React.FC = () => {
    const order = useSelector((state: RootState) => state.lessons.order);

    const topCss = (order: number): number => {
        if (order === 1 || order === 4) return 40;
        return 15;
    };

    return (
        <Card
            bordered={false}
            className="error-m"
            style={{
                top: `${topCss(order)}px`,
            }}
        >
            !טעות
        </Card>
    );
};

export default App;