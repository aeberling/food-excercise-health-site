// Local storage tracker with export functionality
export interface TrackingData {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  exercise: boolean;
  waterGlasses: number;
  notes?: string;
}

const STORAGE_KEY = 'mediterranean-health-tracking';

export class LocalTracker {
  /**
   * Save tracking data for today
   */
  saveTrackingData(data: TrackingData): boolean {
    try {
      const existing = this.getAllData();
      existing[data.date] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      console.log('Saved tracking data locally:', data);
      return true;
    } catch (error) {
      console.error('Error saving tracking data:', error);
      return false;
    }
  }

  /**
   * Get tracking data for a specific date
   */
  getTrackingData(date: string): TrackingData | null {
    try {
      const data = this.getAllData();
      return data[date] || null;
    } catch (error) {
      console.error('Error loading tracking data:', error);
      return null;
    }
  }

  /**
   * Get all tracking data
   */
  getAllData(): { [date: string]: TrackingData } {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading all tracking data:', error);
      return {};
    }
  }

  /**
   * Export data as CSV for manual import to Google Sheets
   */
  exportAsCSV(): string {
    const data = this.getAllData();
    const entries = Object.values(data).sort((a, b) => a.date.localeCompare(b.date));
    
    const headers = ['Date', 'Breakfast', 'Lunch', 'Dinner', 'Exercise', 'Water Glasses', 'Notes'];
    const rows = entries.map(entry => [
      entry.date,
      entry.breakfast ? 'TRUE' : 'FALSE',
      entry.lunch ? 'TRUE' : 'FALSE',
      entry.dinner ? 'TRUE' : 'FALSE',
      entry.exercise ? 'TRUE' : 'FALSE',
      entry.waterGlasses.toString(),
      entry.notes || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Download data as CSV file
   */
  downloadCSV(): void {
    const csv = this.exportAsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `mediterranean-health-tracking-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Get summary statistics
   */
  getSummary(): {
    totalDays: number;
    breakfastCompleted: number;
    lunchCompleted: number;
    dinnerCompleted: number;
    exerciseCompleted: number;
    averageWater: number;
  } {
    const data = Object.values(this.getAllData());
    
    return {
      totalDays: data.length,
      breakfastCompleted: data.filter(d => d.breakfast).length,
      lunchCompleted: data.filter(d => d.lunch).length,
      dinnerCompleted: data.filter(d => d.dinner).length,
      exerciseCompleted: data.filter(d => d.exercise).length,
      averageWater: data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.waterGlasses, 0) / data.length) : 0
    };
  }
}

// Utility functions for easier integration
export function saveCurrentTrackingState(): boolean {
  const tracker = new LocalTracker();
  const today = new Date().toISOString().split('T')[0];
  
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

  return tracker.saveTrackingData(trackingData);
}

export function loadCurrentTrackingState(): void {
  const tracker = new LocalTracker();
  const today = new Date().toISOString().split('T')[0];
  const data = tracker.getTrackingData(today);
  
  if (data) {
    // Update checkboxes
    const breakfastCheck = document.querySelector<HTMLInputElement>('#breakfast-check');
    const lunchCheck = document.querySelector<HTMLInputElement>('#lunch-check');
    const dinnerCheck = document.querySelector<HTMLInputElement>('#dinner-check');
    const exerciseCheck = document.querySelector<HTMLInputElement>('#exercise-check');
    const waterDisplay = document.getElementById('water-count');

    if (breakfastCheck) breakfastCheck.checked = data.breakfast;
    if (lunchCheck) lunchCheck.checked = data.lunch;
    if (dinnerCheck) dinnerCheck.checked = data.dinner;
    if (exerciseCheck) exerciseCheck.checked = data.exercise;
    
    // Update water count
    if (waterDisplay) {
      waterDisplay.textContent = data.waterGlasses.toString();
      localStorage.setItem('waterCount', data.waterGlasses.toString());
    }

    console.log('Loaded tracking data from local storage:', data);
  }
}