import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const LocalizationServiceMock = {
  tSpy: jest.fn((str) => str),
  changeLanguageSpy: jest.fn(
    () =>
      new Promise(() => {
        /** Not empty */
      }),
  ),
  useTranslationSpy: useTranslation as jest.Mock,
};

export default LocalizationServiceMock;
