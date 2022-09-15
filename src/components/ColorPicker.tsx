import { useState } from 'react';
import { colors } from '../constants';
import AudioService, { AudioIds } from '../services/AudioService';

interface ColorPickerParams {
  onColorChange: (color: string) => unknown;
}

const ColorPicker = ({ onColorChange }: ColorPickerParams): JSX.Element => {
  const [selected, setSelected] = useState<string | null>(null);

  const renderColorItem = (color: string): JSX.Element => {
    return (
      <div
        key={color}
        className={`color-item ${
          color === selected ? 'color-item--selected' : ''
        }`}
        onClick={(): void => {
          AudioService.playAudio(AudioIds.CLICK);
          setSelected(color);
          onColorChange(color);
        }}
        style={{ backgroundColor: color }}
      ></div>
    );
  };

  return (
    <div className='color-picker'>
      {colors.map((color: string): JSX.Element => renderColorItem(color))}
    </div>
  );
};

export default ColorPicker;
