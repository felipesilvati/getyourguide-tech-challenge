import { useState } from 'react';
import { Button, Checkbox, Flex, Input, Result, Spin, Typography } from 'antd'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useDebounce } from 'use-debounce'
import ActivityCardList from './components/ActivityCardList/ActivityCardList'
import { SearchOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [onlyShowSpecialOffers, setOnlyShowSpecialOffers] = useState(false);

  const { data: activities, isLoading, isError } = useQuery({
    queryKey: ['activitiesWithSuppliers', debouncedSearchTerm, onlyShowSpecialOffers],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/activities/with-suppliers', {
        params: { query: debouncedSearchTerm, onlyShowSpecialOffers },
      });

      return data;
    },
    onError: (error) => console.error('Error fetching activities:', error),
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
  )

  const shouldRenderSearchResults = debouncedSearchTerm && !isLoading && activities?.length > 0;
  const shouldRenderNoResults = !activities?.length && !isLoading;

  return (
    <>
      <Title style={{ paddingLeft: 16 }}>Unforgetable Activities</Title>
      <Flex style={{ margin: 16 }} align='baseline' gap='middle' wrap='wrap'>
        <Input allowClear addonBefore={<SearchOutlined />} value={searchTerm} onChange={handleSearchInputChange} placeholder="Search activities by name" style={{ width: 400 }} />
        <Checkbox checked={onlyShowSpecialOffers} onChange={handleCheckboxChange}>Only special offers</Checkbox>
      </Flex>
      {shouldRenderSearchResults && <Paragraph style={{ marginLeft: 16 }} level={4}>{`Found ${activities.length} '${debouncedSearchTerm}' activities`}</Paragraph>}
      {isLoading ? <Spin /> : <ActivityCardList activities={activities} />}
      {shouldRenderNoResults && <Result status="404" title="No activities found" />}
    </>
  )
}

export default App
