import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Player from '../models/Player';
import Team from '../models/Team';
import PlayersService from '../services/PlayersService';

interface TeamDetailParams {
  id: string;
}

const TeamDetail = (): JSX.Element => {
  const { id } = useParams<TeamDetailParams>();
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>([]);

  useEffect((): void => {
    const teamDetails = PlayersService.getTeam(id);
    const allPlayers = PlayersService.getPlayers();
    setTeam(teamDetails);
    const teamPlayers = teamDetails?.members.reduce(
      (acc: Player[], id: string): Player[] => {
        const foundPlayer = allPlayers.find(
          (player: Player): boolean => player?.id === id
        );
        foundPlayer && acc.push(foundPlayer);
        return acc;
      },
      []
    );
    setPlayers(teamPlayers);
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='rankings' />
          </IonButtons>
          <IonTitle>{team?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding-top ion-padding-start'>
          <IonText>Puntos</IonText>
        </div>
        <div className='ion-padding-start'>
          <IonText color='primary'>
            <h1>{team?.points}</h1>
          </IonText>
        </div>

        <div className='ion-padding'>
          <IonText>Jugadores</IonText>
        </div>
        <IonList>
          {players?.map(
            (player: Player): JSX.Element => (
              <IonItem key={player?.id}>{player?.name}</IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetail;
