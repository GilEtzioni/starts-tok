// react  + antd
import React, { useState } from 'react';
import { Row, Card, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setFailure, resetClicks, setRightAnswer } from '../slices/LessonsSlice';
import { RootState } from "../../../app/store";

// components
import { getForeignWords, shuffleArray, getForeignSentence, splitSentenceToWords, getHebrewSentence, findMaxIndex } from '../utils/SecondHelper';
import { useHandleNext} from "../utils/SecondEffects";
import HebrewSentenceTwo from "./HebrewSentenceTwo";
import { CardType, TranslatedArray } from '../types/SecondLessonType';
import { LessonStatus } from '../types/LessonType';

// fetch data
import { useParams } from 'react-router-dom';
import { fetchAllWords, fetchSecondLessonSentence, fetchSecondLessonWords } from '../../../api/lessons';
import { SECOND_LESSON_WORDS_QUERY_KEY, SECOND_LESSON_SENTENCES_QUERY_KEY, ALL_WORDS } from '../requests/queryKeys';
import { useQuery } from '@tanstack/react-query';

const MainSecond: React.FC = () => {

    const { name, lesson } = useParams<{ name: string; lesson: string }>();
    const { Title } = Typography;

    const order = useSelector((state: RootState) => state.lessons.order);
    const clicks = useSelector((state: RootState) => state.lessons.clicks);
    const status = useSelector((state: RootState) => state.lessons.status);
    const dispatch = useDispatch();

    const [foreignArray, setForeignArray] = useState<CardType[]>([]);
    const [hebrewSentence, setHebrewSentence] = useState("");
    const [TranslatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);

    const { data: lessonsData, isLoading: isLessonsLoading, isError: isLessonsError } = useQuery(
        [SECOND_LESSON_SENTENCES_QUERY_KEY, name, lesson],
        () => fetchSecondLessonSentence(name || '', lesson || ''),
        {
            onSuccess: (lessonsData) => {
                const hebrewSentence = getHebrewSentence(lessonsData, order);
                const foreignSentence = getForeignSentence(lessonsData, order);
                setHebrewSentence(hebrewSentence);

                dispatch(setRightAnswer(foreignSentence));
            }
        }
    );

    const { data: allWords, isLoading: isWordsLoading, isError: isWordsError } = useQuery(
        [ALL_WORDS, name, lesson],
        () => fetchAllWords(),
        {
            enabled: !!lessonsData,
            onSuccess: (allWords) => {
                if (!allWords || !lessonsData) return;

                const hebrewSentence = getHebrewSentence(lessonsData, order);

                const punctuation = [',', '.', '-', '?', '...', '!'];
                const wordsArray = splitSentenceToWords(hebrewSentence, allWords);
                if (!wordsArray) return;
            
                const copiedArray = [...wordsArray];
                const firstItem = copiedArray.shift();
                const lastItemIndex = copiedArray.length - 1;
            
                if (firstItem && punctuation.includes(firstItem.hebrewString) && lastItemIndex >= 0) {
                    copiedArray[lastItemIndex].hebrewString =
                        firstItem.hebrewString + copiedArray[lastItemIndex].hebrewString;
                } 
                else if (firstItem) {
                    copiedArray.unshift(firstItem);
                }
            
                setTranslatedWords(copiedArray);
            }
        }
    );

    const { data: cardsData, isLoading: isCardsLoading, isError: isCardsError } = useQuery(
        [SECOND_LESSON_WORDS_QUERY_KEY, name, lesson],
        () => fetchSecondLessonWords(name || '', lesson || ''),
        {
            onSuccess: (cardsData) => {  
                if (!lessonsData || !cardsData || cardsData.length < 23) return;          
    
                const originalForeignArray = getForeignWords(cardsData, order);
                const shuffledForeign = shuffleArray(originalForeignArray);
                setForeignArray(shuffledForeign);
            }
        }
    );

    useHandleNext ({ clicks, dispatch, resetClicks, setSuccess, setFailure, lessonsData, foreignArray, order });

    const handleClick = (card: CardType) => {
        if (status === LessonStatus.Running) {
            // from down container to up container
            if (card.container === "down") {
                const currMax = findMaxIndex(foreignArray, card.id);
                const nextIndex = currMax + 1;

                const updatedArray= foreignArray.map((item) =>
                    item.id === card.id ? { ...item, container: "up",containerOrder: nextIndex } : { ...item }
                );                
                setForeignArray(updatedArray);
            }

            // from up to down container
            else {
                const currMax = findMaxIndex(foreignArray, card.id);
                const nextIndex = currMax + 1;

                const updatedArray= foreignArray.map((item) =>
                    item.id === card.id ? { ...item, container: "down",containerOrder: nextIndex } : { ...item }
                );                
                setForeignArray(updatedArray);
            }
        }
    }

    if (isLessonsLoading || isCardsLoading) {
        return <div>Loading data...</div>;
    }
    
    if (isLessonsError || isCardsError) {
        return <div>Error loading data</div>;
    }
  
    return (
        <>
            <Row className="flex justify-center">
                <Title level={3} className="text-center !font-hebrew">תרגמו את המשפט</Title>
            </Row>

            <HebrewSentenceTwo TranslatedWords={TranslatedWords} />
    
            {/* up container */}
            <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border-none">
                {foreignArray
                    .filter(item => item.container === "up")
                    .sort((a, b) => a.containerOrder - b.containerOrder)
                    .map(item => (
                        <div className="h-[50px]">
                            <Card
                                bodyStyle={{ padding: '12px' }}
                                key={item.containerOrder}
                                onClick={() => handleClick(item)}
                                className='duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1 !font-hebrew'
                            >
                                {item.word}
                            </Card>
                        </div>
                    ))}
            </div> 

    {/* down container */}
    <div className="flex flex-wrap justify-center items-start w-1/2 h-[150px] m-2.5 mx-auto gap-2.5 overflow-auto p-2.5 box-border border border-gray-300 rounded-lg mt-5">
        {foreignArray
            .filter(item => item.container === "down")
            .sort((a, b) => a.containerOrder - b.containerOrder)
            .map(item => (
                <Card
                    bodyStyle={{ padding: '12px' }}
                    key={item.containerOrder}
                    onClick={() => handleClick(item)}
                    className='duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gray-100 hover:cursor-pointer border border-gray-100 border-b-4 border-1 !font-hebrew'
                >
                    {item.word}
                </Card>
            ))}
    </div>
    </>
    );
}    

export default MainSecond;