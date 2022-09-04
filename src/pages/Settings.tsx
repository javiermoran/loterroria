import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import {
  contrastOutline,
  filmOutline,
  informationCircleOutline,
  timeOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import * as HapticsService from '../services/HapticsService';

const Settings = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);
  const defaultTime = 30;

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
    HapticsService.hapticsImpactLight();
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
        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>JUEGOS</small>
          </IonText>
        </div>
        <IonList>
          <IonItem routerLink='characters'>
            <IonIcon slot='start' icon={filmOutline}></IonIcon>
            <IonText className='ion-padding-left'>
              Personajes / Películas
            </IonText>
          </IonItem>
          <IonItem>
            <IonIcon slot='start' icon={timeOutline}></IonIcon>
            <IonText className='ion-padding-left'>
              Tiempo default mimica
            </IonText>
            <IonNote slot='end'>{defaultTime}</IonNote>
          </IonItem>
        </IonList>

        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>INTERFAZ</small>
          </IonText>
        </div>
        <IonList>
          <IonItem>
            <IonIcon slot='start' icon={contrastOutline}></IonIcon>
            <IonText className='ion-padding-left'>Modo oscuro</IonText>
            <IonToggle
              checked={darkMode}
              color='success'
              onIonChange={darkModeChange}
              slot='end'
            ></IonToggle>
          </IonItem>
        </IonList>

        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>INFORMACIÓN</small>
          </IonText>
        </div>
        <IonList>
          <IonItem routerLink='about'>
            <IonIcon slot='start' icon={informationCircleOutline}></IonIcon>
            <IonText className='ion-padding-left'>Acerca de</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
