import React from 'react';
import { Card, Button } from 'antd';
import classNames from 'classnames';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";
import { setRunning, addOneOrder, resetClicks } from "../slices/LessonsSlice";

interface SuccessMessageProps {
    onClick?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClick }) => {
    const answer = useSelector((state: RootState) => state.lessons.anwser);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(resetClicks());
        dispatch(addOneOrder());
        dispatch(setRunning());
    };
    
    return (
        <Card
            onClick={handleClick}
            bordered={false}
            className={classNames(
                "bg-green-100 text-white text-center flex items-center justify-center w-72 h-24 mx-auto rounded-lg relative shadow-md",
                {
                  "top-10px": order === 1 || order === 4,
                  "top-70px": !(order === 1 || order === 4),
                }
              )}    
              >
            <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                <div className="flex items-center">
                    <span className="rtl mr-1 text-green-600">תשובה נכונה</span>
                    <i className="fas fa-check-circle text-green-600"></i>
                </div>

                <Button
                    onClick={handleClick}
                    className="absolute top-12 right-2 !bg-green-600 hover:!bg-green-700 active:!bg-green-800 !border-none !flex !items-center !justify-center !w-64 !h-8 !rounded-md !shadow-md !transition-all !duration-200"
                >
                    <p className="!text-white !text-center !m-0 !font-medium">המשך</p>
                </Button> 
                
            </div>
        </Card>
    );
};

export default SuccessMessage;
