import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Players from '../components/Players';
import Podium from '../components/Podium';

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
        <Players />
      </IonContent>
    </IonPage>
  );
};

export default Rankings;
