import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  describe('rating', () => {
    it('displays the correct rating number', () => {
      render(<ActivityCard activity={activityMock} />);
      expect(screen.getByTestId("activity-card-rate").textContent.trim()).toContain(activityMock.rating);
    });
  
    // Checking how many stars rendered is out of scope (antd inner tests are responsible for that)
    it('renders the antd <Rating /> component', () => {
      render(<ActivityCard activity={activityMock} />);
      expect(screen.getByTestId("activity-card-rate").querySelectorAll('.ant-rate')).toHaveLength(1);
    })
  })

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

    it('displays additional supplier info when hovering over the InfoCircleOutlined icon', async () => {
      render(<ActivityCard activity={activityMock} />);

      // Find the InfoCircleOutlined icon which triggers the tooltip
      const infoIcon = screen.getByRole('img', { name: /info-circle/i });

      // Hover over the icon to trigger the tooltip
      fireEvent.mouseOver(infoIcon);

      const tooltipContent = await screen.findByRole('tooltip');
      expect(tooltipContent).toHaveTextContent(activityMock.supplier.address);
      expect(tooltipContent).toHaveTextContent(activityMock.supplier.city);
      expect(tooltipContent).toHaveTextContent(activityMock.supplier.zip);
      expect(tooltipContent).toHaveTextContent(activityMock.supplier.country);
    })

    it('does not display additional supplier info tooltip if InfoCircleOutlined icon is not hovered', async () => {
      render(<ActivityCard activity={activityMock} />);
      expect(screen.queryByRole('tooltip')).toBeNull();
    })
  })
});
