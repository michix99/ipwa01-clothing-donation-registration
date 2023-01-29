import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocalizationServiceMock from '../../mocks/LocalizationServiceMock';
import Navigation from './Navigation';

describe('Navigation', () => {
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
    expect(LocalizationServiceMock.changeLanguageSpy).toHaveBeenCalledWith(
      'de',
    );
  });
});
