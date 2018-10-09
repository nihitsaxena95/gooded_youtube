import {gql} from 'apollo-boost';

const updateVideo = gql`
mutation($id : String!, $title : String!, $description : String!, $privacy : String!) {
	updateVideo(id : $id, title : $title, description : $description, privacy : $privacy) {
		id
		title
		description
	}
}
`

const addVideo = gql`
mutation($path : String!, $title : String!, $description : String!, $privacy : String!) {
	addVideo(path : $path, title : $title, description : $description, privacy : $privacy) {
		id
		title
		description
	}
}
`



export {updateVideo, addVideo};