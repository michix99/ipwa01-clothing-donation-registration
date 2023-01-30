import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import License from './License';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock(
  '../../assets/license.json',
  () => ({
    'ipwa01-clothing-donation-registration@1.0.0': {
      licenses: 'MIT',
      name: 'ipwa01-clothing-donation-registration',
      version: '1.0.0',
      description:
        '<h1 align="center">ipwa01-clothing-donation-registration</h1>',
      path: 'path',
      licenseText:
        '<h1 align="center">ipwa01-clothing-donation-registration</h1>',
      copyright: 'Copyright (c) 2023',
    },
    'ipwa01-clothing-donation-registration-duplicate@1.0.0': {
      licenses: 'UNLICENSED',
      name: 'ipwa01-clothing-donation-registration-duplicate',
      version: '1.0.0',
      description:
        '<h1 align="center">ipwa01-clothing-donation-registration</h1>',
      path: 'path',
      licenseText:
        '<h1 align="center">ipwa01-clothing-donation-registration</h1>',
      copyright: 'Copyright (c) 2023',
    },
  }),
  { virtual: true },
);

describe('License', () => {
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
    render(<License />, { wrapper: MemoryRouter });
    expect(document.title).toContain('Sock Savior - license');
  });

  test('should display licensed libraries', () => {
    render(<License />, { wrapper: MemoryRouter });

    expect(
      screen.queryByText(
        'ipwa01-clothing-donation-registration-duplicate 1.0.0',
      ),
    ).toBeNull();
    expect(
      screen.getByText('ipwa01-clothing-donation-registration 1.0.0'),
    ).toBeInTheDocument();
  });
});
