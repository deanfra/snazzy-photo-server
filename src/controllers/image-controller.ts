import Image from '../interfaces/image'
import { fetchPhotoById } from '../models/image'

export const fetchPhoto = async (id: string, dir: string): Promise<Image> => {
  const photo = await fetchPhotoById(id)
  return photo
}
