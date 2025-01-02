import { useQuery } from "@tanstack/react-query";
import { hangmanScoreType } from "./MainGameTypes";
import axiosInstance from "./dataMainGames/axiosInstance";


export const useHangmanMaxScore = () => {
    return useQuery(
      ['hangmanScore'],
      async () => {
        const { data } = await axiosInstance.get('/hangman/maxScore');
        return data;
      }
    );
  };