import PropTypes from 'prop-types';

import { Badge, Card, Flex, Rate, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import currency from 'currency.js';
import { ConditionalWrapper } from '../../utils/ConditionalWrapper';
import './ActivityCard.css';

const { Meta } = Card;
const { Text } = Typography;

const ActivityCard = ({ activity }) => {
  const price = currency(activity.price).format({ symbol: activity.currency, precision: 0 });
  const priceLabel = (
    <>
      <Text strong>From {price}</Text> <Text>per person</Text>
    </>
  );

  const rateLabel = (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
      <Rate disabled defaultValue={activity.rating} allowHalf /> <Text>{activity.rating}</Text>
    </div>
  );

  const supplierLocation = `${activity.supplier.address} - ${activity.supplier.city} ${activity.supplier.zip} - ${activity.supplier.country}`;

  const supplierInfo = (
    <Flex gap="small">
      <Text italic>By {activity.supplier.name}</Text>
      <Tooltip title={supplierLocation} placement="right"><InfoCircleOutlined color="#eb2f96" /></Tooltip>
    </Flex>
  );

  const description = (
    <>
      <p>{supplierInfo}</p>
      <p>{rateLabel}</p>
      <p>{priceLabel}</p>
    </>
  );

  const getWrapper = (children) => <Badge.Ribbon text="Special Offer" color="#ff5533" placement="start">{children}</Badge.Ribbon>;

  return (
    <ConditionalWrapper condition={activity.specialOffer} wrapper={getWrapper}>
      <Card
        hoverable
        style={{ width: 290 }}
        className="custom-card"
        cover={<img style={{ width: 290, height: 244 }} alt={activity.title} src={`https://picsum.photos/seed/${activity.id}/290/244`} />} // Using a placeholder image for now
        key={activity.id}
      >
        <Meta
          title={activity.title}
          description={description}
        />
      </Card>
    </ConditionalWrapper>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
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
  }).isRequired,
};

export default ActivityCard;
