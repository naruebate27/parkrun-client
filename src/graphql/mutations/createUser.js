import gql from 'graphql-tag'

export default gql`
mutation(
  $userId:MongoID,
  $email:String!,
  $password: String,
  $name: String,
  $birthDate: Date,
  $gender: String, 
	
){
  createUser(record:{
    userId:$userId,
    email:$email,
    password: $password,
    firstname: $name,
    birthDate: $birthDate,
    gender: $gender,
    
  })
    {
        recordId
    }
}
`
