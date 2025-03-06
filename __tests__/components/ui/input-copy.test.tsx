import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputCopy from '@/components/ui/input-copy';

vi.mock('sonner', () => ({
  toast: vi.fn()
}));

const clipboardWriteText = vi.fn();
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: clipboardWriteText
  },
  writable: true
});

describe('InputCopy component', () => {
  const toastMessage = 'Copied!';
  const ToastIcon = <span>Icon</span>;
  const buttonText = 'Copy URL';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button elements', () => {
    render(
      <InputCopy
        toastMessage={toastMessage}
        ToastIcon={ToastIcon}
        inputProps={{ placeholder: 'Copy URL', value: 'http://example.com' }}
        buttonText={buttonText}
      />
    );

    const input = screen.getByPlaceholderText('Copy URL') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Copy URL' });
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('http://example.com');
    expect(button).toBeInTheDocument();
  });

  it('copies input value to clipboard and calls toast on button click', async () => {
    const { toast } = await import('sonner');
    render(
      <InputCopy
        toastMessage={toastMessage}
        ToastIcon={ToastIcon}
        inputProps={{ placeholder: 'Copy URL', value: 'http://example.com' }}
        buttonText={buttonText}
      />
    );

    const button = screen.getByRole('button', { name: 'Copy URL' });
    const input = screen.getByPlaceholderText('Copy URL') as HTMLInputElement;

    input.select = vi.fn();
    input.setSelectionRange = vi.fn();

    await userEvent.click(button);

    expect(input.select).toHaveBeenCalled();
    expect(input.setSelectionRange).toHaveBeenCalledWith(0, 99999);

    expect(clipboardWriteText).toHaveBeenCalledWith('http://example.com');

    expect(toast).toHaveBeenCalledWith(toastMessage, { icon: ToastIcon });
  });

  it('does not copy or call toast if input value is empty', async () => {
    const { toast } = await import('sonner');
    render(
      <InputCopy
        toastMessage={toastMessage}
        ToastIcon={ToastIcon}
        inputProps={{ placeholder: 'Copy URL', value: '' }}
        buttonText={buttonText}
      />
    );

    const button = screen.getByRole('button', { name: 'Copy URL' });
    const input = screen.getByPlaceholderText('Copy URL') as HTMLInputElement;

    input.select = vi.fn();
    input.setSelectionRange = vi.fn();

    await userEvent.click(button);

    expect(input.select).toHaveBeenCalled();
    expect(input.setSelectionRange).toHaveBeenCalledWith(0, 99999);
    expect(clipboardWriteText).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });
});