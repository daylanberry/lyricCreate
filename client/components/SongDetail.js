import React from 'react'
import { graphql }from 'react-apollo'
import songInfo from '../queries/songInfo'
import Spinner from './Spinner'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'
import { Link } from 'react-router'

class SongDetail extends React.Component {

  render() {
    const { song } = this.props.data

    if (!song) return <Spinner />

    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id}/>
      </div>
    )
  }
}


export default graphql(songInfo, {
  options: (ownProps) => ({
    variables: {id: ownProps.params.id}
  })
})(SongDetail)