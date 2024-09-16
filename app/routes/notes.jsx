import { json, redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteComponent, {
  links as storedNoteLinks,
} from '~/components/NoteComponent'
import { getStoredNotes, storeNotes } from '~/data/notes'

export default function NotesPage() {
  return (
    <main>
      <NewNote />
      <NoteComponent />
    </main>
  )
}

// to create a server route to handle client side requests
export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  // TODO: Add Validation
  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid Title - Must be at least 5 characters long' }
  }

  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
  return redirect('/notes')
}

export async function loader() {
  const notes = await getStoredNotes()
  return json(notes)
}

export const links = () => {
  return [...newNoteLinks(), ...storedNoteLinks()]
}
export const ErrorBoundary = ({ error }) => (
  <main className='error'>
    <h1>An Error Related to Your Notes Occurred!</h1>
    <p>{error.message}</p>
    <p>
      Back to <Link to='/'>safety</Link>
    </p>
  </main>
)
