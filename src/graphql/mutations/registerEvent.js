import gql from 'graphql-tag'

export default gql`
mutation($runnerid:MongoID,$eventid:MongoID){
  createRegis(record:{
    runnerid:$runnerid,
    eventid:$eventid
  }){
    recordId
  }
}
`
