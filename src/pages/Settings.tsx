import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { information, moon } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Settings = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModeSetting = localStorage.getItem('darkMode');
    setDarkMode(darkModeSetting === 'true');
  }, []);

  const darkModeChange = (e: any): void => {
    setDarkMode(e.detail.checked);
    localStorage.setItem('darkMode', `${e.detail.checked}`);
    if (e.detail.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='rankings' />
          </IonButtons>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className='ion-padding-top'>
          <IonItem routerLink='about'>
            <IonIcon slot='start' icon={information}></IonIcon>
            <IonText className='ion-padding-left'>Acerca de</IonText>
          </IonItem>
          <IonItem>
            <IonIcon slot='start' icon={moon}></IonIcon>
            <IonText className='ion-padding-left'>Modo oscuro</IonText>
            <IonToggle
              checked={darkMode}
              onIonChange={darkModeChange}
              slot='end'
            ></IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
