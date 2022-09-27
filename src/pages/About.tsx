import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  logoApple,
  logoHtml5,
  logoIonic,
  logoOctocat,
  logoPwa,
  logoReact,
} from 'ionicons/icons';

const About = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' defaultHref='settings' />
          </IonButtons>
          <IonTitle>Acerca de</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='ion-padding'>
          <IonText>
            <h3 className='ion-padding-bottom'>Acerca de la app</h3>
          </IonText>
          <IonText color='medium' className='ion-padding-vertical'>
            Es un app desarrollada para llevar el control de los juegos en la
            fiesta de halloween. Con ella se puede llevar el control el puntos y
            conocer los ganadores. También sirve como acompañante de algunos de
            los juegos como loterroría y trivia.
          </IonText>
          <div className='ion-padding-vertical about-git'>
            <IonIcon size='medium' icon={logoOctocat} />
            <a href='https://github.com/javiermoran/loterroria'>
              github.com/javiermoran/loterroria
            </a>
          </div>
          <div className='ion-padding-top about-icons'>
            <IonIcon color='primary' size='large' icon={logoIonic} />
            <IonIcon color='secondary' size='large' icon={logoReact} />
            <IonIcon color='danger' size='large' icon={logoHtml5} />
            <IonIcon color='medium' size='large' icon={logoApple} />
            <IonIcon size='large' icon={logoPwa} />
            <img alt='ts' src='/assets/icon/typescript.svg' />
            <img alt='scss' src='/assets/icon/sass.png' />
            <img id='jm-icon' alt='' src='/assets/icon/jm.png'></img>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
