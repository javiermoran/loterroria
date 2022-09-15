import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonToolbar,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import Team from '../models/Team';
import PlayerPicker from './PlayerPicker';
import { v4 as uuid } from 'uuid';
import PlayersService from '../services/PlayersService';

interface NewTeamParams {
  onTeamAdded: (team: Team) => void;
}

const NewTeam = ({ onTeamAdded }: NewTeamParams): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [name, setName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);

  useEffect((): void => {
    setPresentingElement(
      document.getElementById('app-router-outlet') || page.current
    );
  }, []);

  const saveTeam = (): void => {
    const team: Team = {
      id: uuid(),
      name,
      members,
      points: 0,
    };
    PlayersService.addTeam(team);
    onTeamAdded(team);
    setName('');
    setMembers([]);
    modal.current?.dismiss();
  };

  const cancel = (): void => {
    setName('');
    modal.current?.dismiss();
  };

  const playersChanged = (playerIds: string[]): void => {
    setMembers(playerIds);
  };

  return (
    <div className='newTeam'>
      <IonButton
        id='new-team-btn'
        size='small'
        className='ion-margin-right transparent-button'
      >
        <IonIcon icon={addOutline} />
      </IonButton>
      <IonModal
        ref={modal}
        trigger='new-team-btn'
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={cancel}>Cancelar</IonButton>
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton disabled={!name} strong={true} onClick={saveTeam}>
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
              placeholder='Escribe el nombre del equipo'
              onIonChange={(e) => {
                setName(e.detail?.value || '');
              }}
            ></IonInput>
          </div>
          <div>
            <PlayerPicker playersChanged={playersChanged} />
          </div>
          <div className='ion-padding-top'>
            <IonButton disabled={!name} onClick={saveTeam} expand='block'>
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default NewTeam;
