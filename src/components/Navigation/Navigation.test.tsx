import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Navigation', () => {
  const mockChangeLanguage = jest.fn();
  const useTranslationMock = useTranslation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en',
      },
    });
  });

  test('should include navbar', () => {
    const result = render(<Navigation></Navigation>, { wrapper: MemoryRouter });

    const navElement = result.container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  test('should switch language', () => {
    render(<Navigation />, {
      wrapper: MemoryRouter,
    });

    const languageSelection = screen.getByTestId('de-selection');
    fireEvent.click(languageSelection);
    expect(mockChangeLanguage).toHaveBeenCalledWith('de');
  });
});
