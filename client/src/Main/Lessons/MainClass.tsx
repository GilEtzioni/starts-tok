import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MainClass: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const levelName = name ?? 'default-level';

  const { lesson } = useParams<{ lesson?: string }>();
  const lessonName = lesson ?? 'default-level';

  const [courses, setCourses] = useState<{ id: number; courseName: string; level_english: string, GermanWord: string, HebrewWord: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/main/course/${levelName}/${lessonName}`);
        const data = await response.json();
        console.log('Fetched data in React:', data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data in React:', error);
      }
    };

    fetchData();
  }, [levelName, lessonName]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <p key={course.id}>
            Germany: {course.GermanWord} || Hebrew: {course.HebrewWord}
          </p>
        ))
      ) : (
        <p> no data yet... </p>
      )}
    </div>
  );
};

export default MainClass;
