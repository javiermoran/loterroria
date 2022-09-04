import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonList,
  IonToolbar,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import {
  balloonOutline,
  libraryOutline,
  skullOutline,
  videocamOutline,
} from 'ionicons/icons';

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
        <IonList className='ion-margin-top'>
          <IonItem button routerLink='loterroria'>
            <IonIcon slot='start' icon={skullOutline} />
            <IonLabel>Lo-terror-ia</IonLabel>
          </IonItem>
          <IonItem button routerLink='trivia'>
            <IonIcon slot='start' icon={balloonOutline} />
            <IonLabel>Trivia</IonLabel>
          </IonItem>
          <IonItem button routerLink='trivia'>
            <IonIcon slot='start' icon={libraryOutline} />
            <IonLabel>Historias de terror</IonLabel>
          </IonItem>
          <IonItem button routerLink='mimic'>
            <IonIcon slot='start' icon={videocamOutline} />
            <IonLabel>Mimica</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Games;
