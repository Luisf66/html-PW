import { useState } from "react"

export default function Movies({ initialData }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState(initialData)
  const [isDescending, setIsDescending] = useState(false)
  const [error, setError] = useState("")

  async function searchMovies() {
    if (searchTerm.trim() === "") {
      alert("Preencha o campo de pesquisa")
      return
    }

    const res = await fetch(`http://www.omdbapi.com/?apiKey=fdb5b2fe&s=${searchTerm}`)
    const searchData = await res.json()
    setData(searchData)
  }

  function sortMovies() {
    const sortedData = [...data.Search].sort((a, b) => {
      if (isDescending) {
        return b.Title.localeCompare(a.Title)
      } else {
        return a.Title.localeCompare(b.Title)
      }
    })
    setData({ ...data, Search: sortedData })
    setIsDescending(!isDescending)
  }

  return (
    <div>
      <div>
        <form id="my_form">
          <input
            type="text"
            placeholder="Digite o Filme"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </form>
        <button onClick={searchMovies}>Pesquisar</button>
        <button onClick={sortMovies}>Ordenar</button>
      </div>
      {error && <p>{error}</p>}
      <div>
        {data &&
          data.Search &&
          data.Search.map((m) => (
            <div key={m.imdbID}>
              <h2>
                {m.Title} --- {m.Year}
              </h2>
              <img src={m.Poster} alt={m.Title} />
            </div>
          ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://www.omdbapi.com/?apiKey=fdb5b2fe&s=default`)
  const initialData = await res.json()
  return {
    props: {
      initialData,
    },
  }
}

