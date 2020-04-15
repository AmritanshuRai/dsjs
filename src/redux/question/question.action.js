import { fetchData } from '../../utils/fetchData';
import { toggleLoader } from '../universal/universal.action';

export const handleSearchChange = (value) => ({
  type: 'HANDLE_SEARCH_CHANGE',
  payload: value,
});

export const setQuestionData = (data) => ({
  type: 'SET_QUESTION_DATA',
  payload: data,
});

export const setCurrentModule = (data) => ({
  type: 'SET_CURRENT_MODULE',
  payload: data,
});

export const setQuestionDataAsync = () => {
  return async (dispatch, getState) => {
    const collectionName = getState().question.currentModule;
    dispatch(toggleLoader(true));
    try {
      const fetchedData = await fetchData(collectionName);
      dispatch(setQuestionData(fetchedData));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      dispatch(toggleLoader(false));
    }
  };
};
