import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from '@/components/ui/submit-button';
import userEvent from '@testing-library/user-event';


describe('SubmitButton component', () => {
  const defaultProps = {
    label: 'Submit',
    loadingLabel: 'Submitting...'
  };

  it('renders with default label when not pending', () => {
    render(<SubmitButton {...defaultProps} />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toBeDisabled();
  });

  it('renders with loading label and disabled state when pending', async () => {
    const fakeAction = async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(2000); // Simulate a network request or some async operation
    }

    render(<form action={fakeAction}>
      <SubmitButton {...defaultProps} />
    </form>);

    const button = screen.getByRole('button');

    await userEvent.click(button)

    expect(button).toHaveTextContent('Submitting...');
    expect(button).toBeDisabled();
  });
});