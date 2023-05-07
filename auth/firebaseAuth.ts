import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import firebaseApp from './firebaseConfig';

const auth = getAuth(firebaseApp);

export async function signUp(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

export async function signIn(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

export async function logOut() {
  let result = null;
  let error = null;

  try {
    await signOut(auth);
    result = true as const;
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

export function onAuthChanged(listener: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => listener(user));
}
