import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('App', () => {
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

  test('renders navigation element', () => {
    window.scrollTo = function () {
      /** Not empty */
    };

    render(<App />, { wrapper: MemoryRouter });
    const navElement = screen.getByText(/Sock Savior/i);
    expect(navElement).toBeInTheDocument();
  });

  test('renders footer element', () => {
    window.scrollTo = function () {
      /** Not empty */
    };

    render(<App />, { wrapper: MemoryRouter });
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
