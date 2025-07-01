import { LocalTracker } from './localTracker';
import { JSONBinTracker, type TrackingData } from './jsonBinTracker';
import { toLocalDateString } from './dateUtils';

export class SimpleUnifiedTracker {
  private localTracker: LocalTracker;
  private jsonBinTracker: JSONBinTracker;
  private syncStatus: 'idle' | 'syncing' | 'error' = 'idle';
  private lastSyncError: string | null = null;
  private syncDebounceTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.localTracker = new LocalTracker();
    this.jsonBinTracker = new JSONBinTracker();
    
    // Load cloud data on initialization (silently)
    this.syncFromCloud().catch(() => {
      console.log('Initial cloud sync failed, using local data only');
    });
    
    // Preload last 7 days of data
    this.preloadRecentData().catch(() => {
      console.log('Failed to preload recent data');
    });
  }

  /**
   * Save tracking data (local first, then cloud)
   */
  async saveTrackingData(data: TrackingData): Promise<boolean> {
    // Always save to local storage first
    const localSaved = this.localTracker.saveTrackingData(data);
    
    if (!localSaved) {
      console.error('Failed to save to local storage');
      return false;
    }

    // Debounce cloud sync (wait 2 seconds after last change)
    if (this.syncDebounceTimer) {
      clearTimeout(this.syncDebounceTimer);
    }

    this.syncDebounceTimer = setTimeout(() => {
      this.syncToCloud();
    }, 2000);

    return true;
  }

  /**
   * Get tracking data for a specific date
   */
  getTrackingData(date: string): TrackingData | null {
    return this.localTracker.getTrackingData(date);
  }

  /**
   * Get all tracking data
   */
  getAllTrackingData(): Record<string, TrackingData> {
    return this.localTracker.getAllData();
  }

  /**
   * Alias for getAllTrackingData for backward compatibility
   */
  getAllData(): Record<string, TrackingData> {
    return this.getAllTrackingData();
  }

  /**
   * Export data as CSV
   */
  exportToCSV(): string {
    return this.localTracker.exportAsCSV();
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    return this.localTracker.getSummary();
  }

  /**
   * Sync local data to cloud
   */
  async syncToCloud(): Promise<boolean> {
    if (!this.jsonBinTracker.isConfigured()) {
      this.updateSyncStatusUI('error', 'Cloud storage not configured');
      return false;
    }

    this.syncStatus = 'syncing';
    this.updateSyncStatusUI('syncing');

    try {
      const allData = this.getAllTrackingData();
      const success = await this.jsonBinTracker.saveAllData(allData);
      
      if (success) {
        this.syncStatus = 'idle';
        this.lastSyncError = null;
        this.updateSyncStatusUI('success');
        console.log('Successfully synced to cloud');
      } else {
        throw new Error('Failed to save to cloud');
      }
      
      return success;
    } catch (error) {
      this.syncStatus = 'error';
      this.lastSyncError = error instanceof Error ? error.message : 'Unknown error';
      this.updateSyncStatusUI('error', this.lastSyncError);
      console.error('Cloud sync failed:', error);
      return false;
    }
  }

  /**
   * Load data from cloud and merge with local
   */
  async syncFromCloud(): Promise<void> {
    if (!this.jsonBinTracker.isConfigured()) {
      console.log('Cloud storage not configured, using local data only');
      return;
    }

    try {
      this.updateSyncStatusUI('syncing', 'Loading from cloud...');
      const cloudData = await this.jsonBinTracker.loadAllData();
      const localData = this.getAllTrackingData();
      
      // Merge cloud data with local data (local takes precedence for conflicts)
      const mergedData = { ...cloudData };
      
      // Update local storage with any missing data from cloud
      let newDataCount = 0;
      for (const [date, data] of Object.entries(cloudData)) {
        if (!localData[date]) {
          this.localTracker.saveTrackingData(data);
          newDataCount++;
        }
      }
      
      if (newDataCount > 0) {
        console.log(`Loaded ${newDataCount} new entries from cloud`);
        this.updateSyncStatusUI('success', `Synced ${newDataCount} entries from cloud`);
      } else {
        // Don't show UI message on initial load if already synced
        console.log('Cloud data is in sync with local');
      }
    } catch (error) {
      console.error('Failed to sync from cloud:', error);
      this.updateSyncStatusUI('error', 'Failed to load from cloud');
    }
  }

  /**
   * Force sync now (bypass debounce)
   */
  async forceSyncNow(): Promise<boolean> {
    if (this.syncDebounceTimer) {
      clearTimeout(this.syncDebounceTimer);
      this.syncDebounceTimer = null;
    }
    return this.syncToCloud();
  }

  /**
   * Get sync status
   */
  getSyncStatus() {
    return {
      status: this.syncStatus,
      error: this.lastSyncError,
      isConfigured: this.jsonBinTracker.isConfigured()
    };
  }

  /**
   * Preload last 7 days of data from cloud
   */
  async preloadRecentData(): Promise<void> {
    if (!this.jsonBinTracker.isConfigured()) {
      console.log('Cloud storage not configured, skipping preload');
      return;
    }

    try {
      const today = new Date();
      const dates: string[] = [];
      
      // Generate date strings for last 7 days including today
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(toLocalDateString(date));
      }
      
      console.log('Preloading data for dates:', dates);
      
      // Load all data from cloud
      const cloudData = await this.jsonBinTracker.loadAllData();
      
      // Save recent data to local storage
      let loadedCount = 0;
      for (const dateStr of dates) {
        if (cloudData[dateStr] && !this.localTracker.getTrackingData(dateStr)) {
          this.localTracker.saveTrackingData(cloudData[dateStr]);
          loadedCount++;
        }
      }
      
      if (loadedCount > 0) {
        console.log(`Preloaded ${loadedCount} days of recent data from cloud`);
      }
    } catch (error) {
      console.error('Failed to preload recent data:', error);
    }
  }

  /**
   * Load data for a specific date from cloud
   */
  async loadDataForDate(date: Date): Promise<TrackingData | null> {
    const dateString = toLocalDateString(date);
    
    // First check local storage
    let data = this.localTracker.getTrackingData(dateString);
    
    // If not found locally and cloud is configured, try loading from cloud
    if (!data && this.jsonBinTracker.isConfigured()) {
      try {
        this.updateSyncStatusUI('syncing', 'Loading from cloud...');
        const cloudData = await this.jsonBinTracker.loadAllData();
        
        if (cloudData[dateString]) {
          // Save to local storage
          this.localTracker.saveTrackingData(cloudData[dateString]);
          data = cloudData[dateString];
          this.updateSyncStatusUI('success', 'Loaded from cloud');
        } else {
          this.updateSyncStatusUI('success', 'No data for this date');
        }
      } catch (error) {
        console.error('Failed to load from cloud:', error);
        this.updateSyncStatusUI('error', 'Failed to load from cloud');
      }
    }
    
    return data;
  }

  /**
   * Update UI with sync status
   */
  private updateSyncStatusUI(status: 'syncing' | 'success' | 'error', message?: string) {
    const statusElement = document.getElementById('save-status');
    if (!statusElement) return;

    switch (status) {
      case 'syncing':
        statusElement.innerHTML = `<span class="text-blue-600">🔄 ${message || 'Syncing to cloud...'}</span>`;
        break;
      case 'success':
        statusElement.innerHTML = `<span class="text-emerald-600">✓ ${message || 'Saved to cloud'}</span>`;
        break;
      case 'error':
        statusElement.innerHTML = `<span class="text-amber-600">⚠️ Saved locally (cloud: ${message || 'offline'})</span>`;
        break;
    }
  }
}

