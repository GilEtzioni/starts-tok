import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const ErrorMessage: React.FC = () => {
    const answer = useSelector((state: RootState) => state.lessons.anwser);
    const order = useSelector((state: RootState) => state.lessons.order);

    const topCss = (order: number): string => {
        return order === 1 || order === 4 ? 'top-10' : 'top-4';
    };

    const rightAnswer = (order: number, answer: string) => {
        if (order === 1 || order === 4) {
            return <span dir="rtl">טעות!</span>;
        } else {
            return (
                <>
                    <span className="rtl">!טעות</span>
                    <br />
                    <span className="rtl">:התשובה הנכונה היא</span>
                    <br />
                    <span className="ltr">{` ${answer}`}</span>
                </>
            );
        }
    };

    return (
        <Card
            bordered={false}
            className={classNames('bg-red-600', 'text-white', 'text-center', 'flex', 'items-center', 'justify-center', 
                'h-24', 'w-72', 'mx-auto', 'rounded-lg', 'relative', 'shadow-md', topCss(order) )}
            >
            {rightAnswer(order, answer)}
        </Card>
    );
};

export default ErrorMessage;
