import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
const changeLanguageSpy = jest.fn(
  () =>
    new Promise(() => {
      /** Not empty */
    }),
);
const useTranslationSpy = useTranslation as jest.Mock;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: changeLanguageSpy,
        language: 'en',
      },
    });
  });

  test('renders navigation element', () => {
    window.HTMLElement.prototype.scrollTo = function () {
      /** Not empty */
    };

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const navElement = screen.getByText(/Sock Savior/i);
    expect(navElement).toBeInTheDocument();
  });
});
