import { IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import Player from '../models/Player';
import PlayersService from '../services/PlayersService';

interface PlayerSelectorParams {
  playerChanged: (player: Player) => void;
}

const PlayerSelector = ({
  playerChanged,
}: PlayerSelectorParams): JSX.Element => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect((): void => {
    const playerList = PlayersService.getPlayers();
    setPlayers(playerList);
  }, []);

  return (
    <IonList className='ion-padding-end ion-padding-top ion-margin-top'>
      <IonText className='ion-padding'>Jugador</IonText>
      <IonSelect
        placeholder='Selecciona el jugador'
        interface='action-sheet'
        cancelText='Cancelar'
        onIonChange={(ev: any): void => {
          playerChanged(ev.detail.value);
        }}
      >
        {players.map(
          (player: Player): JSX.Element => (
            <IonSelectOption key={player?.name} value={player}>
              {player.name}
            </IonSelectOption>
          )
        )}
      </IonSelect>
    </IonList>
  );
};

export default PlayerSelector;
