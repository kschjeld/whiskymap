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

/** Returns the canonical region key (matching regionColors) or 'Other'. */
export function getRegionName(description: string): string {
  for (const key of Object.keys(regionColors)) {
    if (description.toLowerCase().includes(key.toLowerCase())) return key
  }
  return 'Other'
}

export function createMarkerIcon(color: string, name: string): L.DivIcon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 36" width="20" height="36">
    <!-- Cap -->
    <rect x="7" y="0" width="6" height="3" rx="1" fill="${color}" stroke="white" stroke-width="1"/>
    <!-- Neck -->
    <rect x="7.5" y="3" width="5" height="5" fill="${color}" stroke="white" stroke-width="1"/>
    <!-- Shoulders: wide square transition -->
    <path d="M7.5 8 L4 13 L16 13 L12.5 8 Z" fill="${color}" stroke="white" stroke-width="1" stroke-linejoin="round"/>
    <!-- Body: slightly tapered -->
    <path d="M4 13 L3.5 34 L16.5 34 L16 13 Z" fill="${color}" stroke="white" stroke-width="1" stroke-linejoin="round"/>
  </svg>`
  const html = `<div style="display:flex;align-items:center;gap:4px;white-space:nowrap;">
    ${svg}
    ${name ? `<span style="font-size:11px;font-weight:600;color:#000;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white;">${name}</span>` : ''}
  </div>`
  return L.divIcon({
    html,
    className: '',
    iconSize: undefined,
    iconAnchor: [10, 36],
    popupAnchor: [0, -36],
  })
}
