import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import characterService, { Character } from '../services/characterService';

const CharacterView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      loadCharacter();
    }
  }, [id]);

  const loadCharacter = async () => {
    try {
      const data = await characterService.getCharacter(parseInt(id!));
      setCharacter(data);
      setError('');
    } catch (err) {
      setError('Failed to load character');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await characterService.deleteCharacter(parseInt(id!));
      navigate('/character-sheet');
    } catch (err) {
      setError('Failed to delete character');
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading character...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      </div>
    );
  }

  if (!character) {
    return <div style={{ padding: '2rem' }}>Character not found</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>{character.name}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate(`/character-sheet/${id}/edit`)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Edit Character
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Character
          </button>
          <button
            onClick={() => navigate('/character-sheet')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#9e9e9e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to List
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Confirm Delete</h3>
            <p style={{ marginBottom: '2rem' }}>
              Are you sure you want to delete {character.name}? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#9e9e9e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '2rem',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>Basic Information</h3>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Class:</strong> {character.class}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Level:</strong> {character.level}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Race:</strong> {character.race}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Background:</strong> {character.background}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Alignment:</strong> {character.alignment}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Hit Points:</strong> {character.hitPoints}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>Ability Scores</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem' 
          }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Strength:</strong> {character.strength}
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Dexterity:</strong> {character.dexterity}
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Constitution:</strong> {character.constitution}
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Intelligence:</strong> {character.intelligence}
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Wisdom:</strong> {character.wisdom}
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px' 
            }}>
              <strong>Charisma:</strong> {character.charisma}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterView; 