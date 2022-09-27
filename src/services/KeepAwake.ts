import { IsSupportedResult, KeepAwake } from '@capacitor-community/keep-awake';

const keepAwake = (): void => {
  isSupported().then((result: IsSupportedResult): void => {
    if (result.isSupported) {
      KeepAwake.keepAwake();
    }
  });
};

const allowSleep = (): void => {
  isSupported().then((result: IsSupportedResult): void => {
    if (result.isSupported) {
      KeepAwake.allowSleep();
    }
  });
};

const isSupported = (): Promise<IsSupportedResult> => {
  return KeepAwake.isSupported();
};

const KeepAwakeService = { keepAwake, allowSleep, isSupported };

export default KeepAwakeService;
