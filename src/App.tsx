import { useEffect, useState } from 'react'
import type { Distillery } from './types'
import Header from './components/Header'
import DistilleryMap from './components/DistilleryMap'
import './App.css'

export default function App() {
  const [distilleries, setDistilleries] = useState<Distillery[]>([])

  useEffect(() => {
    fetch('/distilleries.json')
      .then((res) => res.json())
      .then((data: Distillery[]) => {
        setDistilleries(
          data.filter(
            (d) => d.Lat && d.Lng && !isNaN(parseFloat(d.Lat)) && !isNaN(parseFloat(d.Lng))
          )
        )
      })
  }, [])

  return (
    <div className="app">
      <Header />
      <DistilleryMap distilleries={distilleries} />
    </div>
  )
}
