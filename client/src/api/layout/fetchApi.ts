import axiosInstance from "../common/axiosInstance";
import { ALL_POINTS, USER_FLAG } from "./apiConstants";

export const fetchUserFlag = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get(USER_FLAG);
  return data;
  };

export const fetchAllPoints = async (): Promise<number[]> => {
  const { data } = await axiosInstance.get(ALL_POINTS);
  return data;
};