import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { setRunning, addOneOrder, resetClicks } from "../slices/LessonsSlice";
import { Card } from 'antd';

const FailureMessage: React.FC = () => {
    const rightAnswer = useSelector((state: RootState) => state.lessons.anwser);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
    };

    return (
        <div className="flex justify-center items-center">
            <Card
                bordered={false}
                className="bg-red-100 text-white text-center flex flex-col items-center justify-center w-72 h-28 rounded-lg shadow-md"
            >
                <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                    <div className="flex items-center mb-4">
                        <span className="font-semibold !font-hebrew rtl mr-1 text-red-600">
                            {order === 1 || order === 4 ? "!טעות" : ":טעות! התשובה הנכונה היא"}
                        </span>
                        <i className="fas fa-times-circle text-red-600"></i>
                    </div>

                    {order !== 1 && order !== 4 && (
                        <div className="absolute mt-7 w-full">
                            <p
                                dir="ltr"
                                className="!font-hebrew text-red-600 text-left w-full pl-2"
                            >
                                {rightAnswer}
                            </p>
                        </div>
                    )}

                    <Card
                        onClick={handleClick}
                        bordered={false}
                        className="mt-4 flex items-center justify-center bg-red-500 text-white border-red-600 border-b-4 hover:bg-red-600 cursor-pointer w-64 h-8 mr-2"
                    >
                        <span className="font-semibold !font-hebrew w-full text-center">
                            המשך
                        </span>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default FailureMessage;
