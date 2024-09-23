import './App.css'
import GraphComponent from './components/sigma-graph'

function App() {
  return (
    <>
  <div className="absolute left-0 top-0 z-[-3] size-full pattern-cross pattern-yellow-500 pattern-bg-white
        pattern-size-20 pattern-opacity-40"></div>
      <h1 className="font-black text-7xl text-[#e9a151] p-5 pt-0">The TataVerse Graph</h1>
      <div className="mx-20 my-0 shadow-lg backdrop-blur-md">
        <GraphComponent />
      </div>
      <footer className="absolute bottom-0 mt-1 left-0 w-full text-left text-[#e9a151] p-1">
        <p>Version 0.1 Created by LLL</p>
      </footer>
    </>
  )
}

export default App
