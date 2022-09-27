import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { useState } from 'react';
import Counter from '../components/Counter';
import MimicItem from '../components/MimicItem';
import TeamSelector from '../components/TeamSelector';
import Team from '../models/Team';
import AudioService, { AudioIds } from '../services/AudioService';
import CharactersService, {
  BaseCharacterItem,
} from '../services/CharactersService';
import KeepAwakeService from '../services/KeepAwake';
import PlayersService from '../services/PlayersService';

const Mimic = (): JSX.Element => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [team, setTeam] = useState<Team | null>();
  const [item, setItem] = useState<BaseCharacterItem>();

  useIonViewDidEnter((): void => {
    KeepAwakeService.keepAwake();
    setTeam(null);
    setItem(CharactersService.getLastCharacter());
  }, []);

  useIonViewWillLeave((): void => {
    KeepAwakeService.allowSleep();
  });

  const onSuccess = (): void => {
    AudioService.playAudio(AudioIds.CORRECT);
    if (team) {
      PlayersService.teamAddPoints(team?.id, 1);
    }
    CharactersService.getNextCharacter();
    setItem(CharactersService.getLastCharacter());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='games' />
          </IonButtons>
          <IonTitle>Mímica</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TeamSelector
          teamChanged={(team: Team): void => {
            setTeam(team);
          }}
        />

        <Counter
          disabled={!team || !item}
          onCounterStart={(): void => {
            setIsPaused(false);
          }}
          onCounterStop={(): void => {
            setIsPaused(true);
          }}
          onCounterFinished={(): void => {
            setTimeout((): void => {
              setIsPaused(true);
            }, 5000);
          }}
        />

        <MimicItem item={item} disabled={isPaused} />

        <div className='ion-padding'>
          <IonButton
            disabled={!team || !item || isPaused}
            size='large'
            expand='block'
            onClick={onSuccess}
          >
            Correcto
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mimic;
