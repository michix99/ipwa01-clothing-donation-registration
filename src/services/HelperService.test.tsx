import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  DonationData,
  donationDataSchema,
  fromHomeDonationDataSchema,
} from '../models';
import HelperService from './HelperService';

describe('HelperService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validateAgainstSchema should validate against a schema and return no \
  error on valid data', async () => {
    const errorResult = await HelperService.validateAgainstSchema(
      donationDataSchema,
      {
        crisisArea: 0,
        clothCategories: [1],
      },
    );
    expect(Object.keys(errorResult).length).toBe(0);
  });

  test('validateAgainstSchema should validate against a schema and return \
  errors on false data', async () => {
    let errorResult = await HelperService.validateAgainstSchema(
      fromHomeDonationDataSchema,
      {
        crisisArea: 0,
        clothCategories: [1],
        firstName: 'name',
        lastName: 'last name',
        street: 'street',
        houseNumber: 'number',
        // must be a number, and match the office postcode -> multiple errors
        postcode: 'XXX',
        city: 'city',
      },
    );

    expect(Object.keys(errorResult).length).toBe(1);
    expect(errorResult['postcode'].length).toBe(2);

    errorResult = await HelperService.validateAgainstSchema(
      donationDataSchema,
      {
        crisisArea: -1, // must be 0 or higher
        clothCategories: [], // must contain min one item
      },
    );

    expect(Object.keys(errorResult).length).toBe(2);
    expect(errorResult['crisisArea'].length).toBe(1);
    expect(errorResult['clothCategories'].length).toBe(1);

    errorResult = await HelperService.validateAgainstSchema(
      donationDataSchema,
      {
        // missing crisis area
        clothCategories: [1],
      } as DonationData,
    );

    expect(Object.keys(errorResult).length).toBe(1);
    expect(errorResult['crisisArea'].length).toBe(1);

    errorResult = await HelperService.validateAgainstSchema(
      fromHomeDonationDataSchema,
      {
        crisisArea: 0,
        clothCategories: [1],
        firstName: '', // required
        lastName: '', // required
        street: '', // required
        houseNumber: '', // required
        postcode: '', // required
        city: '', // required
      },
    );

    expect(Object.keys(errorResult).length).toBe(6);
    expect(errorResult['firstName'].length).toBe(1);
    expect(errorResult['lastName'].length).toBe(1);
    expect(errorResult['street'].length).toBe(1);
    expect(errorResult['houseNumber'].length).toBe(1);
    expect(errorResult['postcode'].length).toBe(3);
    expect(errorResult['city'].length).toBe(1);
  });

  test('scrollToTopAfterNavigation should scroll to the top if the location \
  changes', () => {
    window.scrollTo = jest.fn().mockImplementation();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname: 'testPath',
      }),
    }));
    render(
      <MemoryRouter>
        <HelperService.scrollToTopAfterNavigation />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
