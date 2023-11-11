import React, { useEffect, useState } from 'react';

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'f12f30d7c1msh69bf63aedbfe7ecp1ac74ejsne6ad8319ab45',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Lista de Jogos</h1>
      {games.map((game) => (
        <div key={game.id}>
          {game.title} -
          {game.genre} -
          {game.platform} -
          <img src={game.thumbnail}></img>
        </div>
      ))}
    </div>
  );
}

export default GameList;
