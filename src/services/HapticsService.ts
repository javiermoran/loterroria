import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const hapticsImpactLight = async (): Promise<void> => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const hapticsImpactMedium = async (): Promise<void> => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const hapticsImpactHeavy = async (): Promise<void> => {
  await Haptics.impact({ style: ImpactStyle.Heavy });
};

const hapticsVibrate = async (): Promise<void> => {
  await Haptics.vibrate({ duration: 500 });
};

const successNotification = async (): Promise<void> => {
  Haptics.notification({ type: NotificationType.Success });
};

export {
  hapticsImpactLight,
  hapticsVibrate,
  successNotification,
  hapticsImpactMedium,
  hapticsImpactHeavy,
};

const HapticsService = {
  hapticsImpactLight,
  hapticsVibrate,
  successNotification,
  hapticsImpactMedium,
  hapticsImpactHeavy,
};
export default HapticsService;
