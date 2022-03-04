// Variable to hold db connection.
let db;

// Establish connection to IndexedDB database.
const request = indexedDB.open("budget_tracker", 1);

// Event will emit if the database version changes.
request.onupgradeneeded = function (event) {
  // Save a reference to the database.
  const db = event.target.result;
  // Create an object store.
  db.createObjectStore("new_transaction", { autoIncrement: true });

  // Successful request.
  request.onsuccess = function (event) {
    // When db is successfully created with its object store.
    db = event.target.result;

    // Check if app is online.
    if (navigator.onLine) {
      //updloadTransaction.
    }
  };

  request.onerror = function (event) {
    // Log error here.
    console.log(event.target.errorCode);
  };
};
