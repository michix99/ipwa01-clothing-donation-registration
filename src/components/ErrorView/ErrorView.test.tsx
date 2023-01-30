import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorView from './ErrorView';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}));

describe('ErrorView', () => {
  const useRouteErrorSpy = useRouteError as jest.Mock;
  const useTranslationMock = useTranslation as jest.Mock;
  const isRouteErrorResponseSpy = isRouteErrorResponse as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        language: 'en',
      },
    });
  });

  test('should render a route error', () => {
    useRouteErrorSpy.mockReturnValue({
      status: '400',
      statusText: 'Bad Request',
      data: {
        message: 'This request was invalid',
      },
    });
    isRouteErrorResponseSpy.mockReturnValue(true);

    render(<ErrorView />);
    expect(screen.getByText('400')).toBeInTheDocument();
    expect(screen.getByText('Bad Request')).toBeInTheDocument();
    expect(screen.getByText('This request was invalid')).toBeInTheDocument();
  });

  test('should render a default error, if no route error was provided', () => {
    useRouteErrorSpy.mockReturnValue({
      status: 'wrong',
    });
    isRouteErrorResponseSpy.mockReturnValue(false);

    render(<ErrorView />);
    expect(screen.queryByText('wrong')).toBeNull();
    expect(screen.getByText('errorOccured')).toBeInTheDocument();
  });
});
