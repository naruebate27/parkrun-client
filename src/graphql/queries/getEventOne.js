import gql from 'graphql-tag'

export default gql`
query($_id : MongoID){
    eventOne(filter:{
      _id: $_id
    }){
      _id
      eventid
      name
      banner
      start_date
      end_date
      member
    }
  }
`