import React, { useState } from 'react'
import { Col, Row } from 'react-materialize'
import SmartForm from '../components/form/SmartForm'
import { text } from '../components/form/formUtils'
import { UserDataType, AvatarFile } from '../hooks/userData.hook'
import { toast } from '../utils/toast'
import { AVATAR_DEFAULT } from '../const'

const inputsOptions = (value: string) => ({
  name: {
    ...text,
    value
  }
})
const acceptFiles = ['image/jpeg', 'image/png', 'image/gif']

interface ProfileProps {
  updateUserData: (data: UserDataType, c?: () => void) => Promise<boolean>;
  avatarUrl: string;
  name: string;
}

const Profile: React.FC<ProfileProps> = ({ updateUserData, name, avatarUrl }) => {
  const [newAvatar, setNewAvatar] = useState<AvatarFile>({} as AvatarFile)
  const [loading, setLoading] = useState<boolean>(false)

  const onAvatarChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files || []
    if (files.length) {
      const file: File = files[0]
      if (acceptFiles.includes(file.type)) {
        const url = URL.createObjectURL(file)
        setNewAvatar({ url, file })
      } else {
        toast(' Select image', 'red')
      }
    }
  }

  const onSubmit = async (data: UserDataType): Promise<void> => {
    setLoading(true)
    if (Object.keys(newAvatar).length) {
      data['newAvatar'] = newAvatar
    }
    try {
      await updateUserData({...data, avatarUrl})
      toast('Profile updated')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <Row>
      <Col s={12} m={10}  offset='m1'>
        <div className="page-title">
          <h3>ProfileTitle</h3>
        </div>
        <div className="input-field file-field flex-container">
          <img className="circle avatar avatar-edited" src={newAvatar.url || avatarUrl || AVATAR_DEFAULT} alt="User Avatar"/>
          <span className={`btn ${loading ? 'disabled' : ''}`}>Edit</span>
          <input type="file" className="" id="TextInput-3" value="" onChange={onAvatarChanged} disabled={loading} />
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" disabled={loading} />
          </div>
        </div>
        <SmartForm
          submit={onSubmit}
          inputsOptions={inputsOptions(name)}
          disabled={loading}
          submitTitle='update'
        />
      </Col>
    </Row>
  )
}

export default Profile
