export const fetchData = async (id: number) => {
  try {
    // Send PATCH request to update the lesson_completed column
    const response = await fetch(`http://localhost:3000/main/course`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update course: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Course updated successfully:', result);
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};
