import './App.css'
import PackList from './components/PackList'
import SiteHeader from './components/SiteHeader'

function App() {
  
  return (
    <>
      <SiteHeader />
      {/* <div className='outer'>
        <PackCard props={exampleProp}/>
      </div> */}
      <PackList />
    </>
  )
}

export default App
