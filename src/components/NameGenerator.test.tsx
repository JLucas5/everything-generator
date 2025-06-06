import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NameGenerator from './NameGenerator';

// Ensure the DOM is cleaned up after each test
afterEach(() => {
  cleanup();
});

describe('NameGenerator', () => {
  const mockGroups = [
    ['Alice', 'Bob'],
    ['Marie', 'James'],
    ['Smith', 'Johnson']
  ];

  it('renders the generate button', () => {
    render(<NameGenerator nameGroups={mockGroups} />);
    expect(screen.getAllByText(/generate name/i)[0]).toBeInTheDocument();
  });

  it('generates a name when the button is clicked', () => {
    render(<NameGenerator nameGroups={mockGroups} />);
    const button = screen.getAllByText(/generate name/i)[0];
    fireEvent.click(button);
    // The generated name should be a combination of one from each group
    const regex = /^(Alice|Bob) (Marie|James) (Smith|Johnson)$/;
    expect(screen.getByText(regex)).toBeInTheDocument();
  });

  it('shows [MISSING] if a group is empty', () => {
    const groupsWithEmpty = [[], ['Marie'], ['Smith']];
    render(<NameGenerator nameGroups={groupsWithEmpty} />);
    fireEvent.click(screen.getAllByText(/generate name/i)[0]);
    expect(screen.getByText("[MISSING] Marie Smith")).toBeInTheDocument();
  });
});
