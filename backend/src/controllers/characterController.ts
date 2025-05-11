import { Request, Response } from 'express';
import Character from '../models/Character';

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const { name, race, class: characterClass, level, attributes, background } = req.body;
    const userId = (req as any).user.id;

    const character = await Character.create({
      name,
      race,
      class: characterClass,
      level,
      attributes,
      background,
      userId
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

    res.json(characters);
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

    res.json(character);
  } catch (error) {
    console.error('Get character error:', error);
    res.status(500).json({ message: 'Error fetching character' });
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    const character = await Character.findOne({
      where: { id, userId }
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    await character.update(updateData);

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