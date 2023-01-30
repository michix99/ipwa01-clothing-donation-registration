import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { PackageInformation } from '../../models';
import Footer from './Footer';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('../../../package.json', () => {
  const packageVersion: PackageInformation = {
    version: 'X.Y.Z',
  };
  return packageVersion;
});

describe('Footer', () => {
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

  test('should include the footer', () => {
    render(<Footer />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('package-version').textContent).toContain(
      'X.Y.Z',
    );
  });

  test('should scroll to top on click', () => {
    window.scrollTo = jest.fn();
    render(<Footer />, { wrapper: MemoryRouter });
    window.scrollY = 100;
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    const button = screen.getByTestId('back-to-top');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(button.style.display).toBe('block');
  });

  test('should not display scroll button, if page is not scrolled', () => {
    window.scrollTo = jest.fn();
    render(<Footer />, { wrapper: MemoryRouter });
    window.scrollY = 0;
    fireEvent.scroll(window, { target: { scrollY: 0 } });

    const button = screen.getByTestId('back-to-top');
    expect(button.style.display).toBe('none');
  });
});
