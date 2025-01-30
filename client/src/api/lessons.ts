import axiosInstance from "./common/axiosInstance";
import { FirstLesson } from "../components/lessons/types/FirstLessonType";
import { MissingWordType, SenteceType, WordsType } from "./common/types";

export const fetchFirstLesson = async (
  lesson: string,
  token?: string
): Promise<FirstLesson> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get(`/main/firstLesson/${lesson}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchSecondLesson = async (
  lesson: string,
  token?: string
): Promise<SenteceType> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get(`/main/secondLesson/${lesson}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchThirdLesson = async (
  lesson: string,
  token?: string
): Promise<MissingWordType> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get(`/main/thirdLesson/${lesson}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const fetchAllWords = async (
  token?: string
): Promise<WordsType[]> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const { data } = await axiosInstance.get('/dictionary', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return data;
};

export const patchFinishLesson = async (
  { name, lesson }: { name: string; lesson: string },
  token?: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }
  
  const response = await axiosInstance.patch(`/main/course/${name}/${lesson}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const postNewPoints = async (
  userPoints: { newPoints: number },
  token?: string
) => {
  if (!token) {
    throw new Error("No authentication token found.");
  }
  
  const payload = { newPoints: userPoints.newPoints };
  const response = await axiosInstance.post(`/addPoints`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
