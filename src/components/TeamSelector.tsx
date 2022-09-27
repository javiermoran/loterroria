import { IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import Team from '../models/Team';
import PlayersService from '../services/PlayersService';

interface TeamSelectorProps {
  teamChanged: (team: Team) => void;
}

const TeamSelector = ({ teamChanged }: TeamSelectorProps): JSX.Element => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect((): void => {
    const teamsList = PlayersService.getTeams();
    setTeams(teamsList);
  }, []);

  return (
    <IonList className='ion-padding ion-margin-top'>
      <IonSelect
        placeholder='Selecciona el equipo'
        interface='action-sheet'
        cancelText='Cancelar'
        onIonChange={(ev: any): void => {
          teamChanged(ev.detail.value);
        }}
      >
        {teams.map(
          (team: Team): JSX.Element => (
            <IonSelectOption key={team?.name} value={team}>
              {team.name}
            </IonSelectOption>
          )
        )}
      </IonSelect>
    </IonList>
  );
};

export default TeamSelector;
