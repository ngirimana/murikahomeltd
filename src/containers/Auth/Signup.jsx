import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';




class Signup extends Component {
	state = {
		controls: {
			firstName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'First Name'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			lastName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Last Name'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			phoneNumber: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Phone Number'
				},
				value: '',
				validation: {
					required: true,
					minLength: 10,
					maxLength: 13
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
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
					minLength: 8,
					maxLength: 20,
					isPass: true
				},
				valid: false,
				touched: false
			},
			userType: {
				elementType: 'select',
				elementConfig: {
						options: [
								{ value: 'landlord', displayValue: 'Landlord' },
								{ value: 'tenant', displayValue: 'Tenant' }
						]
				},
				value: 'tenant',
				validation: {},
				valid: true
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
			[ controlName ]: {
				...this.state.controls[ controlName ],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[ controlName ].validation),
				touched: true
			}
		}
		this.setState({ controls: updatedControls })
	}
	submitHandler = (event) => {
		event.preventDefault();
		this.props.onSignup(this.state.controls.firstName.value, this.state.controls.lastName.value,
			this.state.controls.phoneNumber.value, this.state.controls.email.value,
			this.state.controls.password.value,this.state.controls.userType.value);
			
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[ key ]
			});
		}
		let form = formElementsArray.map(formElement => (
			<Input
				key={ formElement.id }
				elementType={ formElement.config.elementType }
				elementConfig={ formElement.config.elementConfig }
				value={ formElement.config.value }
				required={ formElement.config.validation.required }
				invalid={ !formElement.config.valid }
				shouldValidate={ formElement.config.validation }
				touched={ formElement.config.touched }
				changed={ (event) => this.inputChangedHandler(event, formElement.id) } />

		))

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p className={ classes.Error }>Some thing Went Wrong</p>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={ this.props.authRedirectPath } />
		}
		return (
			<div className={ classes.Auth }>
				<div className={ classes.SectionAccount }>
					<div className={ classes.Account }>
						<div className={ classes.AccountForm }>
							{ authRedirect }
							<h2 className={ classes.PrimaryHeading }>Welcome To Murika Home</h2>
							<div className={ classes.Row }>

								<NavLink to="/login" activeClassName={ classes.active } className={ classes.Gbgcolor }>Login</NavLink>
								<NavLink to="/auth" activeClassName={ classes.active } className={ classes.Gbgcolor }>New account</NavLink>
							</div>
							<form onSubmit={ this.submitHandler }>
								{ form }
								{ errorMessage }
								<Button btnType="Success"> SUBMIT { this.props.loading ? <Spinner /> : '' } </Button>
								<h4 className={ classes.LinkText }> <NavLink to="/login" className={ classes.Link }>Already have an account? </NavLink>	</h4>
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
		loading: state.signup.loading,
		error: state.signup.error,
		isAuthenticated: state.signup.token !== null,
		authRedirectPath: state.signup.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSignup: (firstName, lastName, phoneNumber, email, password,userType ) => dispatch(
			actions.signup(firstName, lastName, phoneNumber, email, password,userType)),
			onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

