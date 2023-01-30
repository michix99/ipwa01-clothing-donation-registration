import { render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import HomeView from './HomeView';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('HomeView', () => {
  const useTranslationMock = useTranslation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str, option?: { returnObjects: boolean }) => {
        return option?.returnObjects ? new Array(str) : str;
      }),
      i18n: {
        language: 'en',
      },
    });
  });

  test('should set the document title', () => {
    render(<HomeView />, { wrapper: MemoryRouter });
    expect(document.title).toContain('Sock Savior - homePage');
  });
});
