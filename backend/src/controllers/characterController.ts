import { Request, Response } from 'express';
import Character from '../models/Character';

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      name,
      class: characterClass,
      level,
      ...rest
    } = req.body;

    const character = await Character.create({
      name,
      class: characterClass,
      level,
      userId,
      details: rest
    });

    res.status(201).json({
      message: 'Character created successfully',
      character
    });
  } catch (error) {
    console.error('Create character error:', error);
    res.status(500).json({ message: 'Error creating character' });
  }
};

export const getCharacters = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const characters = await Character.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    // Transform the characters to include details as top-level properties
    const transformedCharacters = characters.map(char => ({
      ...char.toJSON(),
      ...char.details,
      details: undefined // Remove the details field
    }));

    res.json(transformedCharacters);
  } catch (error) {
    console.error('Get characters error:', error);
    res.status(500).json({ message: 'Error fetching characters' });
  }
};

export const getCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const character = await Character.findOne({
      where: { id, userId }
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    // Transform the character to include details as top-level properties
    const transformedCharacter = {
      ...character.toJSON(),
      ...character.details,
      details: undefined // Remove the details field
    };

    res.json(transformedCharacter);
  } catch (error) {
    console.error('Get character error:', error);
    res.status(500).json({ message: 'Error fetching character' });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const {
      name,
      class: characterClass,
      level,
      ...rest
    } = req.body;

    const character = await Character.findOne({
      where: { id, userId }
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    await character.update({
      name,
      class: characterClass,
      level,
      details: rest
    });

    res.json({
      message: 'Character updated successfully',
      character
    });
  } catch (error) {
    console.error('Update character error:', error);
    res.status(500).json({ message: 'Error updating character' });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const character = await Character.findOne({
      where: { id, userId }
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    await character.destroy();

    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Delete character error:', error);
    res.status(500).json({ message: 'Error deleting character' });
  }
}; 