import distilleriesData from './distilleries.json'
import type { Distillery } from './types'
import Header from './components/Header'
import DistilleryMap from './components/DistilleryMap'
import './App.css'

const distilleries = (distilleriesData as Distillery[]).filter(
  (d) => d.Lat && d.Lng && !isNaN(parseFloat(d.Lat)) && !isNaN(parseFloat(d.Lng))
)

export default function App() {
  return (
    <div className="app">
      <Header />
      <DistilleryMap distilleries={distilleries} />
    </div>
  )
}
