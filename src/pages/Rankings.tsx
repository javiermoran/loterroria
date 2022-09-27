import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { pulseOutline } from 'ionicons/icons';
import Podium from '../components/Podium';

const Rankings: React.FC = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rankings</IonTitle>
          <IonRouterLink slot='end' routerLink='live-board'>
            <IonIcon icon={pulseOutline} /> Live&nbsp;
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding-top'>
          <Podium />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Rankings;
