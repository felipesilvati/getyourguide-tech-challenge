import { getActivitiesWithSuppliers, sortBySpecialOffer } from './utils';
import { ConditionalWrapper } from './ConditionalWrapper';
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

describe('sortBySpecialOffer', () => {
  const activities = [
    { id: 1, title: 'Activity 1', specialOffer: false },
    { id: 2, title: 'Activity 2', specialOffer: true },
    { id: 3, title: 'Activity 3', specialOffer: false },
    { id: 4, title: 'Activity 4', specialOffer: true }
  ];

  // Helper function to check if activities are sorted by specialOffer
  const expectSortedBySpecialOffer = (sortedActivities) => {
    const specialOffersFirst = sortedActivities.every((activity, index, arr) => {
      return index === 0 || activity.specialOffer <= arr[index - 1].specialOffer;
    });
    expect(specialOffersFirst).toBeTruthy();
  };

  it('sorts activities with special offers to the beginning', () => {
    const sortedActivities = sortBySpecialOffer([...activities]); // Use a copy to prevent side effects
    expectSortedBySpecialOffer(sortedActivities);
    // Further check for the specific order based on the provided array
    const specialOfferIds = sortedActivities.filter(a => a.specialOffer).map(a => a.id);
    expect(specialOfferIds).toEqual([2, 4]);
  });

  it('keeps the original order for activities with the same special offer status', () => {
    const sortedActivities = sortBySpecialOffer([...activities]);
    // Assuming the original array is [false, true, false, true] in terms of specialOffer
    // and we're checking if the sorted array keeps the true and false groups in their original order
    expect(sortedActivities[0].id < sortedActivities[1].id).toBeTruthy(); // True group
    expect(sortedActivities[2].id < sortedActivities[3].id).toBeTruthy(); // False group
  });

  it('handles an empty array gracefully', () => {
    const sortedActivities = sortBySpecialOffer([]);
    expect(sortedActivities).toEqual([]);
  });

  it('handles an array with all activities having the same special offer status', () => {
    const allSpecialOffers = activities.filter(a => a.specialOffer);
    const noSpecialOffers = activities.filter(a => !a.specialOffer);

    const sortedWithSpecialOffers = sortBySpecialOffer([...allSpecialOffers]);
    const sortedWithoutSpecialOffers = sortBySpecialOffer([...noSpecialOffers]);

    // Check if sorted arrays maintain their original order
    expect(sortedWithSpecialOffers.map(a => a.id)).toEqual(allSpecialOffers.map(a => a.id));
    expect(sortedWithoutSpecialOffers.map(a => a.id)).toEqual(noSpecialOffers.map(a => a.id));
  });
});
