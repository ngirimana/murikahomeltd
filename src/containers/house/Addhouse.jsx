import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import axios from '../../custom-axios';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import classes from '../Auth/Auth.module.scss';

class AddHouse extends Component {
	state = {
		controls: {
			price: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'price'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			phone: {
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
			district: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'District'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			sector: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Sector'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			cell: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Cell'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			village: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'village'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			numberOfRooms: {
				elementType: 'input',
				elementConfig: {
					type: 'Number',
					placeholder: 'Number of Rooms'
				},
				value: '',
				validation: {
					required: true,
					minLength: 1
				},
				valid: false,
				touched: false
			},
			category: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'cheap', displayValue: 'Cheap' },
						{ value: 'medium', displayValue: 'Medium' },
						{ value: "expensive", displayValue: 'Expensive' }
					]
				},
				value: 'cheap',
				validation: {},
				valid: true
			},
			
		},
		houseImages:''
	}
	fileSelectorHandler=(event)=>{
		this.setState({
			houseImages:event.target.files[0]
		})

	}
	houseAddHandler = (event) => {
		event.preventDefault();
		const houseData=new FormData()
		for(let formElementIdentifier in this.state.controls){
		houseData.append(formElementIdentifier,this.state.controls[formElementIdentifier].value)
		}
	houseData.append('houseImages',this.state.houseImages,this.state.houseImages.name);
		this.props.onAddHouse(houseData);

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
				files={ formElement.config.files }
				shouldValidate={ formElement.config.validation }
				touched={ formElement.config.touched }
				changed={ (event) => this.inputChangedHandler(event, formElement.id) } />
		))

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p className="">Some thing Went Wrong</p>
			);
		}


		return (
			<div className={ classes.Auth }>
				<div className={ classes.SectionAccount }>
					<div className={ classes.Account }>
						<div className={ classes.AccountForm }>

							<form onSubmit={ this.houseAddHandler }>
								{ form }
								<input type="file" onChange={this.fileSelectorHandler}/>
								{ errorMessage }
								<Button btnType="Success"> SUBMIT { this.props.loading ? <Spinner /> : '' } </Button>

							</form>

						</div>
					</div>
				</div>
			</div>
		)
	}

}
const mapStateToProps=state=>{
	return{
		loading:state.house.loading
	}
}
const mapDispatchToProps = dispatch => {
	return {
			onAddHouse: (houseData) => dispatch(actions.addHouse(houseData))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(AddHouse, axios));