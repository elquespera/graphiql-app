import { setIsAuth } from '@/redux/auth';
import { store } from '@/redux/store';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import firebaseApp from './firebaseConfig';

const auth = getAuth(firebaseApp);

export async function signUp(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as Error;
  }

  return { result, error };
}

export async function signIn(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as Error;
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
    error = e as Error;
  }

  return { result, error };
}

onAuthStateChanged(auth, (user) => {
  store.dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email }));
});
