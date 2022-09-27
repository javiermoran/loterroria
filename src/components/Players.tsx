import {
  IonAvatar,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
  IonToast,
  useIonActionSheet,
  useIonViewDidEnter,
} from '@ionic/react';
import { useState } from 'react';
import NewPlayer from './NewPlayer';
import PlayersService from '../services/PlayersService';
import Player from '../models/Player';
import { informationCircle, trash } from 'ionicons/icons';
import * as HapticsService from '../services/HapticsService';
import AudioService, { AudioIds } from '../services/AudioService';

const Players = (): JSX.Element => {
  const [present] = useIonActionSheet();
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  useIonViewDidEnter((): void => {
    getPlayers();
  });

  const getPlayers = (): void => {
    const playerList: Player[] = PlayersService.getPlayers();
    const players = playerList.sort((a: Player, b: Player): number =>
      a?.points > b?.points ? -1 : 1
    );

    setPlayerList(players);
  };

  const onPlayerSaved = (): void => {
    AudioService.playAudio(AudioIds.CORRECT);
    showAlert('Jugador guardado');
    getPlayers();
  };

  const deletePlayer = (player: Player): void => {
    PlayersService.deletePlayer(player);
    getPlayers();
    HapticsService.successNotification();
    showAlert('Jugador eliminado');
  };

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

  const openSheet = (player: Player): void => {
    present({
      buttons: [
        {
          text: 'Agregar 1 punto',
          handler: (): void => {
            PlayersService.playerAddPoints(player?.id, 1);
            getPlayers();
            AudioService.playAudio(AudioIds.CLICK);
            HapticsService.successNotification();
          },
        },
        {
          text: 'Quitar 1 punto',
          handler: (): void => {
            PlayersService.playerSubstractPoints(player?.id, 1);
            getPlayers();
            AudioService.playAudio(AudioIds.CLICK);
            HapticsService.successNotification();
          },
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
      header: player?.name,
    });
  };

  const renderPlayersList = (): JSX.Element => {
    return (
      <div>
        {renderToast()}
        <IonList className='ion-margin-bottom'>
          {playerList.map((player: Player): JSX.Element => {
            return (
              <IonItemSliding key={player?.name}>
                <IonItem onClick={() => openSheet(player)}>
                  <IonAvatar className='small-avatar' slot='start'>
                    <img alt='' src={`/assets/avatars/${player?.avatar}.png`} />
                  </IonAvatar>
                  <IonLabel>{player?.name}</IonLabel>
                  <IonNote style={{ color: player?.color }} slot='end'>
                    {player?.points || 0}
                  </IonNote>
                </IonItem>
                <IonItemOptions side='end'>
                  <IonItemOption
                    color='danger'
                    onClick={() => deletePlayer(player)}
                  >
                    <IonIcon icon={trash} />
                    &nbsp;Borrar
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
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
    <div className='players ion-margin-bottom'>
      <div className='ion-padding-horizontal ion-margin-top'>
        <IonText color='medium' className='players-title'>
          <small>JUGADORES</small>
          <NewPlayer onPlayerSaved={onPlayerSaved} />
        </IonText>
      </div>
      {playerList.length ? renderPlayersList() : renderEmptyState()}
    </div>
  );
};

export default Players;
