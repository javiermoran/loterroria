import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Players from '../components/Players';
import Teams from '../components/Teams';

const PlayersPage = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jugadores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Jugadores</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className='ion-margin-bottom'>
          <IonRow>
            <IonCol>
              <Players />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <hr />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Teams />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PlayersPage;
