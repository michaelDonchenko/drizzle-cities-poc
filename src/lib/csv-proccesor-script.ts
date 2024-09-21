import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DatabaseService } from '../database/database.service';
import { CSVParserService } from './csv-parser.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const databaseService = app.get(DatabaseService);
  const csvParserService = app.get(CSVParserService);

  const csvFilePath = './src/lib/world_cities.csv';

  try {
    const csvData = await csvParserService.parseCSV(csvFilePath);
    await databaseService.insertCSVData(csvData);
    console.log('CSV data inserted successfully');
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }

  await app.close();
}

bootstrap();
