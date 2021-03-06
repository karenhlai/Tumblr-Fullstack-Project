import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		// this.state = this.props.user;
		this.state = {
			email: '',
			username: '',
			password: ''
		};

		this.loginDemo = this.loginDemo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {
		this.props.clearErrors();
		// debugger
	}
	
	// componentDidUpdate(oldProps) {
	// 	debugger
	// 	if (this.props.formType !== oldProps.formType) {
	// 		this.props.clearErrors();
	// 	}
	// }

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		this.props.processForm(user).then( () => this.props.history.push("/posts"));
	}

	loginDemo(e) {
		e.preventDefault();
		let demoUser = { email: 'demoUser@email.com', password: 'password'}
		this.props.processForm(demoUser).then( () => this.props.history.replace('/posts'));
	}

	renderErrors() {
		if (this.props.errors === undefined) return;
		return (
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	render() {
		let username;
		if (this.props.formType === 'Sign Up') {
			username = <label>
				{/* Username: */}
				<input type="text"
					placeholder="Username"
					value={this.state.username}
					onChange={this.update('username')}
					className="login-input"
				/>
				<br></br>
			</label>
		};
		
		let demoButton;
		if (this.props.formType === "Log In") {
			demoButton = <button id="session-button" onClick={this.loginDemo}>Demo Login</button>
		}

		return (
			<div className="login-form-container">
				{this.props.navLink}

				<form onSubmit={this.handleSubmit} className="login-form">
					<h1 className="splash-header">trendr</h1>
					<label>
						{/* Email: */}
						<input type="text"
							placeholder="Email"
							value={this.state.email}
							onChange={this.update('email')}
							className="login-input"
						/>
					</label>
					{ username }
					<label>
						{/* Password: */}
						<input type="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.update('password')}
							className="login-input"
						/>
					</label>

					<div className="renderErrors">
						{this.renderErrors()}
					</div>

					<input id="session-button" type="submit" value={this.props.formType} />
					<br />
					{demoButton}
				</form>
			</div>
		);
	}
}

export default withRouter(SessionForm);
