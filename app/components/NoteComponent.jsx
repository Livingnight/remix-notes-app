import { Link } from '@remix-run/react'

import noteComponentStyles from '~/components/NoteComponent.css'

export default function NoteComponent({ notes }) {
  return (
    <ul className='note-field'>
      {notes.map((note, index) => (
        <li
          key={note.id}
          className='note-card'
        >
          <Link to={note.id}>
            <article>
              <header>
                <ul className='note-header'>
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2 className='note-title'>{note.title}</h2>
              </header>
              <p className='note-content'>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const links = () => {
  return [{ rel: 'stylesheet', href: noteComponentStyles }]
}
