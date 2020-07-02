import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import classes from './Auth.module.scss';





class Signin extends Component {
	state = {
		controls: {
			userName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Mail Address or Phone Number '
				},
				value: '',
				validation: {
					required: true,
					minLength: 0
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 0,
					maxLength: 120,
					isPass: false
				},
				valid: false,
				touched: false
			}
		},
	}
	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		}
		this.setState({ controls: updatedControls })
	}
	submitHandler = async (event) => {
		event.preventDefault();

		event.preventDefault();
		this.props.onSignin(this.state.controls.userName.value, this.state.controls.password.value);

	}

		
	

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let form = formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				required={formElement.config.validation.required}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)} />

		))

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p className={classes.Error}>Some thing Went Wrong</p>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<div className={classes.Auth}>
				<div className={classes.SectionAccount}>
					<div className={classes.LoginHeight}>
						<div className={classes.AccountForm}>
							{authRedirect}
							<h2 className={classes.PrimaryHeading}>Welcome Back </h2>
							<div className={classes.Row}>

								<span className={classes.LinkText}>	<NavLink to="/login" activeClassName={classes.active} className={classes.Gbgcolor}>Login</NavLink></span>
								<span className={classes.LinkText}>	<NavLink to="/auth" activeClassName={classes.active} className={classes.Gbgcolor}>New account</NavLink></span>
							</div>



							<form onSubmit={this.submitHandler}>
								{form}
								{errorMessage}
								<Button btnType="Success"> Log in {this.props.loading ? <Spinner /> : ''} </Button>
								<h4 className={classes.LinkText}> <NavLink to="/" className={classes.Link}>Forgot Password?</NavLink>	</h4>
							</form>

						</div>
					</div>
				</div>
			</div>

		)
	}

}
const mapStateToProps = state => {
	return {
		loading: state.login.loading,
		error: state.login.error,
		isAuthenticated: state.login.token !== null,
		authRedirectPath: state.login.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSignin: (userName, password) => dispatch(actions.login(userName, password)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);