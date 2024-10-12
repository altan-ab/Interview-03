import axios from 'axios'
import { useEffect, useState } from 'react'
import './styles.css'

function App() {
  return (
    <div className="app-container">
      <h1>Activity Generator</h1>
      <GenerateList />
    </div>
  )
}

const GenerateList = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    handleGenerateActivity()
  }, [])

  const handleGenerateActivity = async () => {
    try {
      const response = await axios.get(
        'https://bored.api.lewagon.com/api/activity'
      )
      const newActivity = response.data

      // Aynı aktivite varsa eklenmesin
      if (activities.some((item) => item.key === newActivity.key)) {
        alert('This activity already exists!')
        return
      }

      setActivities([...activities, newActivity])
    } catch (error) {
      console.log('Error fetching activity:', error)
    }
  }

  return (
    <div>
      <button onClick={handleGenerateActivity}>Generate Activity</button>
      <ul>
        {activities.map((activity) => (
          <ExpandableListItem key={activity.key} item={activity} />
        ))}
      </ul>
    </div>
  )
}

const ExpandableListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <li>
      <p>
        • {item.activity}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </p>
      {expanded && (
        <ul>
          <li>type: {item.type}</li>
          <li>participants: {item.participants}</li>
          <li>price: {item.price}</li>
          {item.link && (
            <li>
              link: <a href={item.link}>Visit</a>
            </li>
          )}
          <li>key: {item.key}</li>
          <li>accessibility: {item.accessibility}</li>
        </ul>
      )}
    </li>
  )
}

export default App
