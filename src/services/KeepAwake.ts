import { KeepAwake } from '@capacitor-community/keep-awake';

const keepAwake = async (): Promise<void> => {
  return KeepAwake.keepAwake();
};

const allowSleep = async (): Promise<void> => {
  return KeepAwake.allowSleep();
};

const KeepAwakeService = { keepAwake, allowSleep };

export default KeepAwakeService;
