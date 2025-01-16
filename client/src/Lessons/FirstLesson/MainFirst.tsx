// react  + antd
import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../app/store";

// components + functions
import FirstCard from "./FirstCard"
import { useGetData , useHandleClick} from '../utils/FirstEffects';
import { useFetchLessonData } from '../api/fetchingLessons';
import { useParams } from 'react-router-dom';
import { FirstLessonType, IsSelected } from "../types/FirstLessonType";
import { LessonStatus } from '../types/LessonType';

const FirstCardContainer: React.FC = () => {

    const { name, lesson } = useParams<{ name: string; lesson: string }>();
    const { data: lessonsData, isLoading, error } = useFetchLessonData(name || '', lesson || '');

    const status = useSelector((state: RootState) => state.lessons.status);
    const order = useSelector((state: RootState) => state.lessons.order);
    const dispatch = useDispatch();
    
    // handle current clicks
    const [germanId, setGermanID] = useState(0);
    const [hebrewId, setHebrewId] = useState(0);
    const [counter, setCounter] = useState(0);

    // contain all german / hebrew data
    const [germanArray, setGermanArray] = useState<FirstLessonType[]>([]);
    const [hebrewArray, setHebrewArray] = useState<FirstLessonType[]>([]);

    const { Title } = Typography;

    useGetData({lessonsData, order, germanId, hebrewId, germanArray, hebrewArray, counter, setGermanID, setHebrewId,
        setCounter, setGermanArray, setHebrewArray, dispatch,  status });

    useHandleClick({ lessonsData, order,germanId,hebrewId, germanArray, hebrewArray, counter, setGermanID, setHebrewId,
        setCounter, setGermanArray, setHebrewArray, dispatch,  status });

        const handleClick = (id: number, language: string) => {
            // Update german array
            if (status === LessonStatus.Running && language === "german") {
                const updatedGermanArray = germanArray.map((item) => {
                // if it's a new card, select it. if re-clicked, reset it
                if (
                    item.coupleId === id &&
                    item.isSelected !== IsSelected.False &&
                    item.isSelected !== IsSelected.True
                ) {
                    return {
                    ...item,
                    isSelected:
                        item.isSelected === IsSelected.Clicked
                        ? IsSelected.NotSelected
                        : IsSelected.Clicked,
                    };
                }
                // reset the clicked state if re-clicked
                if (item.isSelected === IsSelected.Clicked) {
                    return { ...item, isSelected: IsSelected.NotSelected };
                }
                return item;
                });
            
                setGermanArray(updatedGermanArray);
            
                const selectedCard = updatedGermanArray.find((item) => item.coupleId === id);
                setGermanID(selectedCard?.isSelected === IsSelected.Clicked ? id : 0);
            }

            // update hebrew
            if (status === LessonStatus.Running && language === "hebrew") {
                const updatedHebrewArray = hebrewArray.map((item) => {
                    // if it's a new card select it, if it re-click reset it
                    if (item.coupleId === id && item.isSelected !== IsSelected.False && item.isSelected !== IsSelected.True) {
                        return { ...item, isSelected: item.isSelected === IsSelected.Clicked ? IsSelected.NotSelected : IsSelected.Clicked };
                    }
                    // reset the clicked
                    if (item.isSelected === IsSelected.Clicked) {
                        return { ...item, isSelected: IsSelected.NotSelected };
                    }
                    if (item.isSelected === IsSelected.False || item.isSelected === IsSelected.True ) {
                        return { ...item };
                    }
                    return item;
                }
            );
                setHebrewArray(updatedHebrewArray);
                        const selectedCard = updatedHebrewArray.find((item) => item.coupleId === id);
                setHebrewId(selectedCard?.isSelected === IsSelected.Clicked ? id : 0);
            }
        };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error </div>;

    return (
    <div className="px-[10%]">
        <Row justify="center" className="mb-2.5"> 
            <Title level={3} className="text-center !font-hebrew"> 
            התאימו את הזוגות
            </Title>
        </Row>

        <Row gutter={[4, 4]}>
            {germanArray.map((germanItem, index) => {
                const hebrewItem = hebrewArray[index]; 
                return (
                    <>
                        <Col key={`german-${germanItem.coupleId}`} span={12}>
                            <FirstCard
                                language="german"
                                word={germanItem.word}
                                id={germanItem.coupleId}
                                isSelected={germanItem.isSelected}
                                onClick={handleClick}
                            />
                        </Col>
                        
    
                        {hebrewItem && (
                            <Col key={`hebrew-${hebrewItem.coupleId}`} span={12}>
                                <FirstCard
                                    language="hebrew"
                                    word={hebrewItem.word}
                                    id={hebrewItem.coupleId}
                                    isSelected={hebrewItem.isSelected}
                                    onClick={handleClick}
                                />
                            </Col>
                        )}
                    </>
                );
            })}
        </Row>
    </div>
    );
};

export default FirstCardContainer;
