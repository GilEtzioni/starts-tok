import React from 'react';
import { Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { setRunning, addOneOrder, resetClicks } from "../slices/LessonsSlice";


const ErrorMessage: React.FC = () => {
    const answer = useSelector((state: RootState) => state.lessons.anwser);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
    };

    const rightAnswer = (order: number, answer: string) => {
        if (order === 1 || order === 4) {
            return (
                <Card
                    bordered={false}
                    className="top-[110px] bg-rose-200 text-white text-center flex items-center justify-center w-72 h-24 mx-auto rounded-lg relative shadow-md"
                >
                    <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                        <div className="flex items-center">
                            <span className="rtl mr-1 text-red-600">טעות</span>
                            <i className="fas fa-times-circle text-red-600"></i>
                        </div>
                        <Button
                        onClick={handleClick}
                        className="absolute top-12 right-2 !bg-red-600 hover:!bg-red-700 active:!bg-red-800 !border-none !flex !items-center !justify-center !w-64 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
                    >
                        <p className="!text-white !text-center !m-0 !font-medium">המשך</p>
                    </Button>
                    </div>
                </Card>
            );
        } else {
            return (
                <Card
                    bordered={false}
                    className="top-[10px] bg-rose-200 text-white text-center flex items-center justify-center w-72 h-36 mx-auto rounded-lg relative shadow-md"
                >
                    <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                        <div className="flex items-center">
                            <span className="rtl mr-1 text-red-600">!טעות</span>
                            <i className="fas fa-times-circle text-red-600"></i>
                        </div>

                            <Button
                                onClick={handleClick}
                                className="absolute top-24 right-2 !bg-red-600 hover:!bg-red-700 active:!bg-red-800 !border-none !flex !items-center !justify-center !w-64 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
                                >
                                <p className="!text-white !text-center !m-0 !font-medium">המשך</p>
                            </Button>                        

                        <div>
                            <p className="rtl mr-1 text-red-600 mb-0.5">:התשובה הנכונה היא</p>
                            <p className="ltr mr-1 text-red-600 mt-0.5">{` ${answer}`}</p>
                        </div>
                    </div>
                </Card>
            );
        }
    };

    return <>{rightAnswer(order, answer)}</>;
};

export default ErrorMessage;
