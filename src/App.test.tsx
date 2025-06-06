import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import { nameGenerationOptions } from './nameGenerationOptions';

// Clean up after each test
afterEach(cleanup);

describe('App Component', () => {
  test('renders welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to Vibe Project/i);
    expect(welcomeElement).toBeDefined();
  });

  test('renders name type selector', () => {
    render(<App />);
    const labelElement = screen.getByLabelText(/Choose name type:/i);
    expect(labelElement).toBeDefined();
  });

  test('selector contains all name generation options', () => {
    render(<App />);
    const selector = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    
    // Check if all options are rendered
    expect(options.length).toBe(nameGenerationOptions.length);
    
    // Check if each option has correct text and value
    nameGenerationOptions.forEach((opt) => {
      const option = screen.getByRole('option', { name: opt.label });
      expect(option.getAttribute('value')).toBe(opt.value);
    });
  });

  test('first option is selected by default', () => {
    render(<App />);
    const selector = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selector.value).toBe(nameGenerationOptions[0].value);
  });

  test('changing selection updates the selected value', () => {
    render(<App />);
    const selector = screen.getByRole('combobox');
    
    // Change to cat names
    fireEvent.change(selector, { target: { value: 'cat' } });
    expect((selector as HTMLSelectElement).value).toBe('cat');
    
    // Change to dog names
    fireEvent.change(selector, { target: { value: 'dog' } });
    expect((selector as HTMLSelectElement).value).toBe('dog');
  });

  test('NameGenerator component is rendered and contains generate button', () => {
    render(<App />);
    const selector = screen.getByRole('combobox');
    
    // The generate button should be present with default selection
    const generateButton = screen.getByRole('button', { name: /generate name/i });
    expect(generateButton).toBeDefined();
    
    // Change selection and verify button is still present
    fireEvent.change(selector, { target: { value: 'cat' } });
    expect(screen.getByRole('button', { name: /generate name/i })).toBeDefined();
  });

  test('generates name when button is clicked', () => {
    render(<App />);
    const generateButton = screen.getByRole('button', { name: /generate name/i });
    
    // Click the generate button
    fireEvent.click(generateButton);
    
    // Check if a name is generated (there should be a paragraph element with text)
    const paragraphs = screen.getAllByText(/.+/, { selector: 'p' });
    expect(paragraphs.length).toBeGreaterThan(0);
    expect(paragraphs[paragraphs.length - 1].tagName.toLowerCase()).toBe('p');
  });
}); 