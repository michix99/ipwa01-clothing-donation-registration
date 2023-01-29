import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import LocalizationServiceMock from './mocks/LocalizationServiceMock';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    LocalizationServiceMock.useTranslationSpy.mockReturnValue({
      t: LocalizationServiceMock.tSpy,
      i18n: {
        changeLanguage: LocalizationServiceMock.changeLanguageSpy,
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
