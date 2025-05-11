import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import characterService, { Character } from '../services/characterService';

const CharacterForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    class: '',
    level: 1,
    background: '',
    race: '',
    alignment: '',
    hitPoints: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && id !== 'new') {
      loadCharacter();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadCharacter = async () => {
    try {
      const character = await characterService.getCharacter(parseInt(id!));
      setFormData(character);
      setError('');
    } catch (err) {
      setError('Failed to load character');
      console.error('Error loading character:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id && id !== 'new') {
        await characterService.updateCharacter(parseInt(id), formData);
      } else {
        await characterService.createCharacter(formData as Omit<Character, 'id' | 'userId'>);
      }
      navigate('/character-sheet');
    } catch (err) {
      setError('Failed to save character');
      console.error('Error saving character:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{id === 'new' ? 'Create New Character' : 'Edit Character'}</h2>
      
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

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Character Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="class" style={{ display: 'block', marginBottom: '0.5rem' }}>Class</label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select a class</option>
            <option value="Fighter">Fighter</option>
            <option value="Wizard">Wizard</option>
            <option value="Cleric">Cleric</option>
            <option value="Rogue">Rogue</option>
            <option value="Bard">Bard</option>
            <option value="Druid">Druid</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="level" style={{ display: 'block', marginBottom: '0.5rem' }}>Level</label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min="1"
            max="20"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="background" style={{ display: 'block', marginBottom: '0.5rem' }}>Background</label>
          <input
            type="text"
            id="background"
            name="background"
            value={formData.background}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="race" style={{ display: 'block', marginBottom: '0.5rem' }}>Race</label>
          <input
            type="text"
            id="race"
            name="race"
            value={formData.race}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="alignment" style={{ display: 'block', marginBottom: '0.5rem' }}>Alignment</label>
          <input
            type="text"
            id="alignment"
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="hitPoints" style={{ display: 'block', marginBottom: '0.5rem' }}>Hit Points</label>
          <input
            type="number"
            id="hitPoints"
            name="hitPoints"
            value={formData.hitPoints}
            onChange={handleChange}
            min="1"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div>
            <label htmlFor="strength">Strength</label>
            <input type="number" id="strength" name="strength" value={formData.strength} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
          <div>
            <label htmlFor="dexterity">Dexterity</label>
            <input type="number" id="dexterity" name="dexterity" value={formData.dexterity} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
          <div>
            <label htmlFor="constitution">Constitution</label>
            <input type="number" id="constitution" name="constitution" value={formData.constitution} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
          <div>
            <label htmlFor="intelligence">Intelligence</label>
            <input type="number" id="intelligence" name="intelligence" value={formData.intelligence} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
          <div>
            <label htmlFor="wisdom">Wisdom</label>
            <input type="number" id="wisdom" name="wisdom" value={formData.wisdom} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
          <div>
            <label htmlFor="charisma">Charisma</label>
            <input type="number" id="charisma" name="charisma" value={formData.charisma} onChange={handleChange} min="1" max="20" required style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
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
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {id === 'new' ? 'Create Character' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm; 