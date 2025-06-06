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
    const titleElement = screen.getByText(/Human Names Generator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders name generator options in sidebar', () => {
    renderWithToast(<App />);
    expect(screen.getByText('Name Generators')).toBeInTheDocument();
    expect(screen.getByText('Human Names')).toBeInTheDocument();
    expect(screen.getByText('Cat Names')).toBeInTheDocument();
    expect(screen.getByText('Dog Names')).toBeInTheDocument();
  });

  test('renders name count selector', () => {
    renderWithToast(<App />);
    const selector = screen.getByLabelText(/Number of names to generate/i);
    expect(selector).toBeInTheDocument();
    
    // Check if selector has correct options (1-10)
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(10);
    options.forEach((opt, idx) => {
      expect(opt.getAttribute('value')).toBe((idx + 1).toString());
    });
  });

  test('changes generator type when sidebar option is clicked', () => {
    renderWithToast(<App />);
    
    // Initially should show Human Names
    expect(screen.getByText(/Human Names Generator/i)).toBeInTheDocument();
    
    // Click Cat Names button
    const catButton = screen.getByText('Cat Names');
    fireEvent.click(catButton);
    
    // Should update to Cat Names
    expect(screen.getByText(/Cat Names Generator/i)).toBeInTheDocument();
  });

  test('generates names when button is clicked', () => {
    renderWithToast(<App />);
    const generateButton = screen.getByText(/generate names/i);
    expect(generateButton).toBeInTheDocument();
    
    // Click generate
    fireEvent.click(generateButton);
    
    // Should show at least one name
    const namesContainer = screen.getByTestId('names-container');
    expect(namesContainer).toBeInTheDocument();
    expect(namesContainer.textContent).not.toBe('');
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
    const catButton = screen.getByText('Cat Names');
    fireEvent.click(catButton);
    
    // Menu should close
    expect(sidebar.className).not.toContain('open');
  });
}); 