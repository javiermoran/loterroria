import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import NewCustomCharacter from '../components/NewCustomCharacter';
import CharactersService from '../services/CharactersService';
import { BaseCharacterItem } from '../services/CharactersService';
import * as HapticsService from '../services/HapticsService';

const Characters = (): JSX.Element => {
  const [useBase, setUseBase] = useState<boolean>(true);
  const [useCustom, setUseCustom] = useState<boolean>(false);
  const [base, setBase] = useState<BaseCharacterItem[]>();
  const [custom, setCustom] = useState<BaseCharacterItem[]>();

  useEffect((): void => {
    getBase();
    getCustom();
    setUseBase(CharactersService.isBaseEnabled());
    setUseCustom(CharactersService.isCustomEnabled());
  }, []);

  const getBase = (): void => {
    const characters = CharactersService.getBaseCharacters();
    setBase(characters);
    setUseBase(CharactersService.isBaseEnabled());
  };

  const getCustom = (): void => {
    const characters = CharactersService.getCustomCharacters();
    setCustom(characters);
    setUseCustom(CharactersService.isCustomEnabled());
  };

  const onUseBaseChange = (e: any): void => {
    setUseBase(e.detail.checked);
    CharactersService.toggleBaseEnabled();
  };

  const onUseCustomChange = (e: any): void => {
    setUseCustom(e.detail.checked);
    CharactersService.toggleCustomEnabled();
  };

  const onCharacterAdded = (): void => {
    HapticsService.successNotification();
    getCustom();
  };

  const renderBaseCharacters = (): JSX.Element => (
    <IonList className='ion-margin-top'>
      {base?.map(
        (baseItem: BaseCharacterItem): JSX.Element => (
          <IonItem key={baseItem?.id}>
            {baseItem?.label}
            <IonNote slot='end'>
              {baseItem.points} {baseItem?.points > 1 ? 'puntos' : 'punto'}
            </IonNote>
          </IonItem>
        )
      )}
    </IonList>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='rankings' />
          </IonButtons>
          <IonTitle>Personajes / Películas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium' className='players-title'>
            <small>CUSTOM</small>
            <NewCustomCharacter onCharacterAdded={onCharacterAdded} />
          </IonText>
        </div>
        <IonList>
          <IonItem>
            Usar custom
            <IonToggle
              checked={useCustom}
              onIonChange={onUseCustomChange}
              slot='end'
              color='success'
            />
          </IonItem>
        </IonList>
        <IonList>
          {custom?.map(
            (character: BaseCharacterItem): JSX.Element => (
              <IonItem key={character?.id}>{character?.label} </IonItem>
            )
          )}
        </IonList>

        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>BASE</small>
          </IonText>
        </div>
        <IonList>
          <IonItem>
            Usar base
            <IonToggle
              checked={useBase}
              onIonChange={onUseBaseChange}
              slot='end'
              color='success'
            />
          </IonItem>
        </IonList>
        {useBase && renderBaseCharacters()}
      </IonContent>
    </IonPage>
  );
};

export default Characters;
