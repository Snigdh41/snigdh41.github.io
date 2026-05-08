import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// Mock useScrollReveal
vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}));

// Mock Turnstile
vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }) => (
    <div data-testid="turnstile-mock">
      <button
        type="button"
        onClick={() => onSuccess('mock-token-123')}
        data-testid="turnstile-success-btn"
      >
        Complete Turnstile
      </button>
    </div>
  ),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  const fillFormAndSubmit = async (user, submit = true, completeTurnstile = true) => {
    await user.type(screen.getByLabelText(/Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/What brings you here\?/i), 'Just Vibes ☕');
    await user.type(screen.getByLabelText(/Message/i), 'Hello there!');

    if (completeTurnstile) {
      await user.click(screen.getByTestId('turnstile-success-btn'));
    }

    if (submit) {
      await user.click(screen.getByRole('button', { name: /Send Coffee Chat Request/i }));
    }
  }

  it('renders the CoffeeChatForm correctly', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/What brings you here\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Coffee Chat Request/i })).toBeInTheDocument();
  });

  it('shows error if Turnstile is not completed', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fillFormAndSubmit(user, true, false);

    expect(screen.getByText('Please complete the verification.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles successful form submission', async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Contact />);

    await fillFormAndSubmit(user, true, true);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            intent: 'Just Vibes ☕',
            message: 'Hello there!',
            turnstileToken: 'mock-token-123',
          }),
        })
      );
    });

    await waitFor(() => {
        expect(screen.getByText('Message sent! ☕')).toBeInTheDocument();
    });
  });

  it('handles API error responses', async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, details: ['Invalid email format'] }),
    });

    render(<Contact />);

    // Just fill form normally but mock will return an error
    await fillFormAndSubmit(user, true, true);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    const user = userEvent.setup();
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    render(<Contact />);

    await fillFormAndSubmit(user, true, true);

    await waitFor(() => {
      expect(screen.getByText('Network error. Please check your connection and try again.')).toBeInTheDocument();
    });
  });
});
