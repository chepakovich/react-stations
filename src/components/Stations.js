import React from 'react'

export default function Stations(props) {
  return props.stations.map((station, index) => {
    const tags = [...station.tags]
    const catIndex = tags.indexOf(props.category)
    tags.splice(catIndex, 1)
    let tagsStr = ''
    if (tags.length > 0) {
      tagsStr = '(' + tags.join(", ") + ')'
    }
    return (
      <div key={index}>
        {station.id === props.selectedStationId ?
          <div>
            <p><span className="selected">{station.name}</span> {tagsStr}</p>
            <audio controls autoPlay={true} preload="auto">
              <source src={station.streamUrl} />
              <p>Your browser does not support the audio element.</p>
            </audio>
            <p className="description">{station.description}</p>
          </div>
          :
          <p><span className="name" onClick={() => props.handleSelect(station.id)}>{station.name}</span> {tagsStr}</p>
        }
      </div>
    )
  })
}
