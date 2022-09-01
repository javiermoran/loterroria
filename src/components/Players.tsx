import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import NewPlayer from './NewPlayer';
import PlayersService from '../services/PlayersService';
import Player from '../models/Player';
import Podium from './Podium';

const Players = (): JSX.Element => {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  useEffect((): void => {
    getPlayers();
  }, []);

  const getPlayers = (): void => {
    const playerList: Player[] = PlayersService.getPlayers();
    const players = playerList.sort((a: Player, b: Player): number =>
      a?.points > b?.points ? -1 : 1
    );

    setPlayerList(players);
  };

  const renderPlayersList = (): JSX.Element => {
    return (
      <div>
        <IonText>
          <h3 className='ion-padding-horizontal'>Jugadores</h3>
        </IonText>
        <IonList className='ion-padding-bottom'>
          {playerList.map((player: Player): JSX.Element => {
            return (
              <IonItem key={player?.name}>
                <IonLabel>{player?.name}</IonLabel>
                <IonNote style={{ color: player?.color }} slot='end'>
                  {player?.points || 0}
                </IonNote>
              </IonItem>
            );
          })}
        </IonList>
      </div>
    );
  };

  const renderEmptyState = (): JSX.Element => {
    return (
      <IonGrid>
        <IonRow>
          <IonCol className='ion-padding-horizontal empty-state'>
            <IonText>No hay jugadores registrados</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  };

  return (
    <div className='ion-padding-top'>
      <Podium players={playerList} />
      {playerList.length ? renderPlayersList() : renderEmptyState()}
      <NewPlayer onPlayerSaved={getPlayers} />
    </div>
  );
};

export default Players;
