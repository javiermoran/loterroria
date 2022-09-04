import { LoteriaItem } from './models/LoteriaItem';
import Question, { QuestionType } from './models/Question';

const colors = [
  '#5caee3',
  '#45ba48',
  '#c53145',
  '#9e6892',
  '#4ddbdb',
  '#f99169',
  '#c3cb71',
  '#d9534f',
  '#e12885',
  '#137a7f',
];

const loteriaImages: LoteriaItem[] = [
  { id: 1, label: 'La maquina del misterio' },
  { id: 2, label: 'La casa embrujada' },
  { id: 3, label: 'La calabaza' },
  { id: 4, label: 'La bruja' },
  { id: 5, label: 'El zombie' },
  { id: 6, label: 'Dracula' },
  { id: 7, label: 'El Fantasma' },
  { id: 8, label: 'El sombrero seleccionador' },
];

const charactersMovies = [
  { id: 1, label: 'Gizmo', points: 3 },
  { id: 2, label: 'Casper', points: 1 },
  { id: 3, label: 'Drácula', points: 1 },
  { id: 4, label: 'Eso', points: 2 },
  { id: 5, label: 'El jinete sin cabeza', points: 1 },
  { id: 6, label: 'El extraño mundo de jack', points: 2 },
];

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

export { colors, loteriaImages, charactersMovies, triviaQuestions };
