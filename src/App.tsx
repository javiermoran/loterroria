import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, diceOutline, peopleOutline, trophyOutline } from 'ionicons/icons';
import './App.scss';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Loterroria from './pages/Loterroria';
import Trivia from './pages/Trivia';
import Games from './pages/Games';
import Rankings from './pages/Rankings';
import Mimic from './pages/Mimic';
import Settings from './pages/Settings';
import About from './pages/About';
import Characters from './pages/Characters';

import * as HapticsService from './services/HapticsService';
import TeamDetail from './pages/TeamDetail';
import PlayersPage from './pages/PlayersPage';
import AudioService, { AudioIds } from './services/AudioService';
import LiveBoard from './pages/LiveBoard';
import Movies from './pages/Movies';

setupIonicReact();

const App: React.FC = (): JSX.Element => {
  const darkMode = localStorage.getItem('darkMode');
  if (!darkMode) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark) {
      localStorage.setItem('darkMode', 'true');
    }
  }

  if (darkMode === 'true') {
    document.body.classList.add('dark');
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet id='app-router-outlet'>
            <Route exact path='/rankings' component={Rankings} />
            <Route exact path='/games' component={Games} />
            <Route exact path='/players' component={PlayersPage} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/loterroria' component={Loterroria} />
            <Route exact path='/trivia' component={Trivia} />
            <Route exact path='/mimic' component={Mimic} />
            <Route exact path='/characters' component={Characters} />
            <Route exact path='/movies' component={Movies} />
            <Route exact path='/about' component={About} />
            <Route exact path='/teams/:id' component={TeamDetail} />
            <Route exact path='/live-board' component={LiveBoard} />
            <Route exact path='/'>
              <Redirect to='/rankings' />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton
              onClick={() => {
                AudioService.playAudio(AudioIds.CLICK);
                HapticsService.hapticsImpactHeavy();
              }}
              tab='tab1'
              href='/rankings'
            >
              <IonIcon icon={trophyOutline} />
            </IonTabButton>
            <IonTabButton
              onClick={(): void => {
                AudioService.playAudio(AudioIds.CLICK);
                HapticsService.hapticsImpactHeavy();
              }}
              tab='tab2'
              href='/players'
            >
              <IonIcon icon={peopleOutline} />
            </IonTabButton>
            <IonTabButton
              onClick={(): void => {
                AudioService.playAudio(AudioIds.CLICK);
                HapticsService.hapticsImpactHeavy();
              }}
              tab='tab3'
              href='/games'
            >
              <IonIcon icon={diceOutline} />
            </IonTabButton>
            <IonTabButton
              onClick={(): void => {
                AudioService.playAudio(AudioIds.CLICK);
                HapticsService.hapticsImpactHeavy();
              }}
              tab='tab4'
              href='/settings'
            >
              <IonIcon icon={cog} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
