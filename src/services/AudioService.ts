import { NativeAudio } from '@capacitor-community/native-audio';

export enum AudioIds {
  LAUGH = 'laugh',
  CLICK = 'click',
  MAGIC = 'magic',
  CORRECT = 'correct',
  REVEAL = 'reveal',
}

const preload = (assetId: AudioIds, assetPath: string): void => {
  NativeAudio.preload({
    assetId,
    assetPath,
    audioChannelNum: 1,
    isUrl: false,
  });
};

preload(AudioIds.LAUGH, 'public/assets/sounds/laugh.mp3');
preload(AudioIds.CLICK, 'public/assets/sounds/click.mp3');
preload(AudioIds.MAGIC, 'public/assets/sounds/magic.wav');
preload(AudioIds.CORRECT, 'public/assets/sounds/correct.wav');
preload(AudioIds.REVEAL, 'public/assets/sounds/reveal.wav');

const playAudio = (assetId: string): void => {
  NativeAudio.play({ assetId, time: 0 });
};

const AudiService = { playAudio };
export default AudiService;
