import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Footer', () => {
  const useTranslationMock = useTranslation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        language: 'en',
      },
    });
  });

  test('should include the footer', () => {
    render(<Footer />, { wrapper: MemoryRouter });

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('should scroll to top on click', () => {
    window.scrollTo = jest.fn();
    render(<Footer />, { wrapper: MemoryRouter });
    window.scrollY = 100;
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const button = screen.getByTestId('back-to-top');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(button.style.display).toBe('block');
  });

  test('should not display scroll button, if page is not scrolled', () => {
    window.scrollTo = jest.fn();
    render(<Footer />, { wrapper: MemoryRouter });
    window.scrollY = 0;
    fireEvent.scroll(window, { target: { scrollY: 0 } });

    const button = screen.getByTestId('back-to-top');
    expect(button.style.display).toBe('none');
  });
});
