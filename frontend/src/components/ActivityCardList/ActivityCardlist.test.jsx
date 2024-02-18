import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActivityCardList from './ActivityCardList';
import activities from '../../../resources/activities.json';
import suppliers from '../../../resources/suppliers.json';
import { getActivitiesWithSuppliers } from '../../utils/utils';

describe('ActivityCardList', () => {
  const activitiesWithSuppliers = getActivitiesWithSuppliers(activities, suppliers);

  it('renders correctly with activities', () => {
    render(<ActivityCardList activities={activitiesWithSuppliers} />);
    const activityCardsList = screen.getAllByTestId('activity-card');
    expect(activityCardsList).toHaveLength(activitiesWithSuppliers.length);
  });

  it('renders nothing when activities array is empty', () => {
    const { container } = render(<ActivityCardList activities={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('passes correct data to each ActivityCard', () => {
    render(<ActivityCardList activities={activitiesWithSuppliers} />);

    activitiesWithSuppliers.forEach((activity) => {
      expect(screen.getByText(activity.title)).toBeDefined();
    });
  });
});
