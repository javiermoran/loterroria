import { useState } from 'react';
import * as HapticsService from '../services/HapticsService';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonList,
  useIonViewDidEnter,
} from '@ionic/react';
import { pauseOutline, playOutline, refreshOutline } from 'ionicons/icons';
import AudioService, { AudioIds } from '../services/AudioService';

interface CounterParams {
  onCounterFinished?: () => unknown;
  onCounterStop: () => unknown;
  onCounterStart: () => unknown;
  disabled: boolean;
}

const Counter = ({
  onCounterFinished,
  onCounterStart,
  onCounterStop,
  disabled,
}: CounterParams): JSX.Element => {
  const defaultTimeItem = localStorage?.getItem('defaultMimicTime');
  const defaultTime = defaultTimeItem ? +defaultTimeItem : 5;
  const [time, setTime] = useState<number>(defaultTime);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useIonViewDidEnter((): void => {
    setTime(defaultTime);
    setIsPaused(true);
    setIsFinished(false);
  }, [defaultTime]);

  setTimeout((): void => {
    if (!isPaused && time > 0) {
      setTime(time - 1);
      if (time === 1) {
        HapticsService.hapticsVibrate();
        AudioService.playAudio(AudioIds.MAGIC);
        if (onCounterFinished) {
          onCounterFinished();
          setIsFinished(true);
        }
      }
    }
  }, 1000);

  const toggleTimer = (): void => {
    setIsPaused(!isPaused);
    !isPaused ? onCounterStop() : onCounterStart();
  };

  const restart = (): void => {
    setTime(defaultTime);
    setIsPaused(true);
    setIsFinished(false);
  };

  const formatTime = (time: number): string => {
    const date = new Date(time * 1000).toISOString();
    const numbersDate = date.split('T')[1].replace('Z', '').split('.')[0];
    const numberArr = numbersDate.split(':');
    return `${numberArr[1]}:${numberArr[2]}`;
  };

  return (
    <IonList className='ion-margin-top'>
      <div className='counter'>{formatTime(time)}</div>
      <IonGrid>
        <IonCol>
          {!isFinished && (
            <IonButton expand='block' onClick={toggleTimer} disabled={disabled}>
              {isPaused ? (
                <IonIcon icon={playOutline} />
              ) : (
                <IonIcon icon={pauseOutline} />
              )}
            </IonButton>
          )}
          {isFinished && (
            <IonButton expand='block' onClick={restart}>
              <IonIcon icon={refreshOutline}></IonIcon>
            </IonButton>
          )}
        </IonCol>
      </IonGrid>
    </IonList>
  );
};

export default Counter;
