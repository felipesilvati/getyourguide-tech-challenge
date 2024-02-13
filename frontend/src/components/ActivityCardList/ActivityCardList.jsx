import React from 'react';
import PropTypes from 'prop-types';
import ActivityCard from '../ActivityCard/ActivityCard';

const ActivityCardList = ({ activities }) => {
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'left',
    padding: '16px',
  };

  return (
    <div style={listStyle}>
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

ActivityCardList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      specialOffer: PropTypes.bool.isRequired,
      supplierId: PropTypes.number,
      supplier: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
        country: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default ActivityCardList;
