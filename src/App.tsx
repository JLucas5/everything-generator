import { useState } from 'react';
import './App.css';
import { nameGenerationOptions } from './nameGenerationOptions';
import NameGenerator from './Components/NameGenerator';

function App() {
	const [selectedOption, setSelectedOption] = useState(
		nameGenerationOptions[0].value
	);

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value);
	};

	const selectedGroups =
		nameGenerationOptions.find((opt) => opt.value === selectedOption)
			?.getGroups() || [];

	return (
		<div>
			<h1>Welcome to Vibe Project</h1>
			<label htmlFor="nameType">Choose name type: </label>
			<select id="nameType" value={selectedOption} onChange={handleSelect}>
				{nameGenerationOptions.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{selectedOption && (
				<NameGenerator nameGroups={selectedGroups} />
			)}
		</div>
	);
}

export default App;
