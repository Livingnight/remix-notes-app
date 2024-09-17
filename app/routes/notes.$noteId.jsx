import { Link } from '@remix-run/react'
import { json, useLoaderData } from 'react-router-dom'
import { getStoredNotes } from '~/data/notes'

import styles from '~/styles/note-details.css'

export function Note() {
  const note = useLoaderData()

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to All Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  )
}

export const loader = async ({ params }) => {
  const retrievedNotes = await getStoredNotes()
  if (!retrievedNotes || retrievedNotes.length === 0) {
    throw json({ message: 'No Notes Found' }, { status: 404 })
  }

  const note = retrievedNotes.find(item => item.id === params.noteId)
  if (!note) {
    throw json({ message: 'Note Not Found' }, { status: 404 })
  }
  console.log(note)
  return note
}

export default Note

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export function meta({ data }) {
  return {
    title: data.title,
    description: 'Manage your notes with ease',
  }
}
