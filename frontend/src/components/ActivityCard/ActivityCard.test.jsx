import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActivityCard from './ActivityCard';
import activities from '../../../resources/activities.json'
import suppliers from '../../../resources/suppliers.json'
import { getActivitiesWithSuppliers } from '../../utils/utils';
import { describe, it, expect } from 'vitest';
import currency from 'currency.js';

describe('ActivityCard', () => {
  const activityMock = getActivitiesWithSuppliers(activities, suppliers)[0];

  it('renders without crashing', () => {
    render(<ActivityCard activity={activityMock} />);
    expect(screen.getByText(activityMock.title)).toBeDefined();
  });

  it('formats the price correctly', async () => {
    render(<ActivityCard activity={activityMock} />);
    const expectedPrice = currency(activityMock.price).format({ symbol: activityMock.currency, precision: 0 });
    expect(screen.getByTestId("activity-card-price").textContent).toBe(`From ${expectedPrice} per person`);
  });

  it('displays the correct rating', () => {
    render(<ActivityCard activity={activityMock} />);
    expect(screen.getByTestId("activity-card-rate").textContent.trim()).toContain(activityMock.rating);
  });

  describe('special offer badge', () => {
    it('shows the badge only when specialOffer is true', () => {
      const activityWithSpecialOffer = { ...activityMock, specialOffer: true };
      render(<ActivityCard activity={activityWithSpecialOffer} />);
      expect(screen.queryByTestId('activity-card-special-offer-badge')).not.toBeNull();
    });

    it('does not show the badge when specialOffer is false', () => {
      render(<ActivityCard activity={activityMock} />);
      expect(screen.queryByTestId('activity-card-special-offer-badge')).toBeNull();
    })
  });

  describe('supplier info', () => {
    it('displays supplier name correctly', () => {
      render(<ActivityCard activity={activityMock} />);
      expect(screen.getByText(`By ${activityMock.supplier.name}`)).toBeDefined();
    })

    it('displays additional supplier info when hovering over the supplier name', () => {
      render(<ActivityCard activity={activityMock} />);
      const supplierInfoTooltip = screen.getByText(`By ${activityMock.supplier.name}`);
      const supplierLocation = `${activityMock.supplier.address} - ${activityMock.supplier.city} ${activityMock.supplier.zip} - ${activityMock.supplier.country}`;
      fireEvent.mouseOver(supplierInfoTooltip);
      expect(screen.getByTestId('activity-card-supplier-tooltip').textContent).toBe(supplierLocation);
    })
  })
});
