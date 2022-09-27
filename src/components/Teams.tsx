import {
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonNote,
  IonRow,
  IonText,
  IonToast,
  useIonViewDidEnter,
} from '@ionic/react';
import { informationCircle } from 'ionicons/icons';
import { useState } from 'react';
import Team from '../models/Team';
import PlayersService from '../services/PlayersService';
import NewTeam from './NewTeam';
import * as HapticsService from '../services/HapticsService';
import AudioService, { AudioIds } from '../services/AudioService';

const Teams = (): JSX.Element => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  useIonViewDidEnter((): void => {
    getTeams();
  }, []);

  const getTeams = (): void => {
    const teamsList = PlayersService.getTeams();
    setTeams(teamsList);
  };

  const teamAdded = (): void => {
    AudioService.playAudio(AudioIds.CORRECT);
    HapticsService.successNotification();
    getTeams();
    showAlert('Equipo guardado exitosamente');
  };

  const renderTeams = (): JSX.Element => (
    <IonList>
      {teams.map(
        (team: Team): JSX.Element => (
          <IonItem key={team?.id} routerLink={`teams/${team?.id}`}>
            {team?.name}
            <IonNote slot='end'>{team?.points}</IonNote>
          </IonItem>
        )
      )}
    </IonList>
  );

  const renderEmpty = (): JSX.Element => (
    <IonGrid>
      <IonRow>
        <IonCol className='ion-padding-horizontal empty-state'>
          <IonText>No hay equipos registrados</IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );

  const showAlert = (message: string) => {
    setMessage(message);
    setShowToast(true);
    setTimeout((): void => {
      setShowToast(false);
    }, 5000);
  };

  const renderToast = (): JSX.Element => {
    return (
      <IonToast
        isOpen={showToast}
        animated={true}
        icon={informationCircle}
        message={message}
        color='success'
        position='top'
      ></IonToast>
    );
  };

  return (
    <div className='teams players'>
      {renderToast()}
      <div className='ion-padding-horizontal ion-margin-top'>
        <IonText color='medium' className='players-title'>
          <small>EQUIPOS</small>
          <NewTeam onTeamAdded={teamAdded} />
        </IonText>
      </div>
      {teams?.length ? renderTeams() : renderEmpty()}
    </div>
  );
};

export default Teams;
