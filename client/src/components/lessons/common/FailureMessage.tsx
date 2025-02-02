import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { setRunning, addOneOrder, resetClicks, setLessonName, addOneClick } from "../slices/LessonsSlice";
import { Card, Typography } from 'antd';
import { LessonName } from '../types/LessonType';
import { useQueryClient } from '@tanstack/react-query';
import { setClicks } from '../../games/wordle/slices/WordleSlice';

const FailureMessage: React.FC = () => {
    const rightAnswer = useSelector((state: RootState) => state.lessons.anwser);
    const lessonName = useSelector((state: RootState) => state.lessons.lessonName);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const handleClick = async() => {
        dispatch(setClicks(2))
        dispatch(addOneOrder());
        dispatch(setRunning());
        dispatch(setLessonName(LessonName.Loading))
        await queryClient.removeQueries();
    };

    const { Paragraph } = Typography;

    return (
        <div className="flex justify-center items-center">
            <Card
                bordered={false}
                className="bg-red-100 text-white text-center flex flex-col items-center justify-center w-72 h-28 rounded-lg shadow-md"
            >
                <div className="absolute top-2 right-2 flex flex-col items-end text-lg">
                    <div className="flex items-center mb-4">
                        <span className="font-semibold rtl mr-1 text-red-600">
                            {lessonName === LessonName.MatchPairs ? "!טעות" : ":טעות! התשובה הנכונה היא"}
                        </span>
                        <i className="fas fa-times-circle text-red-600"></i>
                    </div>

                    {lessonName !== LessonName.MatchPairs && (
                        <div className="absolute mt-7 w-full">
                        <Paragraph
                            dir="ltr"
                            className="text-red-600 text-left w-full pl-2 text-lg"
                        >
                            {rightAnswer}
                        </Paragraph>
                        </div>
                    )}

                    <Card
                        onClick={handleClick}
                        bordered={false}
                        className="mt-4 flex items-center justify-center bg-red-500 text-white border-red-600 border-b-4 hover:bg-red-600 cursor-pointer w-64 h-8 mr-2"
                    >
                        <span className="font-semibold w-full text-center">
                            המשך
                        </span>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default FailureMessage;