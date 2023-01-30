import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { DonationData, FromHomeDonationData } from '../../../../models';
import DonationSuccessView from './DonationSuccessView';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('DonationSuccessView', () => {
  const useTranslationMock = useTranslation as jest.Mock;
  let tSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    tSpy = jest.fn((str, option?: { returnObjects: boolean }) => {
      if (str === 'crisisAreas') {
        return ['Area 1', 'Area 2', 'Area 3'];
      } else if (str === 'clothCategories') {
        return ['Category 1', 'Category 2', 'Category 3'];
      }

      return option?.returnObjects ? new Array(str) : str;
    });

    useTranslationMock.mockReturnValue({
      t: tSpy,
      i18n: {
        language: 'de',
      },
    });
  });

  test('should display submitted data (type Donation Data)', () => {
    const formData: DonationData = {
      crisisArea: 1,
      clothCategories: [1, 2],
    };

    render(<DonationSuccessView formData={formData} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText('Category 2, Category 3')).toBeInTheDocument();
    expect(screen.getByText('Area 2')).toBeInTheDocument();
  });

  test('should display submitted data (type From Home Donation Data)', () => {
    const formData: FromHomeDonationData = {
      crisisArea: 1,
      clothCategories: [1, 2],
      firstName: 'First',
      lastName: 'Last',
      street: 'Street',
      houseNumber: '1a',
      postcode: '12345',
      city: 'City',
    };

    render(<DonationSuccessView formData={formData} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText('Category 2, Category 3')).toBeInTheDocument();
    expect(screen.getByText('Area 2')).toBeInTheDocument();
    expect(screen.getByTestId('submit-address').textContent).toContain('First');
    expect(screen.getByTestId('submit-address').textContent).toContain('Last');
    expect(screen.getByTestId('submit-address').textContent).toContain(
      'Street',
    );
    expect(screen.getByTestId('submit-address').textContent).toContain('1a');
    expect(screen.getByTestId('submit-address').textContent).toContain('12345');
    expect(screen.getByTestId('submit-address').textContent).toContain('City');
  });

  test('should format submit date depending on the localization (en)', () => {
    useTranslationMock.mockReturnValue({
      t: tSpy,
      i18n: {
        language: 'en',
      },
    });

    const formData: DonationData = {
      crisisArea: 1,
      clothCategories: [1, 2],
    };

    render(<DonationSuccessView formData={formData} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('submit-date').textContent).toContain(
      new Date().toLocaleDateString('en-US'),
    );
  });

  test('should format submit date depending on the localization (de)', () => {
    useTranslationMock.mockReturnValue({
      t: tSpy,
      i18n: {
        language: 'de',
      },
    });

    const formData: DonationData = {
      crisisArea: 1,
      clothCategories: [1, 2],
    };

    render(<DonationSuccessView formData={formData} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('submit-date').textContent).toContain(
      new Date().toLocaleDateString('de-DE'),
    );
  });
});
