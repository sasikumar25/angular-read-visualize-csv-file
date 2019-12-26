import { IRecord } from './app.interface';

export class Record implements IRecord {
  constructor(
    public firstName: string,
    public surName: string,
    public issueCount: number,
    public dateOfBirth: string
  ) {}
} 