
import { useState } from "react"
import { spotTags } from "../../lib/data"
import './SpotTypeNav.css'
import { useHistory } from 'react-router-dom'

export default function SpotStyleNav() {

  const [selected, setSelected] = useState(null)
  const history = useHistory()

  const sendSoon = (e) => {
    setTimeout(() => { history.push('/coming-soon') }, 500)
  }

  return (
    // <nav className='spot-tags-sticky'>
      <main className='spot-tags-container'>
        {spotTags && spotTags.map((tag, i) => (
          <div
            className='spot-tag'
            key={i}
            onClick={sendSoon}>
            <img src={tag.url} alt={tag.text} className='spot-tag-img' />
            <div className='spot-tag-text'>{tag.text}</div>
          </div>
        ))}
      </main>
    // </nav>
  )
}
