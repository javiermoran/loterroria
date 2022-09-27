import {
  IonAlert,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import {
  contrastOutline,
  filmOutline,
  happyOutline,
  informationCircleOutline,
  refreshOutline,
  timeOutline,
  trashBinOutline,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import AppIdSettingsItem from '../components/AppIdSettingsItem';
import SyncSettingsItem from '../components/SyncSettingsItem';
import AudioService from '../services/AudioService';
import AudiService, { AudioIds } from '../services/AudioService';
import * as HapticsService from '../services/HapticsService';

const Settings = (): JSX.Element => {
  const [presentTime] = useIonActionSheet();
  const [darkMode, setDarkMode] = useState(false);
  const [defaultTime, setDefaultTime] = useState(30);
  const [showAlert, setShowAlert] = useState(false);

  useEffect((): void => {
    const darkModeSetting = localStorage.getItem('darkMode');
    setDarkMode(darkModeSetting === 'true');

    if (localStorage.getItem('defaultMimicTime') === null) {
      localStorage.setItem('defaultMimicTime', '30');
    } else {
      const time = localStorage.getItem('defaultMimicTime');
      setDefaultTime(time ? +time : 30);
    }
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

  const setDefaultMimicTime = (time: number): void => {
    setDefaultTime(time);
    localStorage.setItem('defaultMimicTime', `${time}`);
    HapticsService.successNotification();
    AudioService.playAudio(AudioIds.CLICK);
  };

  const openTimeSheet = (): void => {
    presentTime(
      [
        {
          text: '30 segundos',
          handler: (): void => {
            setDefaultMimicTime(30);
          },
        },
        {
          text: '1 minuto',
          handler: (): void => {
            setDefaultMimicTime(60);
          },
        },
        {
          text: '2 minutos',
          handler: (): void => {
            setDefaultMimicTime(120);
          },
        },
        {
          text: '3 minutos',
          handler: (): void => {
            setDefaultMimicTime(240);
          },
        },
        {
          text: '5 minutos',
          handler: (): void => {
            setDefaultMimicTime(300);
          },
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
      'Tiempo para mímica'
    );
  };

  const clearData = (): void => {
    setShowAlert(true);
  };

  const renderAlert = (): JSX.Element => (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={(): void => setShowAlert(false)}
      header='Limpiar datos'
      subHeader='¿Estás seguro de que deseas limpiar los datos?'
      message='Todos los datos que hayas ingresado de jugadores, equipos y personajes se borrarán'
      buttons={[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (): void => {
            setShowAlert(false);
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (): void => {
            localStorage.clear();
          },
        },
      ]}
    />
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='rankings' />
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
            <IonIcon slot='start' icon={happyOutline}></IonIcon>
            <IonText className='ion-padding-left'>Personajes</IonText>
          </IonItem>
          <IonItem routerLink='movies'>
            <IonIcon slot='start' icon={filmOutline}></IonIcon>
            <IonText className='ion-padding-left'>Películas</IonText>
          </IonItem>
          <IonItem onClick={openTimeSheet}>
            <IonIcon slot='start' icon={timeOutline}></IonIcon>
            <IonText className='ion-padding-left'>
              Tiempo default mimica
            </IonText>
            <IonNote slot='end'>{defaultTime}s</IonNote>
          </IonItem>

          <IonItem
            onClick={(): void => {
              localStorage.removeItem('mimicCharacters');
              HapticsService.successNotification();
              AudiService.playAudio(AudioIds.CORRECT);
            }}
          >
            <IonIcon slot='start' icon={refreshOutline}></IonIcon>
            <IonText className='ion-padding-left'>Reiniciar personajes</IonText>
          </IonItem>
        </IonList>

        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>SISTEMA</small>
          </IonText>
        </div>
        <IonList>
          <AppIdSettingsItem />
          <IonItem onClick={clearData}>
            {renderAlert()}
            <IonLabel>Limpiar datos</IonLabel>
            <IonIcon slot='start' icon={trashBinOutline} />
          </IonItem>
          <SyncSettingsItem />
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
