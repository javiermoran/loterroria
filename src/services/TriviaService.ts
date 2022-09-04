import { triviaQuestions } from '../constants';
import Question from '../models/Question';

const getTriviaQuestions = (): Question[] => {
  return triviaQuestions;
};

const TriviaService = { getTriviaQuestions };

export default TriviaService;
