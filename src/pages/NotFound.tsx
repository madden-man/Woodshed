import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-head">
      <div className="eyebrow">404</div>
      <h1>No such page</h1>
      <p className="lede">
        That topic isn’t in the wiki yet. <Link to="/">Back to the index</Link>.
      </p>
    </div>
  )
}
