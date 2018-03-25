const firebaseMock = require("firebase-mock");
const mockAuth = new firebaseMock.MockFirebase();
const mockDatabase = new firebaseMock.MockFirebase();
mockDatabase.autoFlush();

module.exports = firebaseMock.MockFirebaseSdk(
  function(path) {
    return path ? mockDatabase.child(path) : mockDatabase;
  },
  function() {
    return mockAuth;
  }
);
