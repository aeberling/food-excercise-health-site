// JSONBin.io tracker for simple cloud storage
export interface TrackingData {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  exercise: boolean;
  waterGlasses: number;
  notes?: string;
}

export class JSONBinTracker {
  private binId: string;
  private apiKey: string;
  private baseUrl = 'https://api.jsonbin.io/v3';

  constructor() {
    this.binId = import.meta.env.PUBLIC_JSONBIN_ID || '';
    
    // Temporary fix: hardcode the API key due to Vite env var issue with $ characters
    // TODO: Move to server-side API or use a different auth method
    const envKey = import.meta.env.PUBLIC_JSONBIN_KEY || '';
    
    // If the key is truncated (less than 60 chars), use the hardcoded one
    if (envKey && envKey.length < 60) {
      console.warn('API key was truncated by Vite, using hardcoded key');
      this.apiKey = '$2a$10$CxSu0lm8PAzkSeYbBCxZ3.hJd789yGDxwt6BcpOnnSNIpREjWbs4.';
    } else {
      this.apiKey = envKey;
    }
    
    if (!this.binId || !this.apiKey) {
      console.warn('JSONBin.io credentials not configured');
    } else {
      console.log('JSONBin.io configured with bin:', this.binId);
      console.log('API Key loaded: Yes (length: ' + this.apiKey.length + ')');
    }
  }

  /**
   * Load all tracking data from JSONBin
   */
  async loadAllData(): Promise<Record<string, TrackingData>> {
    if (!this.binId || !this.apiKey) {
      console.warn('JSONBin.io not configured, returning empty data');
      return {};
    }

    try {
      // Try to read the bin - it might be public or private
      const response = await fetch(`${this.baseUrl}/b/${this.binId}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.apiKey
        }
      });

      if (!response.ok) {
        // If 401, the bin might be private and needs proper auth
        // If 404, the bin doesn't exist or we don't have access
        const errorText = await response.text();
        
        if (response.status === 401) {
          console.warn('JSONBin.io authentication failed. The bin might be private.');
        } else if (response.status === 404) {
          console.warn('JSONBin.io bin not found or no access.');
        }
        
        // Return empty data instead of throwing
        return {};
      }

      const data = await response.json();
      console.log('Successfully loaded data from JSONBin.io');
      
      // JSONBin returns the data with metadata by default
      // The actual data is in the 'record' property
      return data.record || data || {};
    } catch (error) {
      console.error('Error loading from JSONBin.io:', error);
      return {};
    }
  }

  /**
   * Save all tracking data to JSONBin
   */
  async saveAllData(data: Record<string, TrackingData>): Promise<boolean> {
    if (!this.binId || !this.apiKey) {
      console.warn('JSONBin.io not configured');
      return false;
    }

    try {
      console.log('Attempting to save to JSONBin...');
      console.log('Bin ID:', this.binId);
      console.log('API Key first chars:', this.apiKey.substring(0, 10));
      console.log('API Key last chars:', this.apiKey.slice(-10));
      
      // JSONBin requires PUT method to update a bin
      const response = await fetch(`${this.baseUrl}/b/${this.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.apiKey
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('JSONBin.io save error:', errorText);
        
        if (response.status === 401) {
          console.error('Authentication failed. Check your API key.');
        } else if (response.status === 403) {
          console.error('Forbidden. You may not have write access to this bin.');
        }
        
        return false;
      }

      const result = await response.json();
      console.log('Successfully saved data to JSONBin.io', result.metadata?.id);
      return true;
    } catch (error) {
      console.error('Error saving to JSONBin.io:', error);
      return false;
    }
  }

  /**
   * Check if JSONBin is configured
   */
  isConfigured(): boolean {
    return !!(this.binId && this.apiKey);
  }
}