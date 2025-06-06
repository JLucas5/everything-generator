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
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleOptionClick = (value: string) => {
		setSelectedOption(value);
		setIsMobileMenuOpen(false); // Close menu after selection on mobile
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const selectedGroups =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)
			?.getGroups() || [];

	const selectedLabel =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)?.label || '';

	return (
		<div className="app-container">
			<button 
				className="mobile-menu-toggle" 
				onClick={toggleMobileMenu}
				aria-label="Toggle menu"
				aria-expanded={isMobileMenuOpen}
			>
				<div className="hamburger-icon">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			<aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
				<h2>Name Generators</h2>
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
			{isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
		</div>
	);
}

export default App;
