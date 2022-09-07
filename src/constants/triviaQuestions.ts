import Question, { QuestionType } from '../models/Question';

const triviaQuestions: Question[] = [
  {
    question: '¿Cuál festival celta dió origen a Halloween?',
    type: QuestionType.MULTIPLE,
    options: ['Hogmanay', 'Beltane', 'Samhain'],
    answer: 2,
    status: 0,
  },
  {
    question:
      '¿En qué estado norteamericano es ilegal disfrazarse de monja o cura?',
    type: QuestionType.OPEN,
    answer: 'Alabama',
    status: 0,
  },
];

export default triviaQuestions;
