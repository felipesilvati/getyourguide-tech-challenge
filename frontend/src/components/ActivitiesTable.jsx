import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Special Offer',
    dataIndex: 'specialOffer',
  },
  {
    title: 'Supplier ID',
    dataIndex: 'supplierId',
  },
]

const ActivitiesTable = ({ activities }) => {
  return (
    <Table
      columns={columns}
      dataSource={activities}
      rowKey={(record) => record.id}
    />
  )
}

export default ActivitiesTable;