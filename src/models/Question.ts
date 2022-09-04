export enum QuestionType {
  OPEN = 'OPEN',
  MULTIPLE = 'MULTIPLE',
}

export default interface Question {
  question: string;
  type: QuestionType;
  answer: string | number;
  options?: string[];
  status: number;
}
