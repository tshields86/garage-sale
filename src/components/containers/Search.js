import React, { Component } from 'react'
import { Map } from '../presentation'
import { connect } from 'react-redux'
import actions from '../../actions'


class Search extends Component {
  constructor() {
    super()
    this.state = {
      map: null
    }
  }

  componentDidMount() {
    this.props.currentUser()
      // .then(data => {
      //   // console.log('CURRENT USER:', JSON.stringify(data));
      // })
      // .catch(err => {
      // })
  }

  locationChanged(center){
    // console.log("center", JSON.stringify(center));
    this.props.locationChanged(center)
  }

  render() {
    const items = this.props.item.all || []
    let markers = items.map((item, i) => {
      return {
        key: item.id,
        label: item.name,
        position: item.position,
        defaultAnimation: 2
      }
    })
    return (
      <div className="sidebar-wrapper" style={{height:100+'vh'}}>
        <Map 
            onMapReady={ (map) => {
                if (this.state.map != null)
                    return

                // console.log('OnMapReady: '+JSON.stringify(map.getCenter()))
                this.setState({
                    map: map
                })
            }}
            locationChanged={this.locationChanged.bind(this)}
            markers={markers}
            zoom={14}
            center={this.props.map.currentLocation}
            containerElement={<div style={{height:100+'%'}} />} 
            mapElement={<div style={{height:100+'vh'}} />} />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    item: state.item,
    map: state.map
  }
}

const dispatchToProps = (dispatch) => {
  return {
    locationChanged: (location) => dispatch(actions.locationChanged(location)),
    currentUser: () => dispatch(actions.currentUser())
  }
}

export default connect(stateToProps, dispatchToProps)(Search)