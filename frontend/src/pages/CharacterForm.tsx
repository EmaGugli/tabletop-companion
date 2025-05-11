import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PDFDocument, PDFPage } from 'pdf-lib';
import characterService, { Character } from '../services/characterService';

const CharacterForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    class: '',
    level: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPdfTemplate();
    if (id && id !== 'new') {
      loadCharacter();
    }
  }, [id]);

  const loadPdfTemplate = async () => {
    try {
      // Load your PDF template
      const pdfBytes = await fetch('/character-sheet-template.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      setPdfDoc(pdfDoc);
    } catch (err) {
      setError('Failed to load PDF template');
      console.error('Error loading PDF:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCharacter = async () => {
    try {
      const character = await characterService.getCharacter(parseInt(id!));
      setFormData(character);
    } catch (err) {
      setError('Failed to load character');
      console.error('Error loading character:', err);
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