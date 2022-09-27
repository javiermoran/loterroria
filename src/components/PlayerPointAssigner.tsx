import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonToolbar,
  useIonToast,
  useIonViewDidEnter,
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import Player from '../models/Player';
import AudioService, { AudioIds } from '../services/AudioService';
import HapticsService from '../services/HapticsService';
import PlayersService from '../services/PlayersService';

const PlayerPointAssigner = (): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [points, setPoints] = useState<number>(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<Player[]>([]);
  const [present] = useIonToast();

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);

  useIonViewDidEnter((): void => {
    setPlayers(PlayersService.getPlayers());
    setPresentingElement(
      document.getElementById('app-router-outlet') || page.current
    );
  });

  const cancel = (): void => {
    setPoints(1);
    setSelected([]);
    modal.current?.dismiss();
  };

  const checked = (e: any, player: Player): void => {
    AudioService.playAudio(AudioIds.CLICK);
    if (e.detail?.checked) {
      setSelected([...selected, player]);
    } else {
      setSelected(selected.filter((p: Player): boolean => p.id !== player?.id));
    }
  };

  const assign = (): void => {
    modal.current?.dismiss();

    for (const player of selected) {
      PlayersService.playerAddPoints(player?.id, points);
    }

    setPoints(1);
    setSelected([]);

    present({
      message: 'Puntos asignados exitosamente',
      duration: 1500,
      color: 'success',
      position: 'top',
    });
    HapticsService.successNotification();
  };

  return (
    <div>
      <IonButton id='assign-points-btn' expand='block'>
        Asignar puntos
      </IonButton>
      <IonModal
        ref={modal}
        trigger='assign-points-btn'
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={cancel}>
                <IonIcon icon={chevronBackOutline} />
                Cancelar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className='flex-content'>
          <div className='flex-full'>
            <IonList>
              <IonItem>
                <IonLabel>Cantidad</IonLabel>
                <IonInput
                  value={points}
                  type='number'
                  placeholder='Cantidad'
                  onIonChange={(e) => {
                    if (e.detail.value) {
                      setPoints(+e.detail.value);
                    }
                  }}
                />
              </IonItem>
            </IonList>
            <IonList>
              {players.map(
                (player: Player, index: number): JSX.Element => (
                  <IonItem key={index}>
                    <IonCheckbox
                      slot='start'
                      onIonChange={(e: any): void => {
                        checked(e, player);
                      }}
                    />
                    <IonLabel>{player?.name}</IonLabel>
                  </IonItem>
                )
              )}
            </IonList>
          </div>
          <div className='ion-padding'>
            <IonButton expand='block' onClick={assign}>
              Asignar
            </IonButton>
          </div>
        </div>
      </IonModal>
    </div>
  );
};

export default PlayerPointAssigner;
