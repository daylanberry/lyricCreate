import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends React.Component {


  onLike(id, likes){
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
    .catch(err => console.log(err))
  }

  renderLyrics() {
    return (
      this.props.lyrics.map(({ id, content, likes })=> {
        return (
          <li key={id} className='collection-item'>
            {content}
            <div className='vote-box'>
              <i
                className='material-icons'
                onClick={() => this.onLike(id, likes)}
              >
                  thumb_up
              </i>
              {likes}
            </div>
          </li>
        )
      })
    )
  }


  render() {

    return (
      <ul className='collection'>
        {this.renderLyrics()}
      </ul>
    )
  }
}

const likeLyric = gql`
  mutation Like($id: ID) {
    likeLyric(id: $id) {
      id,
      likes,
      content
    }
  }
`;

export default graphql(likeLyric)(LyricList)