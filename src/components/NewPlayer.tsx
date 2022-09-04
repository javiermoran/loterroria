import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonModal,
  IonToolbar,
} from '@ionic/react';
import * as HapticsService from '../services/HapticsService';

import { useRef, useState } from 'react';
import PlayersService from '../services/PlayersService';
import ColorPicker from './ColorPicker';
import AvatarPicker from './AvatarPicker';

interface NewPlayerParams {
  onPlayerSaved: () => unknown;
}

const NewPlayer = ({ onPlayerSaved }: NewPlayerParams): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [avatar, setAvatar] = useState<number>();

  const savePlayer = (): void => {
    PlayersService.addPlayer({ name, color, avatar, points: 0 });
    onPlayerSaved();
    modal?.current?.dismiss();
    HapticsService.successNotification();
    setName('');
    setColor('');
  };

  const cancel = (): void => {
    setName('');
    setColor('');
    modal.current?.dismiss();
  };

  return (
    <div>
      <IonModal ref={modal} trigger='new-player-btn'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={cancel}>Cancelar</IonButton>
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton
                disabled={!color || !name}
                strong={true}
                onClick={savePlayer}
              >
                Guardar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <div className='ion-padding-top'>
            <IonLabel position='floating'>Nombre</IonLabel>
            <IonInput
              value={name}
              placeholder='Escribe el nombre del jugador'
              onIonChange={(e) => {
                setName(e.detail?.value || '');
              }}
            ></IonInput>
          </div>
          <div className='ion-padding-top ion-padding-bottom'>
            <IonLabel>Color</IonLabel>
            <ColorPicker onColorChange={(color: string) => setColor(color)} />
          </div>
          <div className='ion-padding-top ion-padding-bottom'>
            <IonLabel>Avatar</IonLabel>
            <AvatarPicker
              onAvatarChange={(avatar: number) => setAvatar(avatar)}
            />
          </div>
          <div className='ion-padding-top'>
            <IonButton
              disabled={!color || !name || !avatar}
              onClick={savePlayer}
              expand='block'
            >
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default NewPlayer;
