export enum QuestionType {
  OPEN = 'OPEN',
  MULTIPLE = 'MULTIPLE',
}

export default interface Question {
  id: number | string;
  question: string;
  type: QuestionType;
  answer: string | number;
  options?: string[];
  status: number;
}
