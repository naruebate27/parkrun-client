import gql from 'graphql-tag'

export default gql`
query($_id : MongoID){
  userOne(filter:{
      _id: $_id
    }){
    _id
	firstname
    lastname
    email
    gender
    birthDate
  }
}
`
