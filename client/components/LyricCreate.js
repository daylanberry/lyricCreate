import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

  }

  handleSubmit(e) {
    e.preventDefault()

    const { content } = this.state
    const { songId } = this.props


    this.props.mutate({
      variables: {
        content,
        songId,
      }
    }).then(() => this.setState({content: ''}))
      .catch(err => console.log(err))
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          type='text'
          onChange={(e) => this.setState({ content: e.target.value})}
          value={this.state.content}
        />

      </form>
    )
  }
}

const addLyric = gql`
  mutation AddLyric($content: String! $songId: ID!) {
    addLyricToSong(content: $content songId: $songId) {
      id,
      lyrics {
        id,
        content,
        likes
      }
    }
  }
`;

export default graphql(addLyric)(LyricCreate)