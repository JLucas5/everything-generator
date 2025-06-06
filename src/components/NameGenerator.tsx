import { useState } from 'react';

interface NameGeneratorProps {
  nameGroups: string[][];
}

function getRandom(arr: string[]) {
  if (arr.length === 0) {
    return '[MISSING]';
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function NameGenerator({ nameGroups }: NameGeneratorProps) {
  const [generatedName, setGeneratedName] = useState('');

  const handleGenerate = () => {
    const parts = nameGroups.map(group => getRandom(group));
    setGeneratedName(parts.join(' '));
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
