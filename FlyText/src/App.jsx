import Flyer from './components/Flyer'
import Gap from './components/Gap'

const App = () => {
  return (
    <main>
      <Gap />
      <Flyer text={'Fly out'} type='flyOut' ease={'elastic'} />
      <Flyer text={'Fly in'} type='flyIn' ease={'expo'} />
      <Flyer
        text={
          'Paragraph on Kindness in 100 WordsBeing kind to others charges no money. It is a unique characteristic of showing love and caring for others selflessly. It is an act of making others happy without any specific reasons.'
        }
        para={true}
        type='flyIn'
        ease={'expo'}
      />
      <Gap />
    </main>
  )
}

export default App
