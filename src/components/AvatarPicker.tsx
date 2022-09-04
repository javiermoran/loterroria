import { IonAvatar } from '@ionic/react';
import { useState } from 'react';

interface AvatarPickerParams {
  onAvatarChange: (avatar: number) => unknown;
}

const AvatarPicker = ({ onAvatarChange }: AvatarPickerParams): JSX.Element => {
  const [selected, setSelected] = useState<number>();
  const avatars = Array.from(Array(12).keys());

  const onSelectAvatar = (avatar: number): void => {
    setSelected(avatar);
    onAvatarChange(avatar);
  };

  return (
    <div className='avatar-picker'>
      {avatars.map((avatar: number): JSX.Element => {
        return (
          <div
            onClick={(): void => onSelectAvatar(avatar)}
            key={avatar}
            className={`avatar-picker__item ${
              avatar === selected ? 'avatar-picker__item--selected' : ''
            }`}
          >
            <IonAvatar>
              <img alt='' src={`/assets/avatars/${avatar}.png`} />
            </IonAvatar>
          </div>
        );
      })}
    </div>
  );
};

export default AvatarPicker;
