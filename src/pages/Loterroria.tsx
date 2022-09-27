import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { LoteriaItem } from '../models/LoteriaItem';
import * as LoteriaService from '../services/LoteriaService';
import * as HapticsService from '../services/HapticsService';
import { ellipsisVerticalOutline } from 'ionicons/icons';

const Loterroria = (): JSX.Element => {
  const [present, dismiss] = useIonActionSheet();
  const [currentItem, setCurrentItem] = useState<LoteriaItem | null>();

  useEffect((): void => {
    const images = LoteriaService.getLoteriaImages();
    const lastItem = images[images.length - 1];
    setCurrentItem(lastItem);
  }, []);

  const onNextClick = (): void => {
    if (currentItem === null) {
      return restart();
    }

    HapticsService.hapticsImpactLight();
    const images = LoteriaService.next();
    if (images.length) {
      const lastItem = images[images.length - 1];
      setCurrentItem(lastItem);
    } else {
      setCurrentItem(null);
    }
  };

  const restart = (): void => {
    const images = LoteriaService.restart();
    const lastItem = images[images.length - 1];
    setCurrentItem(lastItem);
    dismiss();
  };

  const presentActionSheet = () => {
    present({
      buttons: [
        { text: 'Reiniciar', handler: restart },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: (): void => {
            dismiss();
          },
        },
      ],
      header: 'LO-TERROR-IA',
    });
  };

  return (
    <IonPage className='loterroria'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='games' />
          </IonButtons>
          <IonTitle>Loterroria</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={presentActionSheet}>
              <IonIcon icon={ellipsisVerticalOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {currentItem?.id && (
          <div className='ion-padding'>
            <div
              style={{
                backgroundImage: `url(/assets/loteria/${currentItem?.id}.jpg)`,
              }}
              className='loterroria__img'
            ></div>
            <div className='loterroria__bottom-label'>
              <IonText>
                <h3>{currentItem?.label}</h3>
              </IonText>
            </div>
          </div>
        )}
        {!currentItem?.id && (
          <div className='ion-padding empty-state--center'>
            <IonText color='medium'>NO MÁS CARTAS</IonText>
          </div>
        )}
        <IonButton
          expand='block'
          className='bottom-button-fixed'
          id='new-player-btn'
          onClick={onNextClick}
        >
          {currentItem?.id ? 'Siguiente' : 'Reiniciar'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Loterroria;
