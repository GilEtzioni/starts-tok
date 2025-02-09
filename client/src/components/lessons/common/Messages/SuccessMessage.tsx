import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setRunning, addOneOrder, resetClicks, setLessonName, addOneClick, addOnePoint } from "../../slices/LessonsSlice";
import { LessonName } from '../../types/LessonType';
import { setClicks } from '../../../games/wordle/slices/WordleSlice';
import { useQueryClient } from '@tanstack/react-query';

const SuccessMessage: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    
    const handleClick = async() => {
        dispatch(setClicks(2))
        dispatch(addOneOrder());
        dispatch(setRunning());
        dispatch(addOnePoint())
        dispatch(setLessonName(LessonName.Loading))
        await queryClient.removeQueries();
    };

    return (
        <div className="flex justify-center items-center">
            <Card
                bordered={false}
                className={classNames(
                    "bg-green-100 text-white text-center flex flex-col items-center justify-center w-72 h-28 rounded-lg shadow-md"
                )}
            >
                <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                    <div className="flex items-center mb-4">
                        <span className="font-semibold rtl mr-1 text-green-600">
                            !כל הכבוד
                        </span>
                        <i className="fas fa-check-circle text-green-600"></i>
                    </div>
                    <Card
                        onClick={handleClick}
                        bordered={false}
                        className="transition-all duration-300 ease-in-out mt-4 flex items-center justify-center bg-green-500 text-white border-green-600 border-b-4 hover:bg-green-600 cursor-pointer w-64 h-8 mr-2"
                    >
                        <span className="font-semibold w-full text-center">המשך</span>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default SuccessMessage;