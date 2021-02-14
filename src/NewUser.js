import React, { Component } from 'react'
import './NewUser.css'
import UserPostList from './components/UserPostList'
import UserPostForm from './components/UserPostForm.js'

class NewUser extends Component {
	render() {
		return (
			<div className="App">
				<UserPostForm />
				{/* <UserPostList /> */}
			</div>
		)
	}
}

export default NewUser