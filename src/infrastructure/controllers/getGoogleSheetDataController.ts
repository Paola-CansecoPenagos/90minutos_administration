import { Request, Response } from 'express';
import { getSheetData } from '../../domain/helpers/googleSheetsHelper';

export class GetGoogleSheetDataController {
    
  async getSheetData(req: Request, res: Response): Promise<Response> {
    try {
      const data = await getSheetData();
      return res.json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
