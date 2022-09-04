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
import CharactersService from '../services/CharactersService';
import { BaseCharacterItem } from '../services/CharactersService';

const Characters = (): JSX.Element => {
  const [useBase, setUseBase] = useState<boolean>(true);
  const [base, setBase] = useState<BaseCharacterItem[]>();

  useEffect((): void => {
    getBase();
    setUseBase(CharactersService.isBaseEnabled());
  }, []);

  const getBase = (): void => {
    const characters = CharactersService.getBaseCharacters();
    setBase(characters);
    setUseBase(CharactersService.isBaseEnabled());
  };

  const onUseBaseChange = (e: any): void => {
    setUseBase(e.detail.checked);
    CharactersService.toggleBaseEnabled();
  };

  const renderBaseCharacters = (): JSX.Element => (
    <IonList className='ion-margin-top'>
      {base?.map(
        (baseItem: BaseCharacterItem): JSX.Element => (
          <IonItem key={baseItem?.id}>
            {baseItem?.label}
            <IonNote slot='end'>{baseItem.points} puntos</IonNote>
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
            <IonBackButton text='Atrás' defaultHref='rankings' />
          </IonButtons>
          <IonTitle>Personajes / Películas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding-horizontal ion-margin-top'>
          <IonText color='medium'>
            <small>CUSTOM</small>
          </IonText>
        </div>
        <IonList>
          <IonItem>Próximamente</IonItem>
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
