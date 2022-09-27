import {
  IonIcon,
  IonItem,
  IonLabel,
  useIonAlert,
  useIonToast,
} from '@ionic/react';
import {
  informationCircleOutline,
  syncOutline,
  warningOutline,
} from 'ionicons/icons';
import AudioService, { AudioIds } from '../services/AudioService';
import SyncService from '../services/SyncService';
import * as HapticsService from '../services/HapticsService';

const SyncSettingsItem = (): JSX.Element => {
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const presentSuccessToast = (): void => {
    present({
      message: 'Datos sincronizados correctamente',
      color: 'success',
      duration: 1500,
      icon: informationCircleOutline,
      position: 'top',
      onDidDismiss: (): void => {
        window.location.reload();
      },
    });
  };

  const presentErrorToast = (): void => {
    present({
      message: 'Algo salió mal',
      icon: warningOutline,
      color: 'error',
      duration: 1500,
      position: 'top',
    });
  };

  const showAlert = (): void => {
    presentAlert({
      header: 'Sincronizar datos',
      message:
        '¿Estás seguro de que deseas sincronizar datos? Los datos locales serán reemplazados.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (): void => {
            SyncService.syncData()
              .then((): void => {
                AudioService.playAudio(AudioIds.CORRECT);
                HapticsService.successNotification();
                presentSuccessToast();
              })
              .catch((): void => {
                presentErrorToast();
              });
          },
        },
      ],
    });
  };

  return (
    <IonItem onClick={showAlert}>
      <IonLabel>Sincronizar datos</IonLabel>
      <IonIcon slot='start' icon={syncOutline} />
    </IonItem>
  );
};

export default SyncSettingsItem;
