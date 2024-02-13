import React from 'react';
import { Card, Rate, Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
import './ActivityCard.css';
import currency from 'currency.js';

// {
//   "id": 25651,
//   "title": "German Tour: Parliament Quarter & Reichstag glass dome",
//   "price": 14,
//   "currency": "$",
//   "rating": 4.8,
//   "specialOffer": false,
//   "supplierId": 1
// },

const ActivityCard = ({ activity }) => {
  const price = currency(activity.price).format({ symbol: activity.currency, precision: 0 })
  const priceLabel = <><Text strong>From {price}</Text> <Text>per person</Text></>

  const rateLabel = (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
      <Rate disabled defaultValue={activity.rating} allowHalf /> <Text>{activity.rating}</Text>
    </div>
  )

  const description = (
    <>
      <p>{rateLabel}</p>
      <p>{priceLabel}</p>
    </>
  )

  return (
    <Card
      hoverable
      style={{ width: 290 }}
      className='custom-card'
      cover={<img alt={activity.title} src={`https://picsum.photos/290/244`} />} // Using a placeholder image for now
    >
      <Meta
        title={activity.title}
        description={description}
      />
    </Card>
  )
}

export default ActivityCard;