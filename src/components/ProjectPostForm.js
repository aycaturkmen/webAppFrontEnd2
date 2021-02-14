import React, { Component } from 'react'
import axios from 'axios'

class ProjectPostForm extends Component {

	constructor(props) {
		super(props)

		this.state = {
			title: '',
			description: '',
			dueDate: '',
			people: ""
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:3001/api/projects/newProject', this.state)
			.then(response => {
				console.log(response)
				alert ("Project: '" + this.state.title + "' has been added to the db!")
			})
			.catch(error => {
				console.log(error)
				alert ("Error adding the project '" + this.state.title + "' " + error)
			})
	}

	render() {
		const { title, description, dueDate, people } = this.state
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<label>Project Title </label>
						<input
							type="text"
							name="title"
							value={title}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>Description </label>
						<input
							type="text"
							name="description"
							value={description}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>Due Date </label>
						<input
							type="text"
							name="dueDate"
							value={dueDate}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>People </label>
						<input
							type="text"
							name="people"
							value={people}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default ProjectPostForm
