import Intro from './components/Intro'
import Animated from './pages/Animated'
import PageOne from './pages/PageOne'

const App = () => {
  return (
    <main>
      <Intro />
      <PageOne text={'Starting'} />
      <Animated />
      <PageOne text={'Ending'} />
    </main>
  )
}

export default App
