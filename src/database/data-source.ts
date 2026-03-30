import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../config/database.config';

export const AppDataSource = new DataSource(typeOrmConfig);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });