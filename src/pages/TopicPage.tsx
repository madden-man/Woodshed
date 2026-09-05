import { Link, useParams } from 'react-router-dom'
import { getTopic } from '../data/theory'
import Blocks from '../components/Blocks'
import NotFound from './NotFound'

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getTopic(slug) : undefined

  if (!topic) return <NotFound />

  return (
    <article className="topic">
      <div className="page-head">
        <div className="eyebrow">{topic.category}</div>
        <h1>{topic.title}</h1>
        <p className="lede">{topic.summary}</p>
      </div>

      <aside className="plainly">
        <div className="plainly-label">In plain terms</div>
        <p>{topic.inPlainTerms}</p>
      </aside>

      <Blocks blocks={topic.blocks} />

      <p className="topic-ask">
        Something here unclear? <Link to={`/ask?topic=${topic.slug}`}>Ask the teacher about this page</Link>.
      </p>

      {topic.related && topic.related.length > 0 && (
        <footer className="related">
          <div className="eyebrow">See also</div>
          <div className="related-links">
            {topic.related.map((slug) => (
              <RelatedLink key={slug} slug={slug} />
            ))}
          </div>
        </footer>
      )}
    </article>
  )
}

function RelatedLink({ slug }: { slug: string }) {
  const topic = getTopic(slug)
  if (!topic) return null
  return <Link to={`/wiki/${topic.slug}`}>{topic.title}</Link>
}
