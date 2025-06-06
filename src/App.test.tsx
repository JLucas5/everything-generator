import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';
import { ToastProvider } from './components/ToastService';

// Clean up after each test
afterEach(cleanup);

const renderWithToast = (component: React.ReactNode) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('App Component', () => {
  test('renders title and name generator', () => {
    renderWithToast(<App />);
    const titleElement = screen.getByText(/Castle Names Generator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders name generator options in sidebar', () => {
    renderWithToast(<App />);
    const options = Array.from(screen.getAllByRole('button')).filter(button =>
      button.className.includes('option-button')
    );
    expect(options[0]).toHaveTextContent('Castle Names');
    expect(options[1]).toHaveTextContent('Cat Names');
    expect(options[2]).toHaveTextContent('City Names');
  });

  test('renders name count selector', () => {
    renderWithToast(<App />);
    const selector = screen.getByLabelText('Number of names to generate');
    expect(selector).toBeInTheDocument();
    expect(selector.tagName.toLowerCase()).toBe('select');
  });

  test('changes generator type when sidebar option is clicked', () => {
    renderWithToast(<App />);
    
    // Initially should show Castle Names (first alphabetically)
    expect(screen.getByText(/Castle Names Generator/i)).toBeInTheDocument();
    
    // Click Human Names button
    const humanButton = screen.getByText('Human Names');
    fireEvent.click(humanButton);
    
    // Should now show Human Names
    expect(screen.getByText(/Human Names Generator/i)).toBeInTheDocument();
  });

  test('generates names when button is clicked', () => {
    renderWithToast(<App />);
    const generateButton = screen.getByText('Generate names');
    fireEvent.click(generateButton);
    // Names should be generated and displayed
  });

  test('mobile menu toggle functionality', () => {
    renderWithToast(<App />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const sidebar = screen.getByTestId('sidebar');
    
    // Initially closed
    expect(sidebar.className).not.toContain('open');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(sidebar.className).toContain('open');
    
    // Close menu
    fireEvent.click(menuButton);
    expect(sidebar.className).not.toContain('open');
  });

  test('mobile menu closes when option selected', () => {
    renderWithToast(<App />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const sidebar = screen.getByTestId('sidebar');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(sidebar.className).toContain('open');
    
    // Click an option
    const humanButton = screen.getByText('Human Names');
    fireEvent.click(humanButton);
    
    // Menu should close
    expect(sidebar.className).not.toContain('open');
  });

  test('search input filters name generators', () => {
    renderWithToast(<App />);
    const searchInput = screen.getByPlaceholderText('Search generators...');
    
    // Type "human" in search
    fireEvent.change(searchInput, { target: { value: 'human' } });
    
    // Should only show Human Names
    const options = Array.from(screen.getAllByRole('button')).filter(button =>
      button.className.includes('option-button')
    );
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Human Names');
  });

  test('search is case insensitive', () => {
    renderWithToast(<App />);
    const searchInput = screen.getByPlaceholderText('Search generators...');
    
    // Type "HUMAN" in search (uppercase)
    fireEvent.change(searchInput, { target: { value: 'HUMAN' } });
    
    // Should still find Human Names
    const options = Array.from(screen.getAllByRole('button')).filter(button =>
      button.className.includes('option-button')
    );
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('Human Names');
  });
}); 