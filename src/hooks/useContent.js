import { useState, useEffect } from 'react'

// Fetch blog-index.json and map post fields to match the shape
// existing components expect (id, description instead of slug, summary).
export default function useContent() {
  const [allContent, setAllContent] = useState([])
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    fetch('/blog-index.json')
      .then(r => r.json())
      .then(data => {
        const mapped = data.posts.map(post => ({
          ...post,
          id: post.slug,
          description: post.summary,
        }))
        setAllContent(mapped)
        setContentReady(true)
      })
  }, [])

  return { allContent, contentReady }
}
