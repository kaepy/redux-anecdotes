// Luotiin custom hook, koska lintti antoi varoituksen "Fast refresh only works when a file only exports components". Varoitus kertoo, että tiedosto sisältää sekä kontekstin että komponentin, mikä ei ole suositeltavaa Vite-kehitysympäristössä. Tämä ei vaikuta toiminnallisuuteen, mutta varoitus ehdotti hookin erottamista omaan tiedostoonsa siistimmän hot-module reloadingin vuoksi.

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

// Custom hook to use notification context
export const useNotification = () => {
  // Access notification context
  const context = useContext(NotificationContext)

  // Ensure the hook is used within the provider
  if (!context) {
    // Throw error if context is undefined
    throw new Error(
      'useNotification must be used within NotificationContextProvider',
    )
  }
  return context
}
