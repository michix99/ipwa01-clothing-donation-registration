import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { donationDataSchema, fromHomeDonationDataSchema } from '../models';
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
    const errorResult = await HelperService.validateAgainstSchema(
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

    expect(window.scrollTo).toBeCalledTimes(1);
  });
});
