import { useState } from 'react';
import { useToast } from './ToastService';
import './NameGenerator.css';

interface NameGeneratorProps {
  nameGroups: string[][];
}

function getRandom(arr: string[]) {
  if (arr.length === 0) {
    return '[MISSING]';
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUniqueName(nameGroups: string[][]): string {
  const parts = nameGroups.map(group => getRandom(group));
  return parts.join(' ');
}

function generateUniqueNames(nameGroups: string[][], count: number): string[] {
  const names = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops if unique names are hard to generate

  while (names.size < count && attempts < maxAttempts) {
    names.add(generateUniqueName(nameGroups));
    attempts++;
  }

  return Array.from(names);
}

export default function NameGenerator({ nameGroups }: NameGeneratorProps) {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameCount, setNameCount] = useState(1);
  const { showToast } = useToast();

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNameCount(parseInt(e.target.value));
  };

  const handleGenerate = () => {
    const names = generateUniqueNames(nameGroups, nameCount);
    setGeneratedNames(names);
  };

  const handleNameClick = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      showToast('Name copied!');
    } catch (err) {
      showToast('Failed to copy name');
    }
  };

  return (
    <div className="name-generator">
      <div className="generator-controls">
        <select
          value={nameCount}
          onChange={handleCountChange}
          className="name-count-select"
          aria-label="Number of names to generate"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button className="generate-button" onClick={handleGenerate}>
          Generate names
        </button>
      </div>
      {generatedNames.length > 0 && (
        <div className="generated-names-container" data-testid="names-container">
          {generatedNames.map((name, index) => (
            <p 
              key={index} 
              className="generated-name"
              onClick={() => handleNameClick(name)}
              title="Click to copy"
            >
              {name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
