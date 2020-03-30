import gql from 'graphql-tag'

const songInfo = gql `
  query SongInfo($id: ID!) {
    song(id: $id) {
      id,
      title,
      lyrics {
        id,
        content,
        likes
      }
    }
  }
`

export default songInfo