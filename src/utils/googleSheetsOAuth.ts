// Google Sheets OAuth integration for write access
export interface TrackingData {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  exercise: boolean;
  waterGlasses: number;
  notes?: string;
}

interface GoogleSheetsConfig {
  clientId: string;
  spreadsheetId: string;
  range: string;
  scope: string;
}

const GOOGLE_SHEETS_CONFIG: GoogleSheetsConfig = {
  clientId: import.meta.env.PUBLIC_API_CLIENT_ID || '',
  spreadsheetId: import.meta.env.PUBLIC_GOOGLE_SPREADSHEET_ID || '',
  range: 'Sheet1!A:G',
  scope: 'https://www.googleapis.com/auth/spreadsheets'
};

export class GoogleSheetsOAuthTracker {
  private config: GoogleSheetsConfig;
  private accessToken: string | null = null;
  private isAuthenticated: boolean = false;

  constructor() {
    this.config = GOOGLE_SHEETS_CONFIG;
  }

  /**
   * Initialize Google OAuth and authenticate user
   */
  async authenticate(): Promise<boolean> {
    if (!this.config.clientId || !this.config.spreadsheetId) {
      console.warn('Google OAuth client ID or spreadsheet ID not configured');
      return false;
    }

    try {
      // Load Google Identity Services library
      await this.loadGoogleIdentityLibrary();
      
      return new Promise((resolve) => {
        // @ts-ignore - Google Identity Services
        google.accounts.oauth2.initTokenClient({
          client_id: this.config.clientId,
          scope: this.config.scope,
          callback: (response: any) => {
            if (response.error) {
              console.error('OAuth error:', response.error);
              resolve(false);
            } else {
              this.accessToken = response.access_token;
              this.isAuthenticated = true;
              console.log('Successfully authenticated with Google');
              resolve(true);
            }
          }
        }).requestAccessToken();
      });
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  /**
   * Load Google Identity Services library
   */
  private loadGoogleIdentityLibrary(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      // @ts-ignore
      if (typeof google !== 'undefined' && google.accounts) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  /**
   * Check if user is authenticated
   */
  isUserAuthenticated(): boolean {
    return this.isAuthenticated && this.accessToken !== null;
  }

  /**
   * Append tracking data to Google Sheets
   */
  async appendTrackingData(data: TrackingData): Promise<boolean> {
    if (!this.isUserAuthenticated()) {
      console.warn('User not authenticated. Call authenticate() first.');
      return false;
    }

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

      const response = await fetch(`${url}?valueInputOption=RAW`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Google Sheets API error: ${response.status} - ${error.error?.message || response.statusText}`);
      }

      console.log('Successfully saved tracking data to Google Sheets');
      return true;
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      return false;
    }
  }

  /**
   * Get existing tracking data from Google Sheets
   */
  async getAllTrackingData(): Promise<TrackingData[]> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.range}`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Use OAuth token if authenticated, otherwise use API key for read-only
      if (this.isUserAuthenticated()) {
        headers['Authorization'] = `Bearer ${this.accessToken}`;
      } else {
        // Fall back to API key for reading (if available)
        const apiKey = import.meta.env.PUBLIC_GOOGLE_SHEETS_API_KEY;
        if (apiKey) {
          const response = await fetch(`${url}?key=${apiKey}`);
          if (response.ok) {
            const data = await response.json();
            return this.parseSheetData(data.values || []);
          }
        }
        return [];
      }
      
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseSheetData(data.values || []);
    } catch (error) {
      console.error('Error reading from Google Sheets:', error);
      return [];
    }
  }

  /**
   * Parse sheet data into TrackingData objects
   */
  private parseSheetData(rows: string[][]): TrackingData[] {
    if (rows.length <= 1) return []; // Skip header or empty sheet
    
    return rows.slice(1).map(row => ({
      date: row[0] || '',
      breakfast: row[1] === 'TRUE',
      lunch: row[2] === 'TRUE', 
      dinner: row[3] === 'TRUE',
      exercise: row[4] === 'TRUE',
      waterGlasses: parseInt(row[5] || '0'),
      notes: row[6] || ''
    })).filter(data => data.date); // Filter out empty rows
  }

  /**
   * Update existing row for today (if it exists)
   */
  async updateTodaysData(data: TrackingData): Promise<boolean> {
    if (!this.isUserAuthenticated()) {
      return false;
    }

    try {
      const allData = await this.getAllTrackingData();
      const existingIndex = allData.findIndex(row => row.date === data.date);
      
      if (existingIndex === -1) {
        // No existing row, append new one
        return await this.appendTrackingData(data);
      }

      // Update existing row (row index + 2 because of header and 1-based indexing)
      const rowNumber = existingIndex + 2;
      const updateRange = `Sheet1!A${rowNumber}:G${rowNumber}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${updateRange}`;
      
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

      const response = await fetch(`${url}?valueInputOption=RAW`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.status}`);
      }

      console.log('Successfully updated tracking data in Google Sheets');
      return true;
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
      return false;
    }
  }

  /**
   * Sign out user
   */
  signOut(): void {
    this.accessToken = null;
    this.isAuthenticated = false;
    console.log('Signed out from Google Sheets');
  }
}