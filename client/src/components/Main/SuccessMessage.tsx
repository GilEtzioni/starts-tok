import React from 'react';
import { Card } from 'antd';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

const SuccessMessage: React.FC = () => {
    const order = useSelector((state: RootState) => state.lessons.order);

    const topCss = (order: number): number => {
        if (order === 1 || order === 4) return 40;
        return 15;
    };

    return (
        <Card
            bordered={false}
            className="relative mx-auto flex h-24 w-72 flex-col items-center justify-center rounded-lg bg-green-600 text-white shadow-md text-base text-center"
            style={{ top: `${topCss(order)}px`, direction: 'rtl' }}
        >
            <p className="mb-0">כל הכבוד!</p>
            <p className="mt-0">gut gemacht!</p>
        </Card>
    );
};

export default SuccessMessage;
