/**
 * Utility functions for storing analysis history
 * Key: 'kodnest_analysis_history'
 */

const STORAGE_KEY = 'kodnest_analysis_history';

/**
 * Save a new analysis result to localStorage
 */
export const saveAnalysis = (analysis) => {
  try {
    const existingHistory = getHistory();
    const newHistory = [analysis, ...existingHistory];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return true;
  } catch (error) {
    console.error('Failed to save analysis:', error);
    return false;
  }
};

/**
 * Get all history items, sorted by newest first
 */
export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve history:', error);
    return [];
  }
};

/**
 * Get a specific analysis by ID
 */
export const getAnalysisById = (id) => {
  try {
    const history = getHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Failed to retrieve specific analysis:', error);
    return null;
  }
};

/**
 * Clear all history
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
};
