import React, { Component } from 'react'
import Stations from './Stations'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      musicStations: [],
      newsStations: [],
      selectedStationId: '',
      tagsMusic: [],
      selectedTag: '',
    };
  }

  componentDidMount() {
    this.fetchStations()
  }

  fetchStations() {
    const apiUrl = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json'
    fetch(apiUrl, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        const stations = data.data
        const musicStations = []
        const newsStations = []
        if (stations && stations.length > 0) {
          for (let station of stations) {
            if (station.tags.indexOf("music") > -1) {
              musicStations.push(station)
            }
            if (station.tags.indexOf("news") > -1) {
              newsStations.push(station)
            }
          }
        }
        musicStations.sort((a, b) => b.popularity - a.popularity)
        newsStations.sort((a, b) => b.popularity - a.popularity)
        this.setState({
          musicStations,
          newsStations,
          isLoading: false,
        })
      })
      .catch(error => this.setState({ error, isLoading: false }))
  }

  handleSelect = (stationId) => {
    this.setState({ selectedStationId: stationId })
  }

  render() {
    const { isLoading, musicStations, newsStations, error } = this.state
    return (
      <div className="main">
        <h1>Stations</h1>
        {!isLoading ?
          <>
            <h2>Music</h2>
            <Stations stations={musicStations} category={'music'} selectedStationId={this.state.selectedStationId} handleSelect={this.handleSelect} />
            <h2>News</h2>
            <Stations stations={newsStations} category={'news'} selectedStationId={this.state.selectedStationId} handleSelect={this.handleSelect} />
          </>
          : <h3>Loading...</h3>
        }
        {error ? <h3>{error}</h3> : null}
      </div>
    )
  }

}

export default Home
