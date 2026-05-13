import { regionColors } from '../utils/mapIcons'

export default function Header() {
  return (
    <header className="header">
      <h1>Scottish Whisky Distilleries</h1>
      <div className="legend">
        {Object.entries(regionColors).map(([region, color]) => (
          <span key={region} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {region}
          </span>
        ))}
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#2c3e50' }} />
          Other
        </span>
      </div>
    </header>
  )
}
