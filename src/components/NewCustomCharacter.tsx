import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import CharactersService, {
  BaseCharacterItem,
} from '../services/CharactersService';
import { v4 as uuid } from 'uuid';
import { addOutline } from 'ionicons/icons';
import * as HapticsService from '../services/HapticsService';

interface NewCharacterProps {
  onCharacterAdded: () => unknown;
}

const NewCustomCharacter = ({
  onCharacterAdded,
}: NewCharacterProps): JSX.Element => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [label, setLabel] = useState<string>('');
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);

  useEffect((): void => {
    setPresentingElement(
      document.getElementById('app-router-outlet') || page.current
    );
  }, []);

  const saveCharacter = (): void => {
    const character: BaseCharacterItem = {
      id: uuid(),
      label,
      points: 1,
    };
    CharactersService.createCustomCharacter(character);
    onCharacterAdded();
    setLabel('');
    modal.current?.dismiss();
    HapticsService.successNotification();
  };

  const cancel = (): void => {
    setLabel('');
    modal.current?.dismiss();
  };

  return (
    <div className='newTeam'>
      <IonButton
        id='new-character-btn'
        size='small'
        className='ion-margin-right transparent-button'
        onClick={HapticsService.hapticsImpactMedium}
      >
        <IonIcon icon={addOutline} />
      </IonButton>
      <IonModal
        ref={modal}
        trigger='new-character-btn'
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={cancel}>Cancelar</IonButton>
            </IonButtons>
            <IonButtons slot='end'>
              <IonButton
                disabled={!label}
                strong={true}
                onClick={saveCharacter}
              >
                Guardar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <div className='ion-padding-top'>
            <IonLabel position='floating'>Presonaje</IonLabel>
            <IonInput
              value={label}
              placeholder='Escribe el personaje'
              onIonChange={(e) => {
                setLabel(e.detail?.value || '');
              }}
            ></IonInput>
          </div>
          <div className='ion-padding-top'>
            <IonButton disabled={!label} onClick={saveCharacter} expand='block'>
              Guardar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default NewCustomCharacter;
