/**
 * This service is responsible for randomizing the tweet_volume values in the JSON file.
 * It reads the JSON file, randomizes the tweet_volume values, and writes the updated data back to the file.
 * Randomizing is now done by adding or subtracting 20% (delta) of the original value .
 * All this is done because of I didn't have access to real XAPI trends. So we use mock data.
 */

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TrendObjExtApi } from 'src/extdatarouter/interfaces/ext.interface';

@Injectable()
export class RandService {
  private readonly filePath: string = path.resolve(
    __dirname,
    '../../../data/mocktrends.json',
  );

  private randomizeValue(originalValue: number): number {
    const delta = 0.2; // 20% delta
    const growthBias = 1.05; // add 5% growth bias to prevent long term shrinking
    const min = originalValue * (1 - delta);
    const max = originalValue * (1 + delta) * growthBias; // And slightly increase the upper bound here
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public async randomizePostVolumes(): Promise<void> {
    try {
      // Read the JSON file
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      const data: Array<TrendObjExtApi> = JSON.parse(
        fileContent,
      ) as Array<TrendObjExtApi>;

      console.log('randomizePostVolumes: data', data);

      // Randomize tweet_volume valuse in the trends array
      const updatedData = data.map((item) => ({
        ...item,
        trends: item.trends.map((trend) => ({
          ...trend,
          tweet_volume: this.randomizeValue(trend.tweet_volume),
        })),
      }));

      //Write the updated data back to the file
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(updatedData, null, 2),
        'utf-8',
      );

      console.log('Tweet volumes randomized and file updated successfully.');
    } catch (error) {
      console.error('Error randomizing tweet volumes:', error);
      throw new Error('Failed to randomize tweet volumes');
    }
  }
}
