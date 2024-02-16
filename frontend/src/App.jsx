import { useState } from 'react';
import { Button, Checkbox, Flex, Input, Pagination, Result, Spin, Typography } from 'antd';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import ActivityCardList from './components/ActivityCardList/ActivityCardList';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [onlyShowSpecialOffers, setOnlyShowSpecialOffers] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['activitiesWithSuppliers', page, pageSize, debouncedSearchTerm, onlyShowSpecialOffers],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/activities/with-suppliers', {
        params: {
          page,
          pageSize,
          query: debouncedSearchTerm,
          onlyShowSpecialOffers,
        },
      });
      return data;
    },
    onError: (error) => console.error('Error fetching activities:', error),
    keepPreviousData: true,
  });

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);
  const handleCheckboxChange = (e) => setOnlyShowSpecialOffers(e.target.checked);

  if (isError) return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => window.location.reload()}>Retry</Button>}
    />
  );

  const shouldRenderNoResults = !data?.activities?.length && !isLoading;

  return (
    <>
      <Title style={{ paddingLeft: 16 }}>Unforgettable Activities</Title>
      <Flex style={{ margin: 16 }} align='baseline' gap='middle' wrap='wrap'>
        <Input
          allowClear
          addonBefore={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search activities by name"
          style={{ width: 400 }}
        />
        <Checkbox
          checked={onlyShowSpecialOffers}
          onChange={handleCheckboxChange}
        >
          Only special offers
        </Checkbox>
      </Flex>
      {shouldRenderNoResults && <Result status="404" title="No activities found" />}
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <ActivityCardList activities={data?.activities} />
          <Pagination
            current={page}
            pageSize={pageSize}
            total={data?.totalCount}
            onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
            onShowSizeChange={(current, size) => setPageSize(size)}
            style={{ textAlign: 'center', margin: '16px 0' }}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </>
      )}
    </>
  );
}

export default App;
