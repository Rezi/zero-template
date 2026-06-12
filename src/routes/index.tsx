// src/routes/index.tsx
import {createFileRoute} from '@tanstack/react-router'
import {useQuery, useZero} from '@rocicorp/zero/react'
import {mutators} from '../zero/mutators'
import {queries} from '../zero/queries'
 
export const Route = createFileRoute('/')({
  component: Home
})
 
function Home() {
    const zero = useZero()
  const [albums] = useQuery(
    queries.albums.byArtist({artistId: 'artist_1'})
  )

    const onClick = () => {
    zero.mutate(
      mutators.albums.create({
        id: crypto.randomUUID(),
        artistId: 'artist_1',
        title: 'Please Please Me',
        releaseYear: 1963
      })
    )
  }
 
  return (
    <main>
            <button onClick={onClick}>Create Album</button>
      <ul>
        {albums.map(album => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </main>
  )
}