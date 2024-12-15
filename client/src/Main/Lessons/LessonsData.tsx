export const fetchCourseData = async (levelName: string, lessonName: string) => {
  try {
    // URL construction
    const response = await fetch(`http://localhost:3000/main/course/${levelName}/${lessonName}`);
    const data = await response.json();

    let uniqueId = 1;
    const hebrewArray = data.map((course: any) => {
      const item = [course.HebrewWord, uniqueId.toString(), "notSelected"];
      uniqueId++;
      return item;
    });

    uniqueId = 1;
    const germanArray = data.map((course: any) => {
      const item = [course.GermanWord, uniqueId.toString(), "notSelected"];
      uniqueId++;
      return item;
    });

    return { initialHebrew: hebrewArray, initialGerman: germanArray };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { initialHebrew: [], initialGerman: [] };
  }
};
