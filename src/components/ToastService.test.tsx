import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ToastProvider, useToast } from './ToastService';

// Mock timers for toast duration
vi.useFakeTimers();

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
});

// Test component that uses the toast hook
function TestComponent({ message }: { message: string }) {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast(message)} data-testid="toast-trigger">
      Show Toast
    </button>
  );
}

describe('ToastService', () => {
  it('shows a toast message when triggered', () => {
    render(
      <ToastProvider>
        <TestComponent message="Test toast" />
      </ToastProvider>
    );

    const button = screen.getByTestId('toast-trigger');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Test toast')).toBeInTheDocument();
  });

  it('removes toast after duration', () => {
    render(
      <ToastProvider>
        <TestComponent message="Test toast" />
      </ToastProvider>
    );

    const button = screen.getByTestId('toast-trigger');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Test toast')).toBeInTheDocument();

    // Fast forward past the toast duration
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Test toast')).not.toBeInTheDocument();
  });

  it('can show multiple toasts', () => {
    render(
      <ToastProvider>
        <TestComponent message="First toast" />
        <TestComponent message="Second toast" />
      </ToastProvider>
    );

    const buttons = screen.getAllByTestId('toast-trigger');
    
    act(() => {
      buttons[0].click();
      buttons[1].click();
    });

    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
  });

  it('removes toasts in order', () => {
    render(
      <ToastProvider>
        <TestComponent message="First toast" />
        <TestComponent message="Second toast" />
      </ToastProvider>
    );

    const buttons = screen.getAllByTestId('toast-trigger');
    
    act(() => {
      buttons[0].click();
      // Wait a bit before showing second toast
      vi.advanceTimersByTime(1000);
      buttons[1].click();
    });

    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();

    // Fast forward to remove first toast
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('First toast')).not.toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();

    // Fast forward to remove second toast
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Second toast')).not.toBeInTheDocument();
  });

  it('throws error when useToast is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent message="Test toast" />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    consoleError.mockRestore();
  });
}); 