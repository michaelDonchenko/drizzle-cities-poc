import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parse';

@Injectable()
export class CSVParserService {
  async parseCSV(filePath: string): Promise<any[]> {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');

    return new Promise((resolve, reject) => {
      csv.parse(
        fileContent,
        {
          columns: true,
          skip_empty_lines: true,
        },
        (error, records) => {
          if (error) {
            reject(error);
          } else {
            resolve(records);
          }
        },
      );
    });
  }
}
