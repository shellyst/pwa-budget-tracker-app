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
};

// Successful request.
request.onsuccess = function (event) {
  // When db is successfully created with its object store.
  db = event.target.result;

  // Check if app is online.
  if (navigator.onLine) {
    uploadTransaction();
  }
};

request.onerror = function (event) {
  // Log error here.
  console.log(event.target.errorCode);
};

// This function will be executed if an attempt is made to submit a new transaction without a connection.
function saveRecord(record) {
  // Opens a new transaction with the database.
  const transaction = db.transaction(["new_transaction"], "readwrite");

  //   Access the object store for `new_transaction`.
  const transactionObjectStore = transaction.objectStore("new_transaction");

  //   Add record to your store with add method.
  transactionObjectStore.add(record);
}

function uploadTransaction() {
  // Open a transaction on your db.
  const transaction = db.transaction(["new_transaction"], "readwrite");

  // Access your object store.
  const transactionObjectStore = transaction.objectStore("new_transaction");

  // Get all records from store and set to a variable.
  const getAll = transactionObjectStore.getAll();

  // Upon a successful .getAll() execution, run this function.
  getAll.onsuccess = function () {
    // If there was data in indexedDb's store, let's send it to the api server.
    if (getAll.result.length > 0) {
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          //   Open one more transaction.
          const transaction = db.transaction(["new_transaction"], "readwrite");
          // Access the new_transaction object store.
          const transactionObjectStore =
            transaction.objectStore("new_transaction");
          // Clear all items in your store.
          transactionObjectStore.clear();

          alert("All saved transactions have been submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

// Listen for the app coming back online.
window.addEventListener("online", uploadTransaction);
