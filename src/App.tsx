import { useState } from 'react';
import './App.css';
import { nameGenerationOptions } from './nameGenerationOptions';
import NameGenerator from './components/NameGenerator';
import { ToastProvider } from './components/ToastService';

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
	const [searchTerm, setSearchTerm] = useState('');

	const handleOptionClick = (value: string) => {
		setSelectedOption(value);
		setIsMobileMenuOpen(false); // Close menu after selection on mobile
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const filteredOptions = nameGenerationOptions.filter(opt =>
		opt.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectedGroups =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)
			?.getGroups() || [];

	const selectedLabel =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)?.label || '';

	return (
		<ToastProvider>
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
				<aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`} data-testid="sidebar">
					<h2>Name Generators</h2>
					<div className="search-container">
						<input
							type="text"
							placeholder="Search generators..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
							aria-label="Search name generators"
						/>
					</div>
					<div className="generator-options">
						{filteredOptions.map((opt) => (
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
		</ToastProvider>
	);
}

export default App;
