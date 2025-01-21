import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedWordType } from '../types/DictionaryType';
import { changeWordKnowledge, addNewWord } from '../../../api/dictionary';
import { CHANGE_WORD_KNOWLEDGE, ADD_NEW_WORD } from './queryKeys';

export const useChangeWordKnowledge = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
        (updatedWord: UpdatedWordType) => changeWordKnowledge(updatedWord),
        {
            onSuccess: () => {
            queryClient.invalidateQueries([CHANGE_WORD_KNOWLEDGE]);
        },
      }
    );
  };

export const useAddNewWord = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
    (userWord: { foreignWord: string; translatedWord: string }) => addNewWord(userWord),
    {
        onSuccess: (data) => {
        queryClient.invalidateQueries([ADD_NEW_WORD]);
        },
    });
};