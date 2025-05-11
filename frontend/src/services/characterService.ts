import api from './api';

export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  userId: number;
  background: string;
  race: string;
  alignment: string;
  hitPoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const characterService = {
  async getCharacters(): Promise<Character[]> {
    try {
      const response = await api.get<Character[]>('/characters');
      if (response.status === 204) {
        return [];
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createCharacter(characterData: Omit<Character, 'id' | 'userId'>): Promise<Character> {
    try {
      const response = await api.post<Character>('/characters', characterData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateCharacter(id: number, characterData: Partial<Character>): Promise<Character> {
    try {
      const response = await api.put<Character>(`/characters/${id}`, characterData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getCharacter(id: number): Promise<Character> {
    try {
      const response = await api.get<Character>(`/characters/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteCharacter(id: number): Promise<void> {
    try {
      await api.delete(`/characters/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default characterService; 