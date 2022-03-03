import React,{createContext} from 'react'
import { getFirestore, doc, DocumentData } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firebaseConfig } from '@utils/config';
import {initializeApp} from 'firebase/app';

const FirebaseContext = createContext<DocumentData>({});

const FirebaseContextProvider = ({children}) => {
  const app = initializeApp(firebaseConfig);
  const [data, loading, error] = useDocumentData(doc(getFirestore(app), firebaseConfig.databaseId, firebaseConfig.documentId));

  return (
    <FirebaseContext.Provider value={{data, loading, error }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebaseContext = () => {
  return React.useContext(FirebaseContext);
}

export default FirebaseContextProvider