// Helper functions
export async function saveCurrentTrackingState(tracker: SimpleUnifiedTracker, date: Date): Promise<boolean> {
  const dateString = toLocalDateString(date);
  
  const breakfast = (document.querySelector('#breakfast-check') as HTMLInputElement)?.checked || false;
  const lunch = (document.querySelector('#lunch-check') as HTMLInputElement)?.checked || false;
  const dinner = (document.querySelector('#dinner-check') as HTMLInputElement)?.checked || false;
  const exercise = (document.querySelector('#exercise-check') as HTMLInputElement)?.checked || false;
  const alcoholFree = (document.querySelector('#alcohol-free-check') as HTMLInputElement)?.checked || false;
  const notesElement = document.querySelector('#daily-notes') as HTMLTextAreaElement;
  const notes = notesElement ? notesElement.value : '';
  
  const waterDisplay = document.getElementById('water-count');
  const waterGlasses = parseInt(waterDisplay?.textContent || '0');
  
  const weightInput = (document.querySelector('#weight-input') as HTMLInputElement)?.value;
  const weight = weightInput ? parseFloat(weightInput) : undefined;

  const trackingData: TrackingData = {
    date: dateString,
    breakfast,
    lunch,
    dinner,
    exercise,
    waterGlasses,
    alcoholFree,
    weight,
    notes: notes
  };

  return await tracker.saveTrackingData(trackingData);
}

export async function loadCurrentTrackingState(tracker: SimpleUnifiedTracker, date: Date): Promise<void> {
  // Load data from cloud if needed
  const data = await tracker.loadDataForDate(date);
  
  // Get all the form elements
  const breakfastCheck = document.querySelector('#breakfast-check') as HTMLInputElement;
  const lunchCheck = document.querySelector('#lunch-check') as HTMLInputElement;
  const dinnerCheck = document.querySelector('#dinner-check') as HTMLInputElement;
  const exerciseCheck = document.querySelector('#exercise-check') as HTMLInputElement;
  const alcoholFreeCheck = document.querySelector('#alcohol-free-check') as HTMLInputElement;
  const notesField = document.querySelector('#daily-notes') as HTMLTextAreaElement;
  const waterDisplay = document.getElementById('water-count');
  const weightInput = document.querySelector('#weight-input') as HTMLInputElement;
  
  if (data) {
    // Load existing data
    if (breakfastCheck) breakfastCheck.checked = data.breakfast;
    if (lunchCheck) lunchCheck.checked = data.lunch;
    if (dinnerCheck) dinnerCheck.checked = data.dinner;
    if (exerciseCheck) exerciseCheck.checked = data.exercise;
    if (alcoholFreeCheck) alcoholFreeCheck.checked = data.alcoholFree || false;
    if (notesField) notesField.value = data.notes || '';
    if (waterDisplay) waterDisplay.textContent = data.waterGlasses.toString();
    if (weightInput) weightInput.value = data.weight ? data.weight.toString() : '';
  } else {
    // Clear all fields when no data exists for this date
    if (breakfastCheck) breakfastCheck.checked = false;
    if (lunchCheck) lunchCheck.checked = false;
    if (dinnerCheck) dinnerCheck.checked = false;
    if (exerciseCheck) exerciseCheck.checked = false;
    if (alcoholFreeCheck) alcoholFreeCheck.checked = false;
    if (notesField) notesField.value = '';
    if (waterDisplay) waterDisplay.textContent = '0';
    if (weightInput) weightInput.value = '';
  }
}