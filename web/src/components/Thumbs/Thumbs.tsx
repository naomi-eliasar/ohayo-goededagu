import { useMemo } from 'react'

import { useAuth } from 'src/auth'

import Thumb from '../Thumb/Thumb'

export interface IThumbProps {
  thumbs: Thumbs[]
}

const Thumbs = (props: IThumbProps) => {
  const { currentUser } = useAuth()

  // useMemo to filter up and down thumbs
  const upThumbs = useMemo(() => {
    return props.thumbs.filter((thumb) => thumb.up)
  }, [props.thumbs])

  const downThumbs = useMemo(() => {
    return props.thumbs.filter((thumb) => !thumb.up)
  }, [props.thumbs])

  const upCount = useMemo(() => {
    return upThumbs.length
  }, [upThumbs])

  const downCount = useMemo(() => {
    return downThumbs.length
  }, [downThumbs])

  const currentUserThumb = useMemo(() => {
    return props.thumbs.find((thumb) => thumb.user.id === currentUser.id)
  }, [props.thumbs, currentUser])

  return (
    <div className="flex gap-2">
      <Thumb up={true} count={upCount} active={currentUserThumb?.up} />
      <Thumb
        up={false}
        count={downCount}
        active={currentUserThumb?.up === false}
      />
    </div>
  )
}

export default Thumbs
