import React from 'react';
import {graphql, compose} from 'react-apollo';
import {updateVideo} from './../queries/query';

class Update extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id : "",
			title : "",
			description : "",
			privacy : ""
		}
	}
	submit(e) {
		e.preventDefault();
		console.log(this.state);
		console.log(this.props);
		this.props.updateVideo({
			variables : {
				id : this.state.id,
				title : this.state.title,
				description : this.state.description,
				privacy : this.state.privacy
			}
		})
		console.log(this.props);
		window.alert("resource updated successfully");

	}

	render() {
		return(
			<div>
				<h2>Update</h2>
				<div>
				<label>Video ID : </label><input type = "text" onChange = { (e) => this.setState({id : e.target.value})}/>
				</div>
				<br/>
				<div>
				<label>Title : </label><input type = "text" onChange = { (e) => this.setState({title : e.target.value})}/>
				</div>
<br/>
				<div>
				<label>Description : </label><input type = "text" onChange = { (e) => this.setState({description : e.target.value})}/>
				</div>

				<br/>
				<div>
				<label>Privacy : </label><input type = "text" onChange = { (e) => this.setState({privacy : e.target.value})}/>
				</div>
				<br/>

				<div>
					<button onClick={this.submit.bind(this)}>Submit</button>
				</div>
				<hr/>
			</div>
		)
	}
}

export default compose(
	graphql(updateVideo, {name : "updateVideo"})
	)(Update)