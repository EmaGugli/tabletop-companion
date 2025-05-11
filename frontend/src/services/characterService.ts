import api from './api';

export interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  userId: number;
}

const characterService = {
  async getCharacters(): Promise<Character[]> {
    const response = await api.get<Character[]>('/characters');
    return response.data;
  },

  async createCharacter(characterData: Omit<Character, 'id' | 'userId'>): Promise<Character> {
    const response = await api.post<Character>('/characters', characterData);
    return response.data;
  },

  async updateCharacter(id: number, characterData: Partial<Character>): Promise<Character> {
    const response = await api.put<Character>(`/characters/${id}`, characterData);
    return response.data;
  },

  async getCharacter(id: number): Promise<Character> {
    const response = await api.get<Character>(`/characters/${id}`);
    return response.data;
  }
};

export default characterService; 