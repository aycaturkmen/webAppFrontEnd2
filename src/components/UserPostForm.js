import React, { Component } from 'react'
import axios from 'axios'

class UserPostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			birthDate: '',
			position: '',
			projects: ""
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:3001/api/users/newUser', this.state)
			.then(response => {
				console.log(response)
				alert ("User: '" + this.state.name + "' has been added to the db!")
			})
			.catch(error => {
				console.log(error)
				alert ("Error adding the user '" + this.state.name + "' " + error)
			})
	}

    backHandler = e => {
		e.preventDefault()
		alert(this.state)
	}

	render() {
		const { name, birthDate, position, projects } = this.state
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<label>User Name </label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>Birth Date </label>
						<input
							type="text"
							name="birthDate"
							value={birthDate}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>Position </label>
						<input
							type="text"
							name="position"
							value={position}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<label>Projects </label>
						<input
							type="text"
							name="projects"
							value={projects}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default UserPostForm
