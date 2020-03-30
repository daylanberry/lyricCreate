import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory, withRouter } from 'react-router'
import fetchSongs from '../queries/fetchSongs'


class SongCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(e){
    e.preventDefault()
    if (!this.state.title.length) {
      alert('Need a song name')
      return
    }

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: fetchSongs }]
    })
      .then(() => this.props.router.push('/'))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Song Title:
            <input
            type='text'
            onChange={(e) => this.setState({title: e.target.value})}
            value={this.state.title}
            />
          </label>
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`


export default withRouter(graphql(mutation)(SongCreate))