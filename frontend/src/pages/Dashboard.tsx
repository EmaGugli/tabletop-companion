import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import characterService, { Character } from '../services/characterService';

const Dashboard: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await characterService.getCharacters();
        setCharacters(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load characters:', err);
        setError('Failed to load characters. Please try again later.');
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Characters</h1>
      {characters.length === 0 ? (
        <div style={{ marginTop: '1rem' }}>
          No characters found. <Link to="/character-sheet/new">Create a new character!</Link>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {characters.map(character => (
            <li key={character.id} style={{ marginBottom: '1rem' }}>
              <Link to={`/character-sheet/${character.id}`}>
                {character.name} - Level {character.level} {character.class}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard; 