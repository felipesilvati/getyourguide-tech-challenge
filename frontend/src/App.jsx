import { Button, Result, Spin, Typography } from 'antd'
import { useQuery } from 'react-query'
import ActivityCardList from './components/ActivityCardList/ActivityCardList'
const { Title } = Typography

function App() {
  const { data: activities, isLoading, isError } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/activities')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onError: error => console.error('Error fetching activities:', error),
  })

  if (isLoading) return <Spin />

  if (isError) return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => window.location.reload()}>Retry</Button>}
    />
  )

  return (
    <>
      <Title style={{ paddingLeft: 16 }}>Unforgetable Activities</Title>
      <ActivityCardList activities={activities} />
    </>
  )
}

export default App
