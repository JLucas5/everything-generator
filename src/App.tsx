import { useState } from 'react';
import './App.css';
import firstNamesData from './names/firstNames.json';
import middleNamesData from './names/middleNames.json';
import lastNamesData from './names/lastNames.json';

const firstNames: string[] = firstNamesData as string[];
const middleNames: string[] = middleNamesData as string[];
const lastNames: string[] = lastNamesData as string[];

function getRandom(arr: string[]) {
  // Always return a value, even if the array is empty
  if (arr.length === 0) {
    return '[MISSING]';
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function App() {
  const [generatedName, setGeneratedName] = useState('');

  const handleGenerate = () => {
    const first = getRandom(firstNames);
    const middle = getRandom(middleNames);
    const last = getRandom(lastNames);
    setGeneratedName(`${first} ${middle} ${last}`);
  };

  return (
    <div>
      <h1>Welcome to Vibe Project</h1>
      <button onClick={handleGenerate}>Generate name</button>
      {generatedName && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{generatedName}</p>
      )}
    </div>
  );
}

export default App;
