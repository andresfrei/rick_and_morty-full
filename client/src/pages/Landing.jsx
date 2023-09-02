import { useNavigate } from 'react-router-dom'
import Welcome from '../components/Welcome/Welcome'
import useSession from '../hooks/useSession'
import { APP_URL_HOME } from '../config/constants'

export default function Landing () {
  const { session } = useSession()
  const navigate = useNavigate()

  session?.id && navigate(APP_URL_HOME)

  return (
    <section className='flex-grow'>
        <Welcome/>
    </section>
  )
}
