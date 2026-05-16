import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Distillery } from '../types'
import { getRegionColor, getRegionName, createMarkerIcon } from '../utils/mapIcons'

// Fix leaflet default icon issue with bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type Props = {
  distilleries: Distillery[]
  activeRegions: Set<string>
}

const LABEL_ZOOM_THRESHOLD = 11

function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  useMapEvents({ zoomend: (e) => onZoom(e.target.getZoom()) })
  return null
}

export default function DistilleryMap({ distilleries, activeRegions }: Props) {
  const [zoom, setZoom] = useState(6)

  const visible = distilleries.filter((d) => activeRegions.has(getRegionName(d.Description)))

  return (
    <MapContainer center={[57.0, -4.2]} zoom={6} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomTracker onZoom={setZoom} />
      {visible.map((d) => (
        <Marker
          key={d.Name}
          position={[parseFloat(d.Lat), parseFloat(d.Lng)]}
          icon={createMarkerIcon(getRegionColor(d.Description), zoom >= LABEL_ZOOM_THRESHOLD ? d.Name : '')}
        >
          <Popup className="distillery-popup">
            <div className="popup-content">
              <h2>{d.Name}</h2>
              {d.Description && (
                <span className="badge" style={{ background: getRegionColor(d.Description) }}>
                  {d.Description}
                </span>
              )}
              <table>
                <tbody>
                  <tr>
                    <th>Owner</th>
                    <td>{d.Owner || '—'}</td>
                  </tr>
                  {d.Address && (
                    <tr>
                      <th>Address</th>
                      <td>{d.Address}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Postcode</th>
                    <td>{d.Postcode || '—'}</td>
                  </tr>
                </tbody>
              </table>
              {d.Url && (
                <a href={d.Url} target="_blank" rel="noopener noreferrer" className="website-link" style={{ color: getRegionColor(d.Description), borderColor: getRegionColor(d.Description) }}>
                  Visit Website
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
