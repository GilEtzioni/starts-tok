export const fetchData = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/main/course`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update course: ${response.statusText}`);
    }

    const result = await response.json();
  } catch (error) {
    console.error('Error in fetchData:', error);
  }
};
