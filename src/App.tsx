import { useState } from 'react';
import './App.css';
import { nameGenerationOptions } from './nameGenerationOptions';
import NameGenerator from './components/NameGenerator';

function capitalizeWords(str: string): string {
	return str.split(' ').map(word => 
		word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	).join(' ');
}

function App() {
	const [selectedOption, setSelectedOption] = useState(
		nameGenerationOptions[0].value
	);

	const handleOptionClick = (value: string) => {
		setSelectedOption(value);
	};

	const selectedGroups =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)
			?.getGroups() || [];

	const selectedLabel =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)?.label || '';

	return (
		<div className="app-container">
			<aside className="sidebar">
				<h2>Name Types</h2>
				<div className="generator-options">
					{nameGenerationOptions.map((opt) => (
						<button
							key={opt.value}
							className={`option-button ${selectedOption === opt.value ? 'active' : ''}`}
							onClick={() => handleOptionClick(opt.value)}
						>
							{capitalizeWords(opt.label)}
						</button>
					))}
				</div>
			</aside>
			<main className="main-content">
				<h1>{capitalizeWords(selectedLabel)} Generator</h1>
				<NameGenerator nameGroups={selectedGroups} />
			</main>
		</div>
	);
}

export default App;
