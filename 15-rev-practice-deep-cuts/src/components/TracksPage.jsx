import React, { useEffect, useState } from 'react'
import Search from './Search'
import AddTrackForm from './AddTrackForm'
import TracksList from './TracksList'

function TracksPage() {

    const baseUrl = "http://localhost:8001/tracks"

    const [tracks, setTracks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
      fetch(baseUrl)
        .then(res => res.json())
        .then(setTracks)
    }, [])

    const filteredTracks = tracks.filter(track => {
      return track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            track.BPM.toString().includes(searchTerm)
    })

    function postTrack(newTrack){
      const newTrackBody = {
        ...newTrack,
        BPM: Number(newTrack.BPM)
      }
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrackBody)
      }
      return fetch(baseUrl, options)
        .then(res => res.json())
    }

    function deleteTrack(id){
      const options = { method: 'DELETE'}
      fetch(baseUrl + `/${id}`, options)
    }

    function addTrack(newTrack){
      postTrack(newTrack)
        .then(newTrack => setTracks([...tracks, newTrack]))
    }

    function removeTrack(id){
      const updatedTracks = tracks.filter(track => track.id !== id)
      setTracks(updatedTracks)
      deleteTrack(id)
    }
    
  return (
    <div>
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AddTrackForm onSubmitTrack={addTrack}/>
      <TracksList tracks={filteredTracks} onDelete={removeTrack}/>
    </div>
  )
}

export default TracksPage