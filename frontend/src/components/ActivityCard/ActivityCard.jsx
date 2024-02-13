import React from 'react';
import { Badge, Card, Flex, Rate, Tooltip, Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
import './ActivityCard.css';
import currency from 'currency.js';
import { ConditionalWrapper } from '../../utils/utils';
import { InfoCircleOutlined } from '@ant-design/icons';

// Example of activity.supplier:
// {
//   "id": 1,
//   "name": "John Doe",
//   "address": "123 Main St",
//   "zip": "12345",
//   "city": "Anytown",
//   "country": "USA"
// },

const ActivityCard = ({ activity }) => {
  const price = currency(activity.price).format({ symbol: activity.currency, precision: 0 })
  const priceLabel = <><Text strong>From {price}</Text> <Text>per person</Text></>

  const rateLabel = (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
      <Rate disabled defaultValue={activity.rating} allowHalf /> <Text>{activity.rating}</Text>
    </div>
  )

  const supplierLocation = `${activity.supplier.address} - ${activity.supplier.city} ${activity.supplier.zip} - ${activity.supplier.country}`

  // Show the address on a tooltip when hovering over the supplier's name
  const supplierInfo = (
    <Flex gap='small'>
      <Text italic>By {activity.supplier.name}</Text>
      <Tooltip title={supplierLocation} placement='right'><InfoCircleOutlined color='#eb2f96' /></Tooltip>
    </Flex>
  )

  const description = (
    <>
      <p>{supplierInfo}</p>
      <p>{rateLabel}</p>
      <p>{priceLabel}</p>
    </>
  )

  const getWrapper = (children) => <Badge.Ribbon text='Special Offer' color='#ff5533' placement='start'>{children}</Badge.Ribbon>

  return (
    <ConditionalWrapper condition={activity.specialOffer} wrapper={getWrapper}>
      <Card
        hoverable
        style={{ width: 290 }}
        className='custom-card'
        cover={<img alt={activity.title} src={`https://picsum.photos/290/244`} />} // Using a placeholder image for now
        key={activity.id}
      >
        <Meta
          title={activity.title}
          description={description}
        />
      </Card>
    </ConditionalWrapper>
  )
}

export default ActivityCard;