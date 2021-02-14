import React, { Component } from 'react'
import './NewProject.css'
import ProjectPostList from './components/ProjectPostList'
import ProjectPostForm from './components/ProjectPostForm.js'

class NewProject extends Component {
	render() {
		return (
			<div className="App">
				<ProjectPostForm />
				{/* <ProjectPostList /> */}
			</div>
		)
	}
}

export default NewProject