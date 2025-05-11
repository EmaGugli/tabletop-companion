import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Registration request received:', { ...req.body, password: '[REDACTED]' });
    
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Creating new user...');
    // Create user - password will be hashed by the model hook
    const user = await User.create({
      email,
      password
    });
    console.log('User created successfully:', { id: user.id, email: user.email });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error details:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ 
      message: 'Error registering user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login attempt received:', { 
      email: req.body.email, 
      password: '[REDACTED]',
      body: req.body 
    });
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing credentials:', { hasEmail: !!email, hasPassword: !!password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    console.log('Searching for user with email:', email);
    const user = await User.findOne({ 
      where: { email },
      logging: (sql, timing) => {
        console.log('Executing SQL:', sql);
        console.log('Query timing:', timing);
      }
    });
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', { 
      id: user.id, 
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password.length,
      passwordHash: user.password.substring(0, 10) + '...' // Show first 10 chars of hash
    });
    
    console.log('Verifying password...');
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password verification result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password verified, generating token...');
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', email);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk((req as any).user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
}; 