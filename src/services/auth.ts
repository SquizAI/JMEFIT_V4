import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp,
  runTransaction
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface User {
  uid: string;
  email: string;
  role: 'user' | 'admin';
  displayName?: string;
}

const handleAuthError = (error: AuthError): never => {
  let message = 'Authentication failed';
  
  switch (error.code) {
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection.';
      break;
    case 'auth/email-already-in-use':
      message = 'Email is already registered.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address.';
      break;
    case 'auth/operation-not-allowed':
      message = 'Operation not allowed.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled.';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email.';
      break;
    case 'auth/wrong-password':
      message = 'Invalid password.';
      break;
    default:
      message = error.message;
  }

  throw new Error(message);
};

const createInitialAdmin = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await runTransaction(db, async (transaction) => {
        const adminRef = doc(db, 'users', 'admin');
        const adminDoc = await transaction.get(adminRef);

        if (!adminDoc.exists()) {
          const adminEmail = 'admin@jmefit.com';
          const adminPassword = 'admin123';

          try {
            const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
            
            transaction.set(doc(db, 'users', userCredential.user.uid), {
              email: adminEmail,
              role: 'admin',
              displayName: 'Admin',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });

            // Create demo user
            const demoEmail = 'user@jmefit.com';
            const demoPassword = 'user123';

            const demoCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
            
            transaction.set(doc(db, 'users', demoCredential.user.uid), {
              email: demoEmail,
              role: 'user',
              displayName: 'Demo User',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          } catch (error: any) {
            if (error.code !== 'auth/email-already-in-use') {
              throw error;
            }
          }
        }
      });
      break;
    } catch (error) {
      if (i === retries - 1) {
        console.error('Failed to initialize users after retries:', error);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
};

// Initialize users
createInitialAdmin().catch(console.error);

export const AuthService = {
  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userData = {
        email: user.email!,
        role: 'user',
        displayName: user.displayName || email.split('@')[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      return {
        uid: user.uid,
        ...userData,
        role: 'user'
      };
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (!userData) {
        throw new Error('User data not found');
      }

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });

      return {
        uid: user.uid,
        email: user.email!,
        role: userData.role,
        displayName: userData.displayName
      };
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  async logout(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          lastLogoutAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
      await signOut(auth);
    } catch (error: any) {
      throw handleAuthError(error);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (!userData) {
        return null;
      }

      return {
        uid: user.uid,
        email: user.email!,
        role: userData.role,
        displayName: userData.displayName
      };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  onAuthChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        if (!userData) {
          callback(null);
          return;
        }

        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          role: userData.role,
          displayName: userData.displayName
        });
      } catch (error) {
        console.error('Auth change error:', error);
        callback(null);
      }
    });
  }
};