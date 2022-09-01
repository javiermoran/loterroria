import { IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import Player from '../models/Player';

interface PodiumParams {
  players: Player[];
}

const Podium = ({ players }: PodiumParams): JSX.Element => {
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getTopPlayers();
  }, []);

  const getTopPlayers = () => {
    const playersWithPoints = players.filter(
      (player: Player): boolean => player.points > 0
    );
    if (playersWithPoints.length >= 3) {
      setTopPlayers(playersWithPoints.slice(0, 3));
    }
  };

  const renderEmptyState = (): JSX.Element => {
    return (
      <div className='empty-state'>
        <IonText>No se cuenta con suficiente información</IonText>
      </div>
    );
  };

  const renderPodium = (): JSX.Element => {
    return <div>Podium will be rendered here</div>;
  };

  return (
    <div className='ion-padding'>
      <IonText>
        <h3>Top 3</h3>
      </IonText>
      <div className='podium'>
        {players?.length < 3 ? renderEmptyState() : renderPodium()}
      </div>
    </div>
  );
};

export default Podium;
