import CustomCursor from './components/customCursor'
import Navbar from './components/Navbar'
import HeroPage from './pages/HeroPage'
import IntroPage from './pages/IntroPage'

const App = () => {
  return (
    <>
      <CustomCursor />
      <main>
        <IntroPage/>
        <div className='pages'>
          <Navbar />
          <HeroPage/>
        </div>
      </main>
    </>
  )
}

export default App
