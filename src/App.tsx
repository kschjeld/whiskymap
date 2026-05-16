import { useEffect, useState } from 'react'
import type { Distillery } from './types'
import Header from './components/Header'
import DistilleryMap from './components/DistilleryMap'
import { regionColors } from './utils/mapIcons'
import './App.css'

const ALL_REGIONS = [...Object.keys(regionColors), 'Other']

export default function App() {
  const [distilleries, setDistilleries] = useState<Distillery[]>([])
  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set(ALL_REGIONS))

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

  function toggleRegion(region: string) {
    setActiveRegions((prev) => {
      // If this region is already the only one selected, restore all
      if (prev.size === 1 && prev.has(region)) return new Set(ALL_REGIONS)
      // Otherwise isolate this region
      return new Set([region])
    })
  }

  return (
    <div className="app">
      <Header activeRegions={activeRegions} onToggleRegion={toggleRegion} />
      <DistilleryMap distilleries={distilleries} activeRegions={activeRegions} />
    </div>
  )
}
