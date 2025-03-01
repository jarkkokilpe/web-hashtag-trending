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
  private originalData: Array<TrendObjExtApi> | null = null;
  private callCount: number = 0; // Counter to track the number of calls
  private readonly filePath: string = path.resolve(
    __dirname,
    '../../../data/mocktrends.json',
  );

  constructor() {
    this.loadOriginalData(); // load and store the original data when the service is initialized
  }

  private loadOriginalData(): void {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      this.originalData = JSON.parse(fileContent) as Array<TrendObjExtApi>;
    } catch (error) {
      console.error('Error loading original data:', error);
      throw new Error('Failed to load original data');
    }
  }

  private resetDataToOriginalState(): void {
    try {
      if (!this.originalData) {
        throw new Error('Original data not loaded');
      }

      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.originalData, null, 2),
        'utf-8',
      );

      this.callCount = 0;

      console.log('Data reset to original state successfully.');
    } catch (error) {
      console.error('Error resetting data to original state:', error);
      throw new Error('Failed to reset data to original state');
    }
  }

  private randomizeValue(originalValue: number): number {
    const delta = 0.5; // 50% delta
    const growthBias = 1.01; // add 1% growth bias to prevent long term shrinking
    const min = originalValue * (1 - delta);
    const max = originalValue * (1 + delta) * growthBias; // And slightly increase the upper bound, previously mentioned, here
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public async randomizePostVolumes(): Promise<void> {
    try {
      if (!this.originalData) {
        throw new Error('Original data not loaded');
      }

      // reset to original data after 10 calls to prevent long term shrinking/growing
      if (++this.callCount % 10 === 0) {
        this.resetDataToOriginalState();
        console.log('Data reset to original state after 10 calls.');
        return;
      }

      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      const data: Array<TrendObjExtApi> = JSON.parse(
        fileContent,
      ) as Array<TrendObjExtApi>;

      console.log('randomizePostVolumes: data', data);

      // randomize tweet_volume valuse in the trends array
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
