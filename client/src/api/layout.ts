import axiosInstance from "./common/axiosInstance";
import { CourseLangauge } from "./common/types";
  
export const fetchAllPoints = async (
  token?: string
): Promise<{ points: string; userName: string }> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/allPoints', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchUserFlag = async (
  token?: string
): Promise<CourseLangauge[]> => {
    if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/userLanguage', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};


export const changeLanguage = async (
  newLanguage: CourseLangauge,
  token: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axiosInstance.patch('/changeLanguage', { newLanguage }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};