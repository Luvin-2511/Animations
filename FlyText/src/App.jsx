import Flyer from './components/Flyer'
import Gap from './components/Gap'

const App = () => {
  return (
    <main>
      <Gap />
      <Flyer text={"Fly out"} type='flyOut' ease={"elastic"}/>
      <Flyer text={"Fly in"} type='flyIn' ease={"expo"}/>
      <Gap />
    </main>
  )
}

export default App
