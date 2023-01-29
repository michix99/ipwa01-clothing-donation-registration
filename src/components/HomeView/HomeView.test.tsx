import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocalizationServiceMock from '../../mocks/LocalizationServiceMock';
import HomeView from './HomeView';

describe('HomeView', () => {
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

  test('should set the document title', () => {
    render(<HomeView />, { wrapper: MemoryRouter });
    expect(document.title).toContain('Sock Savior');
  });
});
