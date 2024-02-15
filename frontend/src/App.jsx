import { Button, Result, Spin, Typography } from 'antd'
import { useQuery } from 'react-query'
import ActivityCardList from './components/ActivityCardList/ActivityCardList'
import { getActivitiesWithSuppliers } from './utils/utils'
const { Title } = Typography

function App() {
  const { data: activities, isLoading, isError } = useQuery({
    queryKey: ['activitiesWithSuppliers'],
    queryFn: async () => {
      const activitiesResponse = await fetch('http://localhost:3001/activities')
      if (!activitiesResponse.ok) {
        throw new Error('Network response was not ok')
      }

      const suppliersResponse = await fetch('http://localhost:3001/suppliers')
      if (!suppliersResponse.ok) {
        throw new Error('Network response was not ok')
      }

      const activities = await activitiesResponse.json()
      const suppliers = await suppliersResponse.json()

      const activitiesWithSuppliers = getActivitiesWithSuppliers(activities, suppliers)

      return activitiesWithSuppliers
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
