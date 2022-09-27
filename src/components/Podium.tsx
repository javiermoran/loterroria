import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
  useIonViewDidEnter,
} from '@ionic/react';
import { podiumOutline } from 'ionicons/icons';
import { useState } from 'react';
import Player from '../models/Player';
import PlayersService from '../services/PlayersService';

const Podium = (): JSX.Element => {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);

  useIonViewDidEnter((): void => {
    getTopPlayers();
  }, []);

  const getTopPlayers = (): void => {
    const players = PlayersService.getPlayers();
    const playersWithPoints = players
      .filter((player: Player): boolean => player.points > 0)
      .sort((a: Player, b: Player): number => (a?.points > b?.points ? -1 : 1));
    if (playersWithPoints.length >= 3) {
      setTopPlayers(playersWithPoints.slice(0, 3));
    } else {
      setTopPlayers([]);
    }
  };

  const renderEmptyState = (): JSX.Element => {
    return (
      <div className='empty-state ion-padding'>
        <IonText>No se cuenta con suficiente información</IonText>
      </div>
    );
  };

  const renderPodium = (): JSX.Element => {
    return (
      <div>
        <div className='podium-container'>
          <span id='player1'>{topPlayers[0]?.name}</span>
          <span id='player2'>{topPlayers[1]?.name}</span>
          <span id='player3'>{topPlayers[2]?.name}</span>
          <IonIcon className='ion-padding-top' icon={podiumOutline} />
        </div>
        <div className='ion-padding'>
          <IonList>
            <IonItem>
              <IonAvatar slot='start'>
                <div className='podium-medal first'>1</div>
              </IonAvatar>
              <IonLabel>{topPlayers[0]?.name}</IonLabel>
              <IonNote style={{ color: topPlayers[0]?.color }} slot='end'>
                {topPlayers[0]?.points}
              </IonNote>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <div className='podium-medal second'>2</div>
              </IonAvatar>
              <IonLabel>{topPlayers[1]?.name}</IonLabel>
              <IonNote style={{ color: topPlayers[1]?.color }} slot='end'>
                {topPlayers[1]?.points}
              </IonNote>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <div className='podium-medal third'>3</div>
              </IonAvatar>
              <IonLabel>{topPlayers[2]?.name}</IonLabel>
              <IonNote style={{ color: topPlayers[2]?.color }} slot='end'>
                {topPlayers[2]?.points}
              </IonNote>
            </IonItem>
          </IonList>
        </div>
      </div>
    );
  };

  return (
    <div className='ion-padding-end'>
      <div className='podium'>
        {topPlayers?.length < 3 ? renderEmptyState() : renderPodium()}
      </div>
    </div>
  );
};

export default Podium;
