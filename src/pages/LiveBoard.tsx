import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonNote,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { useState } from 'react';
import If from '../components/If';
import Player from '../models/Player';
import Team from '../models/Team';
import SyncService, { BasketPlayerTeams } from '../services/SyncService';
import { interval, Subject, takeUntil } from 'rxjs';
import { pulseSharp } from 'ionicons/icons';
import KeepAwakeService from '../services/KeepAwake';

const LiveBoard = (): JSX.Element => {
  const destroy$ = new Subject<boolean>();
  const [players, setPlayers] = useState<Player[] | undefined>([]);
  const [teams, setTeams] = useState<Team[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [startLoading, setStartLoading] = useState(true);

  useIonViewDidEnter((): void => {
    KeepAwakeService.keepAwake();
    getData();
    interval(10000)
      .pipe(takeUntil(destroy$))
      .subscribe((): void => {
        getData();
      });
  });

  useIonViewWillLeave((): void => {
    destroy$.next(true);
    destroy$.unsubscribe();
    KeepAwakeService.allowSleep();
  });

  const getData = (): void => {
    console.log('LiveBoard -> getData');
    setLoading(true);
    SyncService.getPlayers().then((response: BasketPlayerTeams): void => {
      const playerList = response?.players?.sort(
        (a: Player, b: Player): number => {
          return b.points - a.points;
        }
      );

      const teamsList = response?.teams?.sort((a: Team, b: Team): number => {
        return b.points - a.points;
      });

      setPlayers(playerList);
      setTeams(teamsList);
      SyncService.syncData().finally((): void => {
        setLoading(false);
        setStartLoading(false);
      });
    });
  };

  const renderPlayers = (): JSX.Element[] | void => {
    return players?.map((player: Player): JSX.Element => {
      return (
        <IonItem key={player?.id}>
          <IonAvatar className='small-avatar' slot='start'>
            <img alt='' src={`/assets/avatars/${player?.avatar}.png`} />
          </IonAvatar>
          <IonLabel>{player?.name}</IonLabel>
          <IonNote style={{ color: player?.color }} slot='end'>
            {player?.points || 0}
          </IonNote>
        </IonItem>
      );
    });
  };

  const renderTeams = (): JSX.Element[] | void => {
    return teams?.map((team: Team): JSX.Element => {
      return (
        <IonItem key={team?.id}>
          <IonLabel>{team?.name}</IonLabel>
          <IonNote slot='end'>{team?.points || 0}</IonNote>
        </IonItem>
      );
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='rankings' />
          </IonButtons>
          <IonTitle>
            <div className='pulse'>
              <IonIcon icon={pulseSharp} />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <If condition={loading}>
          <IonProgressBar type='indeterminate' />
        </If>
        <IonLoading isOpen={startLoading} message={''} />

        <If condition={!startLoading}>
          <div className='ion-padding-horizontal ion-margin-top'>
            <IonText color='medium' className='players-title'>
              <small>JUGADORES</small>
            </IonText>
          </div>
          <IonList>{players?.length && renderPlayers()}</IonList>

          <div className='ion-padding-horizontal ion-margin-top'>
            <IonText color='medium' className='players-title'>
              <small>EQUIPOS</small>
            </IonText>
          </div>
          <IonList>{teams?.length && renderTeams()}</IonList>
        </If>
      </IonContent>
    </IonPage>
  );
};

export default LiveBoard;
