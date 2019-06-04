import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Search() {
  const [description, setDescription] = useState('')
  const [results, setResults] = useState([])
  const API_URL = 'https://jobs.search.gov/jobs/search.json?query='

  useEffect(() => {
    axios.get(`${API_URL}${description}`).then(resp => {
      console.log(resp.data)
    })
  }, [])

  const addDescription = event => {
    event.preventDefault()
    console.log(description)
    axios.get(`${API_URL}${description}`).then(resp => {
      setResults(resp.data)
      console.log(resp)
    })
  }

  return (
    <section>
      <form onSubmit={addDescription}>
        <h2>Description</h2>
        <input
          type="text"
          placeholder="ie 'ruby' or 'java'"
          value={description}
          onChange={event => {
            setDescription(event.target.value)
          }}
        />
      </form>
      <h3>results</h3>
      <ul>
        {results.map(result => {
          return (
            <li key={result.id}>
              <p>{result.position_title}</p>
              <p>{result.locations}</p>
              <p>{result.organization_name}</p>
              <a href={result.url}>
                <p>{result.url}</p>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
