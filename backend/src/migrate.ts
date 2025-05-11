import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

console.log('Database URL:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  logging: console.log
});

async function runMigrations() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful');

    // Get all migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    console.log('Migrations directory:', migrationsDir);
    
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.ts'))
      .sort();
    
    console.log('Found migration files:', migrationFiles);

    // Run each migration
    for (const file of migrationFiles) {
      console.log(`\nRunning migration: ${file}`);
      const migration = require(path.join(migrationsDir, file));
      try {
        await migration.up(sequelize.getQueryInterface());
        console.log(`Successfully completed migration: ${file}`);
      } catch (error) {
        console.error(`Error running migration ${file}:`, error);
        throw error;
      }
    }

    console.log('\nAll migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 