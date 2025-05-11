import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import characterService, { Character } from '../services/characterService';

const CharacterSheet: React.FC = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const data = await characterService.getCharacters();
      setCharacters(data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Please log in to view your characters');
      } else {
        setError(err.response?.data?.message || 'Failed to load characters');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/character-sheet/new');
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading characters...</div>
        {error && (
          <div style={{ 
            color: 'red', 
            backgroundColor: '#ffebee', 
            padding: '1rem', 
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>Character Sheets</h2>
        <button
          onClick={handleCreateNew}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Create New Character
        </button>
      </div>

      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {characters.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>No Characters Found</h3>
          <p style={{ marginBottom: '1.5rem' }}>Start your adventure by creating your first character!</p>
          <button
            onClick={handleCreateNew}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Create Your First Character
          </button>
        </div>
      ) : (
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f5f5f5',
              borderBottom: '2px solid #ddd'
            }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Class</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Level</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters.map(character => (
              <tr key={character.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '1rem' }}>{character.name}</td>
                <td style={{ padding: '1rem' }}>{character.class}</td>
                <td style={{ padding: '1rem' }}>{character.level}</td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => navigate(`/character-sheet/${character.id}`)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '0.5rem'
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharacterSheet; 