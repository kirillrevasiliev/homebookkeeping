import { useState, useEffect, useRef } from 'react'
import { firestore, firebase } from '../firebase'

export interface DocsProps extends firebase.firestore.DocumentData {
  id?: string;
  title?: string;
  limit?: number | string;
  categoryId?: string;
  amount?: string;
  description?: string;
  date?: string;
  createdAt?: string;
}

export interface QueryDocsProps {
  loading: boolean;
  docs: Array<DocsProps>;
  addDoc: (data: DocsProps) => Promise<void>;
  updateDoc: (doc: DocsProps) => Promise<void>;
}

export interface QueryDocByIdProps {
  loading: boolean;
  doc: DocsProps;
  updateDoc: (data: DocsProps) => Promise<void>;
}

export function useQueryDocs(path: string): QueryDocsProps {
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState<Array<DocsProps>>([])
  const unmounted = useRef(false)

  const init = async (): Promise<void> => {
    setLoading(true)
    try {
      const documents = await firestore
        .collection(path)
        .orderBy('createdAt', 'desc')
        .get()

      if (!unmounted.current) {
        setDocs(documents.docs.map((doc: firebase.firestore.DocumentData) => ({id: doc.id, ...doc.data()})))
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
    }
  }

  const addDoc = async (doc: DocsProps): Promise<void> => {
    try {
      const document = await firestore
        .collection(path)
        .add({...doc, createdAt: new Date().toJSON() })

      setDocs((docs: Array<DocsProps>) => [...docs, {...doc, id: document.id}])
    } catch (e) {
      console.log(e)
    }
  }

  const updateDoc = async (doc: DocsProps): Promise<void> => {
    const { id, title, limit } = doc
    try {
      await firestore
        .doc(`${path}/${id}`)
        .update({ title, limit })

      setDocs((docs: Array<DocsProps>) => docs.map(d => d.id == id ? doc : d))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    unmounted.current = false as any
    (async (): Promise<void> => await init())()
    return (): void => {
      unmounted.current = true
    }
  }, [])

  return { loading, docs, addDoc, updateDoc }
}

export function useQueryDocById(path: string, id: string): QueryDocByIdProps {
  const [loading, setLoading] = useState(false)
  const [doc, setDoc] = useState<DocsProps>({} as DocsProps)
  const unmounted = useRef(false)

  const init = async (): Promise<void> => {
    if (!id) return
    setLoading(true)
    try {
      const document: firebase.firestore.DocumentData = await firestore
        .doc(`${path}/${id}`)
        .get()

      if (!unmounted.current && document.exists) {
        setDoc({ ...document.data() })
        setLoading(false)
      }
    } catch (e) {
      if (!unmounted.current) {
        setLoading(false)
      }
    }
  }

  const updateDoc = async (_doc: DocsProps): Promise<void> => {
    try {
      await firestore
        .doc(`${path}/${id}`)
        .update({ ...doc, ..._doc })

      setDoc({...doc, ..._doc})
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    unmounted.current = false as any
    (async (): Promise<void> => await init())()
    return () => {
      unmounted.current = true
    }
  }, [id])

  return { loading, doc, updateDoc }
}
