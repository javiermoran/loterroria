import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useRef, useState } from 'react';
import PlayersService from '../services/PlayersService';
import ColorPicker from './ColorPicker';

interface NewPlayerParams {
  onPlayerSaved: () => unknown;
}

const NewPlayer = ({ onPlayerSaved }: NewPlayerParams): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const savePlayer = (): void => {
    PlayersService.addPlayer({ name, color, points: 0 });
    onPlayerSaved();
    modal?.current?.dismiss();
  };

  return (
    <div>
      <IonModal ref={modal} trigger='new-player-btn'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancelar
              </IonButton>
            </IonButtons>
            <IonTitle>Nuevo jugador</IonTitle>
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
          <div className='ion-padding-top'>
            <IonButton
              disabled={!color || !name}
              onClick={savePlayer}
              expand='block'
            >
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
      <IonGrid>
        <IonRow>
          <IonCol className='ion-padding-horizontal'>
            <IonButton id='new-player-btn' expand='block'>
              Nuevo jugador
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default NewPlayer;
