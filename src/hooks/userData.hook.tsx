import { useEffect, useState } from 'react'
import { firebase, firestore, storage } from '../firebase'
import { useUserId } from './auth.hook'
import { AVATAR_DEFAULT } from '../const'
import { toast } from '../utils/toast'

export interface AvatarFile {
  url: string;
  file: File;
}

export interface UserDataType {
  bill?: number;
  name?: string;
  avatarUrl?: string;
  newAvatar?: AvatarFile;
  id?: string;
}

export interface UserDataProp {
  userData: UserDataType;
  updateUserData: (data: UserDataType, c?: () => void) => Promise<void>;
  userCreate: (data: UserDataType) => Promise<void>;
  globalLoading: boolean;
}

export function useUserData(): UserDataProp {
  const uid = useUserId()
  const [user, setUser] = useState<UserDataType>({} as UserDataType)
  const [globalLoading, setGlobalLoading] = useState(true)

  const init = async (): Promise<void> => {
    if (!uid) return setGlobalLoading(false)
    setGlobalLoading(true)
    try {
      const userData: firebase.firestore.DocumentData = await firestore.doc(`users/${uid}`).get()
      //
      userData.exists && setUser(userData.data().info)
    } catch (e) {

    }
    setGlobalLoading(false)
  }

  const deleteAvatar = async (avatarUrl: string): Promise<void> => {
    try {
      const imageRef = await storage.refFromURL(avatarUrl)
      await imageRef.delete()
    } catch (e) {
      // eslint
    }
  }

  const updateAvatar = async (avatarUrl: string, newAvatar: AvatarFile): Promise<string> => {
    try {
      await deleteAvatar(avatarUrl)
      const imageExt = newAvatar.file.name.slice(newAvatar.file.name.lastIndexOf('.'))
      const avatarName = Date.now()
      const fileData = await storage.ref(`/avatars/users/${uid}/${avatarName}${imageExt}`).put(newAvatar.file)
      avatarUrl = await fileData.ref.getDownloadURL()
    } catch (e) {
      toast('Something went wrong, try later', 'red')
    }
    return avatarUrl
  }

  const updateUserData = async (data: UserDataType, callback?: () => void): Promise<void> => {
    let { avatarUrl } = user
    const { newAvatar } = data
    if (newAvatar) {
      avatarUrl = await updateAvatar(avatarUrl as string, newAvatar)
      delete data.newAvatar
    }

    try {
      await firestore.doc(`users/${uid}`).update('info', { ...user, ...data, avatarUrl })
      setUser({ ...user, ...data, avatarUrl })
    } catch (e) {
      toast('Something went wrong, try later', 'red')
    }
    if (callback) callback()
  }

  const userCreate = async (data: UserDataType): Promise<void> => {
    try {
      await firestore.doc(`users/${data.id}`).set({ info: {
        bill: 2000,
        avatarUrl: AVATAR_DEFAULT,
        name: data.name
      }})

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async (): Promise<void> => await init())()
  }, [uid])

  return { userData: user, updateUserData, userCreate, globalLoading }
}
