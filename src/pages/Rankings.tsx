import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Players from '../components/Players';
import Podium from '../components/Podium';
import * as HapticsService from '../services/HapticsService';

const Rankings: React.FC = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rankings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Podium />
        <Players />
        <IonButton
          expand='block'
          className='bottom-button-fixed'
          id='new-player-btn'
          onClick={HapticsService.hapticsImpactLight}
        >
          Nuevo jugador
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Rankings;
