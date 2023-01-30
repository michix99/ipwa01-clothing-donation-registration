import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import FromHomeDonationControls from './FromHomeDonationControls';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('FromHomeDonationControls', () => {
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

  test('should send control change events to parent component', async () => {
    const validationErrors = {};
    const mockOnControlChange = jest.fn().mockImplementation((event) => {
      // Should match changes
      expect(event.target.name).toBe('firstName');
      expect(event.target.value).toBe('new name');
    });

    render(
      <FromHomeDonationControls
        validationErrors={validationErrors}
        onControlChange={mockOnControlChange}
      />,
    );

    // Change first name
    const firstNameElement = screen.getByPlaceholderText(
      'firstNamePlaceholder',
    );
    fireEvent.change(firstNameElement, {
      target: { name: 'firstName', value: 'new name' },
    });
    await waitFor(() => {
      expect(mockOnControlChange).toHaveBeenCalled();
    });
  });

  test('should render validation errors', () => {
    const validationErrors = {
      crisisArea: [{ key: 'crisisAreaError' }],
      clothCategories: [{ key: 'clothCategoriesError' }],
      firstName: [{ key: 'firstNameError' }],
      lastName: [{ key: 'lastNameError' }],
      street: [{ key: 'streetError' }],
      houseNumber: [{ key: 'houseNumberError' }],
      postcode: [{ key: 'addressInvalid' }, { key: 'anotherPostcodeError' }],
      city: [{ key: 'cityError' }],
    };
    const mockOnControlChange = jest.fn();

    render(
      <FromHomeDonationControls
        validationErrors={validationErrors}
        onControlChange={mockOnControlChange}
      />,
    );

    expect(screen.getByText('firstNameError')).toBeInTheDocument();
    expect(screen.getByText('lastNameError')).toBeInTheDocument();
    expect(screen.getByText('streetError')).toBeInTheDocument();
    expect(screen.getByText('houseNumberError')).toBeInTheDocument();
    expect(screen.getByText('anotherPostcodeError')).toBeInTheDocument();
    expect(screen.getByText('cityError')).toBeInTheDocument();
    expect(screen.getByTestId('address-feedback')).toBeInTheDocument();
  });
});
