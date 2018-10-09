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
		// console.log(this.state);
		// console.log(this.pathh.files[0]);
		// let r = new FileReader();
		// r.readAsDataURL(this.pathh.files[0])
		// r.onload=(e)=> {
			//console.log(e.target.result);
			this.props.addVideo({
			variables : {
				path : this.state.path,
				title : this.state.title,
				description : this.state.description,
				privacy : this.state.privacy
			}
		//})
		})
		
		// console.log(this.props);
		window.alert("resource added successfully");

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