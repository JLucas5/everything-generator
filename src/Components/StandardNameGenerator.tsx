import { useState } from 'react';
import firstNamesData from '../names/firstNames.json';
import middleNamesData from '../names/middleNames.json';
import lastNamesData from '../names/lastNames.json';

const firstNames: string[] = firstNamesData as string[];
const middleNames: string[] = middleNamesData as string[];
const lastNames: string[] = lastNamesData as string[];

function getRandom(arr: string[]) {
  if (arr.length === 0) {
    return '[MISSING]';
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function StandardNameGenerator() {
  const [generatedName, setGeneratedName] = useState('');

  const handleGenerate = () => {
    const first = getRandom(firstNames);
    const middle = getRandom(middleNames);
    const last = getRandom(lastNames);
    setGeneratedName(`${first} ${middle} ${last}`);
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate name</button>
      {generatedName && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{generatedName}</p>
      )}
    </div>
  );
}
