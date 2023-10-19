import { useState } from 'react';

export default function Movies({ data }) {
    let [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o valor da pesquisa

    let handleSearch = (event) => {
        event.preventDefault();
        // Atualizar o estado com o valor digitado no campo de pesquisa
        setSearchTerm(event.target.search.value);
    };

    return (
        <div>
            <Busca handleSearch={handleSearch} />
            <p>Valor da pesquisa: {searchTerm}</p> {/* Exibir o valor da pesquisa */}
            <div>
                {data.Search.map((m) => (
                    <div>
                        <h1>{m.Title}</h1>
                        <p>{m.Year}</p>
                        <p>{m.Type}</p>
                        <img src={m.Poster} alt={m.Title} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let res = await fetch(`http://www.omdbapi.com/?apikey=fdb5b2fe&s=bagdad`);
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}

export function Busca({ handleSearch }) {
    return (
        <form onSubmit={handleSearch}>
            <label htmlFor="searchInput">
                Digite o termo de pesquisa:
            </label>
            <input type="text" id="searchInput" name="search" placeholder="Digite aqui" />
            <button type="submit">
                Pesquisar
            </button>
        </form>
    )
}
