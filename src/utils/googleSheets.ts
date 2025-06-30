// Google Sheets API integration for tracking progress
export interface TrackingData {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  exercise: boolean;
  waterGlasses: number;
  notes?: string;
}

// Configuration for Google Sheets API
interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  range: string; // e.g., 'Sheet1!A:G'
}

// You'll need to set these values
const GOOGLE_SHEETS_CONFIG: GoogleSheetsConfig = {
  apiKey: import.meta.env.PUBLIC_GOOGLE_SHEETS_API_KEY || '',
  spreadsheetId: import.meta.env.PUBLIC_GOOGLE_SPREADSHEET_ID || '',
  range: 'Sheet1!A:G' // Change to match your actual sheet name
};

export class GoogleSheetsTracker {
  private config: GoogleSheetsConfig;

  constructor(config?: Partial<GoogleSheetsConfig>) {
    this.config = { ...GOOGLE_SHEETS_CONFIG, ...config };
  }

  /**
   * Append tracking data to Google Sheets
   */
  async appendTrackingData(data: TrackingData): Promise<boolean> {
    if (!this.config.apiKey || !this.config.spreadsheetId) {
      console.warn('Google Sheets API key or spreadsheet ID not configured');
      return false;
    }

    console.log('Attempting to save to Google Sheets:', {
      spreadsheetId: this.config.spreadsheetId,
      range: this.config.range,
      data: data
    });

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.range}:append`;
      
      const values = [
        [
          data.date,
          data.breakfast ? 'TRUE' : 'FALSE',
          data.lunch ? 'TRUE' : 'FALSE',
          data.dinner ? 'TRUE' : 'FALSE',
          data.exercise ? 'TRUE' : 'FALSE',
          data.waterGlasses.toString(),
          data.notes || ''
        ]
      ];

      const response = await fetch(`${url}?valueInputOption=RAW&key=${this.config.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
      }

      console.log('Successfully saved tracking data to Google Sheets');
      return true;
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      return false;
    }
  }

  /**
   * Get existing tracking data for today (to check if already logged)
   */
  async getTodaysData(): Promise<TrackingData | null> {
    if (!this.config.apiKey || !this.config.spreadsheetId) {
      return null;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.range}`;
      
      const response = await fetch(`${url}?key=${this.config.apiKey}`);
      
      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      // Find today's row (assuming first column is date)
      const todaysRow = rows.find((row: string[]) => row[0] === today);
      
      if (todaysRow) {
        return {
          date: todaysRow[0],
          breakfast: todaysRow[1] === 'TRUE',
          lunch: todaysRow[2] === 'TRUE',
          dinner: todaysRow[3] === 'TRUE',
          exercise: todaysRow[4] === 'TRUE',
          waterGlasses: parseInt(todaysRow[5] || '0'),
          notes: todaysRow[6] || ''
        };
      }

      return null;
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      return null;
    }
  }

  /**
   * Update existing row for today (if it exists)
   */
  async updateTodaysData(data: TrackingData): Promise<boolean> {
    if (!this.config.apiKey || !this.config.spreadsheetId) {
      return false;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.range}`;
      
      // First, get all data to find the row index
      const response = await fetch(`${url}?key=${this.config.apiKey}`);
      const sheetData = await response.json();
      const rows = sheetData.values || [];

      const rowIndex = rows.findIndex((row: string[]) => row[0] === today);
      
      if (rowIndex === -1) {
        // No existing row, append new one
        return await this.appendTrackingData(data);
      }

      // Update existing row
      const updateRange = `${this.config.range.split('!')[0]}!A${rowIndex + 1}:G${rowIndex + 1}`;
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${updateRange}`;
      
      const values = [
        [
          data.date,
          data.breakfast ? 'TRUE' : 'FALSE',
          data.lunch ? 'TRUE' : 'FALSE',
          data.dinner ? 'TRUE' : 'FALSE',
          data.exercise ? 'TRUE' : 'FALSE',
          data.waterGlasses.toString(),
          data.notes || ''
        ]
      ];

      const updateResponse = await fetch(`${updateUrl}?valueInputOption=RAW&key=${this.config.apiKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`Google Sheets API error: ${updateResponse.status}`);
      }

      console.log('Successfully updated tracking data in Google Sheets');
      return true;
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
      return false;
    }
  }
}

// Utility function to save current tracking state
export async function saveTrackingData(tracker: GoogleSheetsTracker): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];
  
  // Get current state from localStorage and checkboxes
  const breakfast = document.querySelector<HTMLInputElement>('#breakfast-check')?.checked || false;
  const lunch = document.querySelector<HTMLInputElement>('#lunch-check')?.checked || false;
  const dinner = document.querySelector<HTMLInputElement>('#dinner-check')?.checked || false;
  const exercise = document.querySelector<HTMLInputElement>('#exercise-check')?.checked || false;
  const waterGlasses = parseInt(localStorage.getItem('waterCount') || '0');

  const trackingData: TrackingData = {
    date: today,
    breakfast,
    lunch,
    dinner,
    exercise,
    waterGlasses,
    notes: `Mediterranean Diet Day - Week ${Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % 2 + 1}`
  };

  return await tracker.updateTodaysData(trackingData);
}

// Utility function to load existing tracking data
export async function loadTrackingData(tracker: GoogleSheetsTracker): Promise<void> {
  try {
    const todaysData = await tracker.getTodaysData();
    
    if (todaysData) {
      // Update checkboxes
      const breakfastCheck = document.querySelector<HTMLInputElement>('#breakfast-check');
      const lunchCheck = document.querySelector<HTMLInputElement>('#lunch-check');
      const dinnerCheck = document.querySelector<HTMLInputElement>('#dinner-check');
      const exerciseCheck = document.querySelector<HTMLInputElement>('#exercise-check');
      const waterDisplay = document.getElementById('water-count');

      if (breakfastCheck) breakfastCheck.checked = todaysData.breakfast;
      if (lunchCheck) lunchCheck.checked = todaysData.lunch;
      if (dinnerCheck) dinnerCheck.checked = todaysData.dinner;
      if (exerciseCheck) exerciseCheck.checked = todaysData.exercise;
      
      // Update water count
      if (waterDisplay) {
        waterDisplay.textContent = todaysData.waterGlasses.toString();
        localStorage.setItem('waterCount', todaysData.waterGlasses.toString());
      }

      console.log('Loaded existing tracking data from Google Sheets');
    }
  } catch (error) {
    console.error('Error loading tracking data:', error);
  }
}