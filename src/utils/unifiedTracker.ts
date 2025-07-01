import { LocalTracker } from './localTracker';
import { GoogleSheetsOAuthTracker, type TrackingData } from './googleSheetsOAuth';

export class UnifiedTracker {
  private localTracker: LocalTracker;
  private googleSheetsTracker: GoogleSheetsOAuthTracker;
  private syncStatus: 'idle' | 'syncing' | 'error' | 'auth_required' = 'idle';
  private lastSyncError: string | null = null;

  constructor() {
    this.localTracker = new LocalTracker();
    this.googleSheetsTracker = new GoogleSheetsOAuthTracker();
  }

  getSyncStatus() {
    return {
      status: this.syncStatus,
      error: this.lastSyncError,
      isAuthenticated: this.googleSheetsTracker.isUserAuthenticated()
    };
  }

  async authenticateGoogleSheets(): Promise<boolean> {
    this.syncStatus = 'syncing';
    this.updateSyncStatusUI('syncing');
    
    try {
      const success = await this.googleSheetsTracker.authenticate();
      if (success) {
        this.syncStatus = 'idle';
        this.updateSyncStatusUI('success', 'Connected to Google Sheets');
      } else {
        this.syncStatus = 'auth_required';
        this.updateSyncStatusUI('error', 'Authentication failed');
      }
      return success;
    } catch (error) {
      this.syncStatus = 'auth_required';
      this.updateSyncStatusUI('error', 'Authentication error');
      return false;
    }
  }

  signOutGoogleSheets(): void {
    this.googleSheetsTracker.signOut();
    this.syncStatus = 'auth_required';
    this.updateSyncStatusUI('error', 'Signed out from Google Sheets');
  }

  async saveTrackingData(data: TrackingData): Promise<boolean> {
    // Always save to local storage first (for offline support)
    const localSaved = this.localTracker.saveTrackingData(data);
    
    if (!localSaved) {
      console.error('Failed to save to local storage');
      return false;
    }

    // Try to save to Google Sheets if authenticated
    if (!this.googleSheetsTracker.isUserAuthenticated()) {
      this.syncStatus = 'auth_required';
      this.updateSyncStatusUI('auth_required', 'Google Sheets authentication required');
      return true; // Local save succeeded
    }

    this.syncStatus = 'syncing';
    this.updateSyncStatusUI('syncing');
    
    try {
      const cloudSaved = await this.googleSheetsTracker.updateTodaysData(data);
      
      if (cloudSaved) {
        this.syncStatus = 'idle';
        this.lastSyncError = null;
        this.updateSyncStatusUI('success');
        console.log('Successfully synced to Google Sheets');
      } else {
        throw new Error('Failed to save to Google Sheets');
      }
      
      return true;
    } catch (error) {
      this.syncStatus = 'error';
      this.lastSyncError = error instanceof Error ? error.message : 'Unknown error';
      this.updateSyncStatusUI('error', this.lastSyncError);
      console.error('Google Sheets sync failed, but local save succeeded:', error);
      
      // Return true because local save succeeded
      return true;
    }
  }

  getTrackingData(date: string): TrackingData | null {
    // Always return local data (it should be in sync with cloud)
    return this.localTracker.getTrackingData(date);
  }

  getAllTrackingData(): Record<string, TrackingData> {
    return this.localTracker.getAllData();
  }

  exportToCSV(): string {
    return this.localTracker.exportAsCSV();
  }

  getSummary(): {
    totalDays: number;
    breakfastCompleted: number;
    lunchCompleted: number;
    dinnerCompleted: number;
    exerciseCompleted: number;
    averageWater: number;
  } {
    return this.localTracker.getSummary();
  }

  getAllData(): { [date: string]: TrackingData } {
    return this.localTracker.getAllData();
  }

  async syncFromGoogleSheets(date: string): Promise<void> {
    if (!this.googleSheetsTracker.isUserAuthenticated()) {
      console.log('Not authenticated, skipping Google Sheets sync');
      return;
    }

    try {
      const allCloudData = await this.googleSheetsTracker.getAllTrackingData();
      const cloudData = allCloudData.find(data => data.date === date);
      
      if (cloudData) {
        this.localTracker.saveTrackingData(cloudData);
        console.log('Synced data from Google Sheets to local storage');
      }
    } catch (error) {
      console.error('Failed to sync from Google Sheets:', error);
    }
  }

