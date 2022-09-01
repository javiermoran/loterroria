import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonList,
  IonToolbar,
  IonItem,
  IonLabel,
} from '@ionic/react';

const Games: React.FC = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-padding-bottom'>Juegos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Juegos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className='ion-padding-top'>
          <IonItem button routerLink='loterroria'>
            <IonLabel>Lo-terror-ia</IonLabel>
          </IonItem>
          <IonItem button routerLink='trivia'>
            <IonLabel>Trivia</IonLabel>
          </IonItem>
          <IonItem button routerLink='mimic'>
            <IonLabel>Mimica</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Games;
