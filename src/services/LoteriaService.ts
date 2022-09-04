import { loteriaImages } from '../constants';
import { LoteriaItem } from '../models/LoteriaItem';

interface LoteriaItemSort {
  value: LoteriaItem;
  sort: number;
}

const getLoteriaImages = (): LoteriaItem[] => {
  const loteriaItems = localStorage.getItem('loteriaImages');
  if (loteriaItems !== null) {
    return JSON.parse(loteriaItems);
  } else {
    const img = loteriaImages
      .map(
        (value: LoteriaItem): LoteriaItemSort => ({
          value,
          sort: Math.random(),
        })
      )
      .sort((a: LoteriaItemSort, b: LoteriaItemSort): number => a.sort - b.sort)
      .map(({ value }: LoteriaItemSort): LoteriaItem => value);
    localStorage.setItem('loteriaImages', JSON.stringify(img));
    return img;
  }
};

const next = (): LoteriaItem[] => {
  const loteriaImages = getLoteriaImages();
  if (loteriaImages.length) {
    loteriaImages.pop();
    localStorage.setItem('loteriaImages', JSON.stringify(loteriaImages));
  }
  return loteriaImages;
};

const restart = (): LoteriaItem[] => {
  const img = loteriaImages
    .map(
      (value: LoteriaItem): LoteriaItemSort => ({
        value,
        sort: Math.random(),
      })
    )
    .sort((a: LoteriaItemSort, b: LoteriaItemSort): number => a.sort - b.sort)
    .map(({ value }: LoteriaItemSort): LoteriaItem => value);
  localStorage.setItem('loteriaImages', JSON.stringify(img));
  return img;
};

export { getLoteriaImages, next, restart };
