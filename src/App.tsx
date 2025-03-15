import './App.css'
import { PackCard } from './components/PackCard'
import SiteHeader from './components/SiteHeader'
import { PackCardProps } from './types/PackCardProps'
import { timeAgo } from './util/TimeUtil'

function App() {
  const exampleProp = {
    icon: "",
    name: "conflict",
    last_updated: timeAgo(new Date("2025-03-13T15:30:17Z")),
    download_url: "https://github.com/azisaba/resourcepacks/releases/download/action-v9229/conflict.zip",
    description: "none",
    supported: "1.10.2"
  } as PackCardProps
  
  return (
    <>
      <SiteHeader />
      <div className='outer'>
        <PackCard props={exampleProp}/>
      </div>
    </>
  )
}

export default App
