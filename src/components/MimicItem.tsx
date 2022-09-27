import { IonList, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { BaseCharacterItem } from '../services/CharactersService';

interface MimicItemProps {
  item?: BaseCharacterItem;
  disabled: boolean;
}

const MimicItem = ({ item, disabled }: MimicItemProps): JSX.Element => {
  const [character, setCharacter] = useState<BaseCharacterItem>();

  useEffect((): void => {
    setCharacter(item);
  }, [item]);

  return (
    <IonList className='ion-margin-top ion-padding ion-text-center'>
      {!disabled && (
        <IonText className='ion-text-center'>
          <h1>{character?.label || 'No hay selección'}</h1>
        </IonText>
      )}
      {disabled && <IonText className='blink'>En pausa</IonText>}
    </IonList>
  );
};

export default MimicItem;
