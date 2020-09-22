import { auth, firebase } from '../firebase'

export interface FirebaseAuthProps {
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => void;
}

export function useFirebaseAuth(): FirebaseAuthProps {
  const login = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const logout = async (): Promise<void> => {
    await  auth.signOut()
  }

  const register = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return await auth.createUserWithEmailAndPassword(email, password)
  }

  return { login, logout, register }
}

export function useUserId(): string {
  const user = auth.currentUser
  return user ? user.uid : ''
}
