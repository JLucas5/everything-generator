import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NameGenerator from './NameGenerator';
import { ToastProvider } from './ToastService';

// Mock clipboard API
const mockClipboard = {
  writeText: vi.fn(),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true
});

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const renderWithToast = (component: React.ReactNode) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('NameGenerator', () => {
  const mockGroups = [
    ['Alice', 'Bob'],
    ['Marie', 'James'],
    ['Smith', 'Johnson']
  ];

  it('renders the generate button', () => {
    renderWithToast(<NameGenerator nameGroups={mockGroups} />);
    expect(screen.getByText(/generate names/i)).toBeInTheDocument();
  });

  it('generates a name when the button is clicked', () => {
    renderWithToast(<NameGenerator nameGroups={mockGroups} />);
    const button = screen.getByText(/generate names/i);
    fireEvent.click(button);
    // The generated name should be a combination of one from each group
    const regex = /^(Alice|Bob) (Marie|James) (Smith|Johnson)$/;
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  it('shows [MISSING] if a group is empty', () => {
    const groupsWithEmpty = [[], ['Marie'], ['Smith']];
    renderWithToast(<NameGenerator nameGroups={groupsWithEmpty} />);
    fireEvent.click(screen.getByText(/generate names/i));
    expect(screen.getByText("[MISSING] Marie Smith")).toBeInTheDocument();
  });

  it('generates multiple names when count is changed', () => {
    renderWithToast(<NameGenerator nameGroups={mockGroups} />);
    
    // Change count to 3
    const select = screen.getByLabelText(/Number of names to generate/i);
    fireEvent.change(select, { target: { value: '3' } });
    
    // Generate names
    fireEvent.click(screen.getByText(/generate names/i));
    
    // Check if 3 names are generated
    const regex = /^(Alice|Bob) (Marie|James) (Smith|Johnson)$/;
    const names = screen.getAllByText(regex);
    expect(names).toHaveLength(3);
  });

  describe('Clipboard functionality', () => {
    it('copies name to clipboard when clicked', async () => {
      mockClipboard.writeText.mockResolvedValueOnce(undefined);
      renderWithToast(<NameGenerator nameGroups={mockGroups} />);
      
      // Generate a name
      fireEvent.click(screen.getByText(/generate names/i));
      
      // Get the generated name
      const nameElement = screen.getByText(/^(Alice|Bob) (Marie|James) (Smith|Johnson)$/);
      const generatedName = nameElement.textContent || '';
      
      // Click the name to copy
      fireEvent.click(nameElement);
      
      // Check clipboard operation and toast
      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith(generatedName);
        expect(screen.getByText('Name copied!')).toBeInTheDocument();
      });
    });

    it('shows error toast when clipboard fails', async () => {
      // Mock clipboard failure
      mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));
      
      renderWithToast(<NameGenerator nameGroups={mockGroups} />);
      
      // Generate and click a name
      fireEvent.click(screen.getByText(/generate names/i));
      const nameElement = screen.getByText(/^(Alice|Bob) (Marie|James) (Smith|Johnson)$/);
      fireEvent.click(nameElement);
      
      // Check error toast
      await waitFor(() => {
        expect(screen.getByText('Failed to copy name')).toBeInTheDocument();
      });
    });

    it('copies correct name when multiple names are generated', async () => {
      mockClipboard.writeText.mockResolvedValueOnce(undefined);
      renderWithToast(<NameGenerator nameGroups={mockGroups} />);
      
      // Generate 3 names
      const select = screen.getByLabelText(/Number of names to generate/i);
      fireEvent.change(select, { target: { value: '3' } });
      fireEvent.click(screen.getByText(/generate names/i));
      
      // Get all generated names
      const names = screen.getAllByText(/^(Alice|Bob) (Marie|James) (Smith|Johnson)$/);
      expect(names).toHaveLength(3);
      
      // Click the second name
      const secondName = names[1].textContent || '';
      fireEvent.click(names[1]);
      
      // Verify the correct name was copied
      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith(secondName);
        expect(screen.getByText('Name copied!')).toBeInTheDocument();
      });
    });

    it('shows tooltip on hover', () => {
      renderWithToast(<NameGenerator nameGroups={mockGroups} />);
      
      // Generate a name
      fireEvent.click(screen.getByText(/generate names/i));
      
      // Find the name element
      const nameElement = screen.getByText(/^(Alice|Bob) (Marie|James) (Smith|Johnson)$/);
      
      // Check tooltip
      expect(nameElement).toHaveAttribute('title', 'Click to copy');
    });
  });
});
