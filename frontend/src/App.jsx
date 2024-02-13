import { useState } from 'react'
import { Button, Typography } from 'antd'
const { Paragraph } = Typography

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Paragraph>The counter is at: {count}</Paragraph>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>Click here</Button>
    </div>
  )
}

export default App