  async migrateExistingDataToGoogleSheets(): Promise<{success: number, failed: number}> {
    const allData = this.getAllTrackingData();
    const dates = Object.keys(allData).sort();
    let success = 0;
    let failed = 0;

    this.updateSyncStatusUI('migrating', `Migrating ${dates.length} days of data...`);

    for (const date of dates) {
      try {
        const data = allData[date];
        const saved = await this.googleSheetsTracker.appendTrackingData(data);
        if (saved) {
          success++;
        } else {
          failed++;
        }
        
        // Update progress
        this.updateSyncStatusUI('migrating', `Migrated ${success} of ${dates.length} days...`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to migrate data for ${date}:`, error);
        failed++;
      }
    }

    const message = `Migration complete: ${success} succeeded, ${failed} failed`;
    this.updateSyncStatusUI(failed === 0 ? 'success' : 'error', message);
    
    return { success, failed };
  }

  private updateSyncStatusUI(status: 'syncing' | 'success' | 'error' | 'migrating' | 'auth_required', message?: string) {
    const statusElement = document.getElementById('save-status');
    if (!statusElement) return;

    switch (status) {
      case 'syncing':
        statusElement.innerHTML = '<span class="text-blue-600">🔄 Syncing to Google Sheets...</span>';
        statusElement.className = 'mt-2 text-sm';
        break;
      case 'success':
        statusElement.innerHTML = '<span class="text-emerald-600">✓ Saved to Google Sheets</span>';
        statusElement.className = 'mt-2 text-sm';
        break;
      case 'error':
        statusElement.innerHTML = `<span class="text-red-600">⚠️ Cloud sync failed (saved locally): ${message || ''}</span>`;
        statusElement.className = 'mt-2 text-sm';
        break;
      case 'auth_required':
        statusElement.innerHTML = `<span class="text-amber-600">🔑 ${message || 'Google Sheets authentication required'}</span>`;
        statusElement.className = 'mt-2 text-sm';
        break;
      case 'migrating':
        statusElement.innerHTML = `<span class="text-blue-600">📤 ${message || 'Migrating data...'}</span>`;
        statusElement.className = 'mt-2 text-sm';
        break;
    }
  }
}

// Helper functions for easy integration
export async function saveCurrentTrackingState(tracker: UnifiedTracker, date: Date): Promise<boolean> {
  const dateString = date.toISOString().split('T')[0];
  
  // Get current state from UI
  const breakfast = (document.querySelector('#breakfast-check') as HTMLInputElement)?.checked || false;
  const lunch = (document.querySelector('#lunch-check') as HTMLInputElement)?.checked || false;
  const dinner = (document.querySelector('#dinner-check') as HTMLInputElement)?.checked || false;
  const exercise = (document.querySelector('#exercise-check') as HTMLInputElement)?.checked || false;
  
  // Get water count from display (since it's managed separately)
  const waterDisplay = document.getElementById('water-count');
  const waterGlasses = parseInt(waterDisplay?.textContent || '0');

  const trackingData: TrackingData = {
    date: dateString,
    breakfast,
    lunch,
    dinner,
    exercise,
    waterGlasses,
    notes: `Mediterranean Diet Day - Week ${Math.ceil((date.getDay() + 1) / 7)}`
  };

  return await tracker.saveTrackingData(trackingData);
}

export async function loadCurrentTrackingState(tracker: UnifiedTracker, date: Date): Promise<void> {
  const dateString = date.toISOString().split('T')[0];
  
  // Try to sync from Google Sheets first
  await tracker.syncFromGoogleSheets(dateString);
  
  // Load from local storage (which may have been updated by sync)
  const data = tracker.getTrackingData(dateString);
  
  if (data) {
    // Update UI elements
    const breakfastCheck = document.querySelector('#breakfast-check') as HTMLInputElement;
    const lunchCheck = document.querySelector('#lunch-check') as HTMLInputElement;
    const dinnerCheck = document.querySelector('#dinner-check') as HTMLInputElement;
    const exerciseCheck = document.querySelector('#exercise-check') as HTMLInputElement;
    const waterDisplay = document.getElementById('water-count');

    if (breakfastCheck) breakfastCheck.checked = data.breakfast;
    if (lunchCheck) lunchCheck.checked = data.lunch;
    if (dinnerCheck) dinnerCheck.checked = data.dinner;
    if (exerciseCheck) exerciseCheck.checked = data.exercise;
    if (waterDisplay) waterDisplay.textContent = data.waterGlasses.toString();
  }
}