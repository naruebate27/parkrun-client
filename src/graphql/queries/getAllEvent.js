import gql from 'graphql-tag'

export default gql`
query{
  eventMany{	
    _id
    name
  	slug
		organizId
  	startTime
		endTime
		haveChipTime
		checkpoints{
      position,
    	cutOffTime,
    	name,
    	distance,
    }
		deleted
  }
}
`
