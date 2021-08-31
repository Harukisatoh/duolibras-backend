// This wrapper is necessary because firebase has a bug that crashes nodejs when
// auth promises are rejected (even if its inside a try catch)
// More info: https://stackoverflow.com/questions/43213748/firebase-auth-invalid-email-address-crashing-node-js-express-app

// ToDo: Try to find a better way to solve this issue
async function firebaseAuthWrapper(promise) {
  const rejected = Symbol();
  const promiseResult = await promise.catch((error) => ({
    [rejected]: true,
    error: error,
  }));

  if (promiseResult && promiseResult[rejected]) {
    throw promiseResult.error;
  }

  return promiseResult;
}

module.exports = firebaseAuthWrapper;
