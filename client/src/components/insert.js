import React from 'react';
import {graphql, compose} from 'react-apollo';
import {addVideo} from './../queries/query';

class Insert extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path : "",
			title : "",
			description : "",
			privacy : ""
		}
	}
	submit(e) {
		e.preventDefault();
	
		this.props.addVideo({
			variables : {
				path : this.state.path,
				title : this.state.title,
				description : this.state.description,
				privacy : this.state.privacy
			}
		}).then(data =>{
			window.alert("Uploaded Successfully");
		}).catch(err => {
			window.alert(err.message);
		})
		
		window.alert("Paste auth token to server window to add");

	}
	render() {
		return(
			<div>
				<h2>Insert</h2>
				<div>
				<label>Video Path : </label><input onChange = { (e) => this.setState({path : e.target.value})} type = "text"/>
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
	graphql(addVideo, {name : "addVideo"})
	)(Insert)