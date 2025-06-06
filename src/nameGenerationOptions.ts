import humanNamesData from './names/humanNames.json';
import catNamesData from './names/catNames.json';
import dogNamesData from './names/dogNames.json';
import elfNamesData from './names/elfNames.json';
import dwarfNamesData from './names/dwarfNames.json';
import orcNamesData from './names/orcNames.json';
import cityNamesData from './names/cityNames.json';
import countryNamesData from './names/countryNames.json';
import geographicNamesData from './names/geographicNames.json';
import castleNamesData from './names/castleNames.json';
import swordNamesData from './names/swordNames.json';
import firearmNamesData from './names/firearmNames.json';
import creatureNamesData from './names/creatureNames.json';

const unsortedOptions = [
  {
    label: 'Human names',
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
  },
  {
    label: 'Elf names',
    value: 'elf',
    getGroups: () => elfNamesData as string[][],
  },
  {
    label: 'Dwarf names',
    value: 'dwarf',
    getGroups: () => dwarfNamesData as string[][],
  },
  {
    label: 'Orc names',
    value: 'orc',
    getGroups: () => orcNamesData as string[][],
  },
  {
    label: 'City names',
    value: 'city',
    getGroups: () => cityNamesData as string[][],
  },
  {
    label: 'Country names',
    value: 'country',
    getGroups: () => countryNamesData as string[][],
  },
  {
    label: 'Geographic names',
    value: 'geographic',
    getGroups: () => geographicNamesData as string[][],
  },
  {
    label: 'Castle names',
    value: 'castle',
    getGroups: () => castleNamesData as string[][],
  },
  {
    label: 'Sword names',
    value: 'sword',
    getGroups: () => swordNamesData as string[][],
  },
  {
    label: 'Firearm names',
    value: 'firearm',
    getGroups: () => firearmNamesData as string[][],
  },
  {
    label: 'Dragon names',
    value: 'dragon',
    getGroups: () => [creatureNamesData[0]] as string[][],
  },
  {
    label: 'Demon names',
    value: 'demon',
    getGroups: () => [creatureNamesData[2]] as string[][],
  }
];

export const nameGenerationOptions = unsortedOptions.sort((a, b) => 
  a.label.localeCompare(b.label)
);
