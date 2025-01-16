import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { setRunning, addOneOrder, resetClicks } from "../slices/LessonsSlice";
import classNames from 'classnames';
import { Card, Button } from 'antd';

const ErrorMessage: React.FC = () => {
    const rightAnswer = useSelector((state: RootState) => state.lessons.anwser);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
    };

    return (
        <div
            className={classNames("flex justify-center items-center", {
                "p-24": order === 1 || order === 4,
                "p-12": order !== 1 && order !== 4,
            })}
        >
            <Card
                bordered={false}
                className="bg-rose-200 text-white text-center flex items-center justify-center w-72 h-28 mx-auto rounded-lg relative shadow-md"
            >
                <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                    <div className="flex items-center">
                        <p className="font-semibold !font-hebrew rtl mr-1 text-green-600">
                            !כל הכבוד
                        </p>
                        <i className="fas fa-times-circle text-green-600"></i>
                    </div>

                    <Card
                    onClick={handleClick}
                    className={classNames(
                        "!inline-flex !items-center !justify-center bg-green-500 text-white border-green-600 border-b-4 border-0 hover:!bg-green-600 hover:!cursor-pointer font-hebrew font-semibold !text-center !m-0 !font-medium !w-64 !h-8",
                        {
                            "top-4": order === 1 || order === 4,
                            "bottom-4": order !== 1 && order !== 4,
                        }
                    )}
                >
                    <span className="hover:text-gray-200 transition-colors duration-200">
                        המשך
                    </span>
                </Card>
                </div>
            </Card>
        </div>
    );
};

export default ErrorMessage;
