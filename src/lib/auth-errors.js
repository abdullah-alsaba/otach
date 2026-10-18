/**
 * Otach — customer-facing error copy.
 * Every message here is what a shopper reads, so it stays free of Firebase
 * codes, field names and other implementation detail.
 */

export function getAuthErrorMessage(error) {
  const code = error?.code || "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Those details don't match an account. Please try again.";
    case "auth/email-already-in-use":
      return "An account already exists for this email. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Please choose a password of at least 6 characters.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "We couldn't reach Otach. Please check your connection and try again.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google window. Allow popups and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was closed before it finished.";
    case "auth/account-exists-with-different-credential":
      return "This email is already registered with a password. Please sign in with it instead.";
    case "auth/unauthorized-domain":
      return "Google sign-in isn't available on this address yet. Please use your email and password.";
    case "auth/operation-not-allowed":
      return "Google sign-in isn't enabled for Otach yet. Please use your email and password.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact our client services team.";
    default:
      return "We couldn't complete that request. Please try again.";
  }
}

/**
 * Closing the Google account chooser is a deliberate decision, not a failure —
 * callers use this to stay quiet instead of raising an error message.
 */
export function isAuthCancellation(error) {
  const code = error?.code || "";
  return (
    code === "auth/popup-closed-by-user" ||
    code === "auth/cancelled-popup-request" ||
    code === "auth/user-cancelled"
  );
}

export function getFirestoreErrorMessage(error) {
  const code = error?.code || "";

  switch (code) {
    case "permission-denied":
      return "You do not have permission to complete this action.";
    case "unauthenticated":
      return "Please sign in to continue.";
    case "unavailable":
      return "We couldn't reach Otach. Please try again.";
    case "deadline-exceeded":
      return "That request took too long. Please try again.";
    case "not-found":
      return "This timepiece could not be found.";
    case "already-exists":
      return "That record already exists.";
    case "resource-exhausted":
      return "Otach is busy right now. Please try again in a moment.";
    case "failed-precondition":
      return "That request couldn't be completed. Please try again.";
    default:
      // Messages thrown by our own helpers are already shopper-friendly; anything
      // originating from the SDK is replaced with a neutral line.
      if (typeof error?.message === "string" && error.message && !error.message.startsWith("Firebase")) {
        return error.message;
      }
      return "We couldn't complete that request. Please try again.";
  }
}

export function isSafeInternalPath(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !path.includes("://");
}
