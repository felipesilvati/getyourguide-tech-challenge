import { ConditionalWrapper, getActivitiesWithSuppliers } from './utils';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ConditionalWrapper', () => {
  it('renders children within a wrapper when condition is true', () => {
    render(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <div data-testid="wrapper">{children}</div>}
      >
        <div>test</div>
      </ConditionalWrapper>
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toBeDefined();
    expect(wrapper.textContent).to.have.string('test');
  });

  it('renders children directly without a wrapper when condition is false', () => {
    const { container } = render(
      <ConditionalWrapper
        condition={false}
        wrapper={(children) => <div data-testid="wrapper">{children}</div>}
      >
        <div>test</div>
      </ConditionalWrapper>
    );
    const wrapper = container.querySelector('[data-testid="wrapper"]');
    expect(wrapper).toBeNull();
    expect(screen.getByText('test')).toBeDefined();
  });
});

describe('getActivitiesWithSuppliers', () => {
  it('enriches activities with corresponding suppliers based on supplierId', () => {
    const activities = [
      {
        "id": 15647,
        "title": "German Tour: Reichstag with Plenary Chamber & Cuppola",
        "price": 59,
        "currency": "$",
        "rating": 4.8,
        "specialOffer": false,
        "supplierId": 250
      }
    ];
    const suppliers = [
      {
        "id": 250,
        "name": "Ion Popescu",
        "address": "Str. Veseliei, Nr. 4",
        "zip": "253445",
        "city": "Bucharest",
        "country": "Romania"
      }
    ];
    const expected = [
      {
        ...activities[0],
        supplier: suppliers[0]
      }
    ];

    const result = getActivitiesWithSuppliers(activities, suppliers);

    expect(result).toEqual(expected);
  });

  it('leaves the supplier as undefined if no matching supplierId is found', () => {
    const activities = [
      {
        "id": 15648,
        "title": "Paris Night Tour: Lights & Shadows",
        "price": 75,
        "currency": "€",
        "rating": 4.9,
        "specialOffer": true,
        "supplierId": 999 // Non-existing supplier ID
      }
    ];
    const suppliers = [
      {
        "id": 250,
        "name": "Ion Popescu",
        "address": "Str. Veseliei, Nr. 4",
        "zip": "253445",
        "city": "Bucharest",
        "country": "Romania"
      }
    ];
    const expected = [
      {
        ...activities[0],
        "supplier": undefined
      }
    ];

    const result = getActivitiesWithSuppliers(activities, suppliers);

    expect(result).toEqual(expected);
  });

  it('handles empty activities array gracefully', () => {
    const activities = [];
    const suppliers = [
      {
        "id": 250,
        "name": "Ion Popescu",
        "address": "Str. Veseliei, Nr. 4",
        "zip": "253445",
        "city": "Bucharest",
        "country": "Romania"
      }
    ];

    const result = getActivitiesWithSuppliers(activities, suppliers);

    expect(result).toEqual([]);
  });

  it('handles empty suppliers array gracefully', () => {
    const activities = [
      {
        "id": 15649,
        "title": "Venice Gondola Ride",
        "price": 120,
        "currency": "€",
        "rating": 5.0,
        "specialOffer": false,
        "supplierId": 251 // Non-existing in the empty suppliers array
      }
    ];
    const suppliers = [];

    const expected = [
      {
        ...activities[0],
        "supplier": undefined
      }
    ];

    const result = getActivitiesWithSuppliers(activities, suppliers);

    expect(result).toEqual(expected);
  });
});
