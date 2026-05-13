import L from 'leaflet'

export const regionColors: Record<string, string> = {
  'Islay Malt': '#e67e22',
  'Highland Malt': '#2980b9',
  'Speyside Malt': '#27ae60',
  'Lowland Malt': '#8e44ad',
  'Campbeltown': '#c0392b',
  'Grain Whisky': '#7f8c8d',
}

export function getRegionColor(description: string): string {
  for (const key of Object.keys(regionColors)) {
    if (description.toLowerCase().includes(key.toLowerCase())) return regionColors[key]
  }
  return '#2c3e50'
}

export function createMarkerIcon(color: string): L.DivIcon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="white" opacity="0.85"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  })
}
