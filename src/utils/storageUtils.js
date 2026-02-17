const STORAGE_KEY = 'kodnest_analysis_history';

export const saveAnalysis = (analysisData) => {
  try {
    const history = getHistory();
    history.unshift(analysisData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error("Failed to save analysis:", error);
    return false;
  }
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    // Robust parsing
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      console.warn("History data is not an array, resetting.");
      return [];
    }
    
    // Filter out corrupted entries (missing ID or createdAt)
    return parsed.filter(item => item && item.id && item.createdAt);
  } catch (error) {
    console.error("Failed to parse history:", error);
    return [];
  }
};

export const getAnalysisById = (id) => {
  const history = getHistory();
  return history.find(item => item.id === id);
};

export const updateAnalysis = (id, updates) => {
  try {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    
    if (index !== -1) {
      history[index] = { 
        ...history[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      return history[index];
    }
    return null;
  } catch (error) {
     console.error("Failed to update analysis:", error);
     return null;
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
