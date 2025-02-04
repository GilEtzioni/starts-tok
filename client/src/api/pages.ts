import axiosInstance from "./common/axiosInstance";
import { CourseType, UserTableType } from "./common/types";
import { weekPointsType } from "./common/types";
import { FinishedType } from "../components/pages/MainPage/common/CoursesCards/types/courseTypes";
import { GameNameEnum } from "../components/pages/MainPage/common/GamesCards/types/mainPageTypes";

export const fetchBestUsers = async (
    token?: string
): Promise<UserTableType[]> => {
    if (!token) {
      console.error("No authentication token found.");
      return [];
    }
  
    const { data } = await axiosInstance.get('/bestUsers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    return data ?? [];
};

export const fetchCoursesCards = async (
    name: string,
    token?: string
): Promise<CourseType[]> => {
    if (!token) {
        throw new Error("No authentication token found.");
      }
    
      const { data } = await axiosInstance.get(`/main/course/${name}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      return data;
};

export const fetchOneDayUser = async (
    token?: string
): Promise<weekPointsType[]> => {
    if (!token) {
        throw new Error("No authentication token found.");
      }
    
      const { data } = await axiosInstance.get("/currentWeekPoints", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      return data;
};


export const fetchLessonPage = async (
    token?: string
): Promise<FinishedType[]> => {
    if (!token) {
        throw new Error("No authentication token found.");
      }
    
      const { data } = await axiosInstance.get('/main/finished', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      return data;
};

export const fetchMaxPoints = async (
    gameName: GameNameEnum,
    token?: string
): Promise<any> => {
    if (!token) {
        throw new Error("No authentication token found.");
      }
    
      const { data } = await axiosInstance.get(`/${gameName}/maxScore`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      return data;
};

export const fetchWordsCounter = async (
    token?: string
): Promise<any> => {
    if (!token) {
        throw new Error("No authentication token found.");
      }
    
      const { data } = await axiosInstance.get('/finishedWords', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      return data;
};

export const createDataBase = async (
  token: string
): Promise<void> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axiosInstance.post('/dictionary/new', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};