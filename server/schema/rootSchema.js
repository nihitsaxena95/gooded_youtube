import  {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema} from 'graphql';
import updateVideoService from './../services/updateVideoService';
import insertVideoService from './../services/insertVideoService';

const video = new GraphQLObjectType({
	name : 'Video',
	fields : () => ({
		id : { type : GraphQLString},
		title : {type : GraphQLString},
		description : {type : GraphQLString},
		link : {type : GraphQLString},
		privacy : {type : GraphQLString},
		path : {type : GraphQLString}
	})
})

const vid = {
	id : "dfgdfddd",
		title :"dfgfsdf",
		description :"dfgsgffd",
		link : "dfgs",
		privacy : "sdfs",
		path : "adaf"
}
const videoRoot = new GraphQLObjectType({
	name : 'videoRoot',
	fields : {
		video : {
			type : video,
			resolve (parent, args) {
				return vid;
			}
		}
	}
})

const videoMutation = new GraphQLObjectType({
	name : 'videoMutation',
	fields : {
		addVideo : {
			type : video,
			args : {
				title : {type : GraphQLString},
				description : {type : GraphQLString},
				privacy : {type : GraphQLString},
				path : {type : GraphQLString}
			},
			resolve(parent, args) {
				return insertVideoService(args.id,args.description, args.privacy, args.path).then((data)=>data).catch((err)=>err);
			}
		},
		updateVideo : {
			type : video,
			args : {
				id : {type : GraphQLString},
				title : {type : GraphQLString},
				description : {type : GraphQLString},
				privacy : {type : GraphQLString}
				
			},
			resolve(parent, args) {
				return updateVideoService(args.id, args.title, args.description,args.privacy).then((data) => data).catch((err)=>err);
			}
		}
	}
});


export default new GraphQLSchema({
	query : videoRoot,
	mutation : videoMutation
})