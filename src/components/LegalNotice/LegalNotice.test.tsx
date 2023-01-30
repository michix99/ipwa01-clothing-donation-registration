import { render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import LegalNotice from './LegalNotice';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('LegalNotice', () => {
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

  test('should set the document title', () => {
    render(<LegalNotice />, { wrapper: MemoryRouter });
    expect(document.title).toContain('Sock Savior - legalNotice');
  });
});
