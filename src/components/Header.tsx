import { regionColors } from '../utils/mapIcons'

type Props = {
  activeRegions: Set<string>
  onToggleRegion: (region: string) => void
}

const OTHER_COLOR = '#2c3e50'

export default function Header({ activeRegions, onToggleRegion }: Props) {
  const entries: [string, string][] = [
    ...Object.entries(regionColors),
    ['Other', OTHER_COLOR],
  ]

  return (
    <header className="header">
      <h1>Scottish Whisky Distilleries</h1>
      <div className="legend">
        {entries.map(([region, color]) => {
          const active = activeRegions.has(region)
          return (
            <button
              key={region}
              className={`legend-item legend-item--btn${active ? '' : ' legend-item--inactive'}`}
              onClick={() => onToggleRegion(region)}
              title={active ? `Show all regions` : `Show only ${region}`}
            >
              <span
                className="legend-dot"
                style={{ background: active ? color : 'transparent', borderColor: color }}
              />
              {region}
            </button>
          )
        })}
      </div>
    </header>
  )
}
