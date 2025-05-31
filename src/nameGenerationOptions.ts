import humanNamesData from './names/humanNames.json';
import catNamesData from './names/catNames.json';
import dogNamesData from './names/dogNames.json';

export const nameGenerationOptions = [
  {
    label: 'Human name',
    value: 'human',
    getGroups: () => humanNamesData as string[][],
  },
  {
    label: 'Cat names',
    value: 'cat',
    getGroups: () => catNamesData as string[][],
  },
  {
    label: 'Dog names',
    value: 'dog',
    getGroups: () => dogNamesData as string[][],
  }
];
