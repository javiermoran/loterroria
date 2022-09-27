import {
  AlertInput,
  IonIcon,
  IonItem,
  IonNote,
  IonText,
  useIonAlert,
  useIonViewDidEnter,
} from '@ionic/react';
import { serverOutline } from 'ionicons/icons';
import { useState } from 'react';

const AppIdSettingsItem = (): JSX.Element => {
  const [presentAlert] = useIonAlert();
  const [id, setId] = useState('');

  useIonViewDidEnter((): void => {
    const appId = localStorage.getItem('appId') || 'loterroria';
    setId(appId);
  });

  const showAlert = (): void => {
    presentAlert({
      header: 'Escribe el id de la app',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (value: any): void => {
            setId(value[0]);
            localStorage.setItem('appId', value[0]);
            window.location.reload();
          },
        },
      ],
      inputs: [
        {
          placeholder: 'ID de la app',
          value: id,
        },
      ],
    });
  };

  return (
    <IonItem onClick={showAlert}>
      <IonIcon slot='start' icon={serverOutline}></IonIcon>
      <IonText className='ion-padding-left'>ID de sesión</IonText>
      <IonNote slot='end'>{id}</IonNote>
    </IonItem>
  );
};

export default AppIdSettingsItem;
