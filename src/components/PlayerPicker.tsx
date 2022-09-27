import { IonCheckbox, IonItem, IonLabel, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import Player from '../models/Player';
import PlayersService from '../services/PlayersService';
import * as HapticsService from '../services/HapticsService';
import AudioService, { AudioIds } from '../services/AudioService';
import Team from '../models/Team';

interface PlayerPickerItem {
  playersChanged: (playerIds: string[]) => void;
}

const PlayerPicker = ({ playersChanged }: PlayerPickerItem): JSX.Element => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamPlayers, setTeamPlayers] = useState<string[]>([]);

  useEffect((): void => {
    const teams = PlayersService.getTeams();
    const members = teams.reduce((acc: string[], team: Team): string[] => {
      acc = [...acc, ...team.members];
      return acc;
    }, []);
    const playerList = PlayersService.getPlayers();
    setPlayers(
      playerList.filter(
        (player: Player): boolean => !members.includes(player?.id)
      )
    );
  }, []);

  const checkChange = (e: any, index: number): void => {
    AudioService.playAudio(AudioIds.CLICK);
    HapticsService.hapticsImpactMedium();
    if (e.detail.checked) {
      setTeamPlayers([...teamPlayers, players[index]?.id]);
      playersChanged([...teamPlayers, players[index]?.id]);
    } else {
      const teamPlayersList = teamPlayers.filter(
        (playerId: string): boolean => playerId !== players[index]?.id
      );
      setTeamPlayers(teamPlayersList);
      playersChanged(teamPlayersList);
    }
  };

  return (
    <div className='ion-padding-top'>
      <IonLabel>Jugadores</IonLabel>
      <IonList>
        {players?.map(
          (player: Player, index: number): JSX.Element => (
            <IonItem key={player?.id}>
              <IonLabel>{player?.name}</IonLabel>
              <IonCheckbox
                onIonChange={(e: any): void => checkChange(e, index)}
                slot='end'
              />
            </IonItem>
          )
        )}
      </IonList>
    </div>
  );
};

export default PlayerPicker;
