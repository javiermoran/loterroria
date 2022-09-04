import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import Question, { QuestionType } from '../models/Question';
import TriviaService from '../services/TriviaService';

const Trivia = (): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect((): void => {
    const triviaQuestions = TriviaService.getTriviaQuestions();
    setQuestions(triviaQuestions);
  }, []);

  const renderAnswer = (question: Question) => {
    if (question?.type === QuestionType?.MULTIPLE) {
      return question?.options?.map(
        (option: string, index: number): JSX.Element => (
          <IonItem>
            <IonNote
              slot='start'
              color={index === question?.answer ? 'success' : ''}
            >
              {index + 1}.
            </IonNote>
            <IonLabel color={index === question?.answer ? 'success' : ''}>
              {option}
            </IonLabel>
          </IonItem>
        )
      );
    } else if (question?.type === QuestionType?.OPEN) {
      return (
        <IonItem>
          <IonLabel>{question?.answer}</IonLabel>
        </IonItem>
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='games' />
          </IonButtons>
          <IonTitle>Trivia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {questions.map(
          (question: Question): JSX.Element => (
            <IonList className='ion-padding-top ion-margin-top'>
              <IonItemGroup>
                <IonItemDivider>
                  <IonText color='primary'>{question?.question}</IonText>
                </IonItemDivider>
                {renderAnswer(question)}
              </IonItemGroup>
            </IonList>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default Trivia;
