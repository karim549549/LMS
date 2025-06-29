// Fake search API for now. Replace with real API call later.
export const searchApi = async (query: string): Promise<string[]> => {
  const fakeData = [
    "Course 101",
    "Course 202",
    "Course 303",
    "Course 404",
    "Assignment 1",
    "Assignment 2",
  ];
  return fakeData.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
}; 