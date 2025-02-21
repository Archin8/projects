export const saveAttempt = (attempt) => {
    if (!('indexedDB' in window)) return;
  
    const request = indexedDB.open('QuizDatabase', 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('attempts')) {
        db.createObjectStore('attempts', { autoIncrement: true });
      }
    };
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['attempts'], 'readwrite');
      const store = transaction.objectStore('attempts');
      store.add(attempt);
    };
  };