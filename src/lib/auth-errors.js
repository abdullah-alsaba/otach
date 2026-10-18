export function getAuthErrorMessage(error) {
  const code = error?.code || "";

  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please try again.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/popup-blocked":
      return "The sign-in popup was blocked. Allow popups or try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled before it completed.";
    case "auth/cancelled-popup-request":
      return "Sign-in was interrupted. Please try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled for this project.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support for help.";
    case "auth/missing-password":
      return "Password is required.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function getFirestoreErrorMessage(error) {
  const code = error?.code || "";

  switch (code) {
    case "permission-denied":
      return "You do not have permission to complete this action.";
    case "unauthenticated":
      return "Please sign in to continue.";
    case "unavailable":
      return "The service is temporarily unavailable. Please try again.";
    case "not-found":
      return "This timepiece could not be found.";
    default:
      if (typeof error?.message === "string" && error.message && !error.message.startsWith("Firebase")) {
        return error.message;
      }
      return "Unable to complete this request. Please try again.";
  }
}

export function isSafeInternalPath(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !path.includes("://");
}
