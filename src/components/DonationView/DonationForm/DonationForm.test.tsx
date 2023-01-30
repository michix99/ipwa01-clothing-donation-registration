import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { DonationData, FromHomeDonationData } from '../../../models';
import HelperService from '../../../services/HelperService';
import DonationForm from './DonationForm';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('../../../services/HelperService', () => ({
  validateAgainstSchema: jest.fn(),
}));

const mockSuccessComponent = jest.fn();
jest.mock('./DonationSuccessView/DonationSuccessView', () => {
  const successComponent = (props: {
    formData: DonationData | FromHomeDonationData;
  }) => {
    mockSuccessComponent(props);
    return <div></div>;
  };
  return successComponent;
});

jest.mock('./FromHomeDonationControls/FromHomeDonationControls', () => {
  const controlsComponent = (props: {
    onControlChange: ChangeEventHandler<HTMLInputElement>;
    validationErrors: Record<string, { key: string }[]>;
  }) => {
    return (
      <div>
        <button
          onClick={() =>
            props.onControlChange({
              target: { name: 'testControl', value: 'dummyValue' },
            } as ChangeEvent<HTMLInputElement>)
          }
          data-testid="control-change"
        >
          Trigger Control Change
        </button>
      </div>
    );
  };
  return controlsComponent;
});

describe('DonationForm', () => {
  const useTranslationMock = useTranslation as jest.Mock;
  const validateAgainstSchemaSpy =
    HelperService.validateAgainstSchema as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str, option?: { returnObjects: boolean }) => {
        if (str === 'crisisAreas') {
          return ['Area 1', 'Area 2', 'Area 3'];
        } else if (str === 'clothCategories') {
          return ['Category 1', 'Category 2', 'Category 3'];
        }

        return option?.returnObjects ? new Array(str) : str;
      }),
      i18n: {
        language: 'en',
      },
    });
  });

  test('should provide a form for donation at the local office and parse the\
  data after successful validation to child component', async () => {
    validateAgainstSchemaSpy.mockReturnValue({});

    const result = render(<DonationForm isCollected={false} />, {
      wrapper: MemoryRouter,
    });

    // Select third element for crisis area
    const areaSelectElement = screen.getByTestId('crisis-area-select');
    fireEvent.change(areaSelectElement, {
      target: { value: 'Area 3', name: 'crisisArea' },
    });

    // Select first element for cloth category
    const clothSelectElement = result.container.querySelector(
      '#cloth-category-select',
    );
    fireEvent.keyDown((clothSelectElement as Element).firstChild as ChildNode, {
      key: 'ArrowDown',
    });
    await waitFor(() => screen.getByText('Category 1'));
    fireEvent.click(screen.getByText('Category 1'));

    // Trigger form submit
    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    // Check that form data is correctly given to child component
    await waitFor(() => {
      expect(mockSuccessComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          formData: { clothCategories: [0], crisisArea: 2 },
        }),
      );
    });
  });

  test('should provide a form for donation at home and parse the\
  data after successful validation to child component', async () => {
    validateAgainstSchemaSpy.mockReturnValue({});

    const result = render(<DonationForm isCollected={true} />, {
      wrapper: MemoryRouter,
    });

    // Select third element for crisis area
    const areaSelectElement = screen.getByTestId('crisis-area-select');
    fireEvent.change(areaSelectElement, {
      target: { value: 'Area 3', name: 'crisisArea' },
    });

    // Select first element for cloth category
    const clothSelectElement = result.container.querySelector(
      '#cloth-category-select',
    );
    fireEvent.keyDown((clothSelectElement as Element).firstChild as ChildNode, {
      key: 'ArrowDown',
    });
    await waitFor(() => screen.getByText('Category 1'));
    fireEvent.click(screen.getByText('Category 1'));

    // Trigger control change coming from child component
    const buttonChildComponentElement = screen.getByTestId('control-change');
    fireEvent.click(buttonChildComponentElement);

    // Trigger form submit
    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    // Check that form data is correctly given to success child component
    await waitFor(() => {
      expect(mockSuccessComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          formData: {
            clothCategories: [0],
            crisisArea: 2,
            testControl: 'dummyValue',
          },
        }),
      );
    });
  });

  test('should render validation errors', async () => {
    validateAgainstSchemaSpy.mockReturnValue({
      crisisArea: [{ key: 'myError' }],
      clothCategories: [{ key: 'myError2' }],
    });

    const result = render(<DonationForm isCollected={true} />, {
      wrapper: MemoryRouter,
    });

    // Select third element for crisis area
    const areaSelectElement = screen.getByTestId('crisis-area-select');
    fireEvent.change(areaSelectElement, {
      target: { value: 'Area 3', name: 'crisisArea' },
    });

    // Select first element for cloth category
    const clothSelectElement = result.container.querySelector(
      '#cloth-category-select',
    );
    fireEvent.keyDown((clothSelectElement as Element).firstChild as ChildNode, {
      key: 'ArrowDown',
    });
    await waitFor(() => screen.getByText('Category 1'));
    fireEvent.click(screen.getByText('Category 1'));

    // Trigger form submit
    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    // Check that validation errors are being displayed
    await waitFor(() => {
      expect(screen.getByText('myError')).toBeInTheDocument();
      expect(screen.getByText('myError2')).toBeInTheDocument();
    });
  });
});
