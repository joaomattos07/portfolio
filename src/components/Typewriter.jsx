import { useEffect, useState } from 'react'

export default function Typewriter({ words, speed = 70, pause = 1600 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let delay = deleting ? speed / 2 : speed
    if (!deleting && text === word) delay = pause

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, speed, pause])

  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent">&nbsp;</span>
    </span>
  )
}