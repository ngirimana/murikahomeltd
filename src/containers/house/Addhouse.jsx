import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import classes from './house.module.scss';


class AddHouse extends Component {
	state = {
		controls: {
			propertyType: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '', disabled: true, seclected: true, displayValue: 'Choose House Type' },
						{ value: 'apartment', displayValue: 'Apartment' },
						{ value: 'hall', displayValue: 'Hall' },
						{ value: "officeSpace", displayValue: 'Office Space' },
						{ value: 'townHouse', displayValue: 'Town House' },
						{ value: 'shop', displayValue: 'Shop' },
						{ value: 'warehouse', displayValue: 'Warehouse' },
						{ value: 'monsion', displayValue: 'Monsion' },
					]
				},
				value: '',
				validation: {
					required: true,
				},
				valid: true
			},
			rooms: {
				elementType: 'input',
				elementConfig: {
					type: 'Number',
					placeholder: 'Number of Rooms'
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 3
				},
				valid: false,
				touched: false
			},
			monthlyRent: {
				elementType: 'input',
				elementConfig: {
					type: 'Number',
					placeholder: 'Monthly Rent Price in Rwandan Francs'
				},
				value: '',
				validation: {
					required: true,
					minLength: 2
				},
				valid: false,
				touched: false
			},
			minimumRentperiod: {
				elementType: 'input',
				elementConfig: {
					type: 'Number',
					placeholder: 'Minimum Rent Period'
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 1
				},
				valid: false,
				touched: false
			},
			priceStatus: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '', disabled: true, seclected: true, displayValue: 'Choose Price Status' },
						{ value: 'negotiable', displayValue: 'Negotiable' },
						{ value: 'fixed', displayValue: 'Fixed' },
					]
				},
				value: '',
				validation: {},
				valid: true
			},
			aboutProperty: {
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'About Property '
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 255
				},
				valid: false,
				touched: false
			},
			leaseDatails: {
				elementType: 'textarea',
				elementConfig: {
					type: 'textarea',
					placeholder: 'Lease Datails '
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 255
				},
				valid: false,
				touched: false
			},
			district: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'House District'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
		},
		controls1: {
			sector: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'House Sector'
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
					placeholder: 'House Cell'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				touched: false
			},
			fullName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Full Name of House Owner '
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 255
				},
				valid: false,
				touched: false
			},
			phone: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Phone Number of House Owner '
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
					type: 'text',
					placeholder: 'Email of House Owner '
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			}
		},
		parking: false,
		gated: false,
		furnished: false,
		houseVideo: '',
		houseImages: [],
		error: '',
	}
	fileSelectorHandler = (event) => {
		let images = [];
		for (let i = 0; i < event.target.files.length; i++) {
			images[ i ] = event.target.files.item(i);
		}
		images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
		this.setState({
			houseImages: images,
		})
	}

	houseAddHandler = (event) => {
		event.preventDefault();
		const houseData = new FormData();
		for (let formElementIdentifier in this.state.controls) {
			houseData.append(`${ formElementIdentifier }`, this.state.controls[ formElementIdentifier ].value);
		};
		for (let formInput in this.state.controls1) {
			houseData.append(`${ formInput }`, this.state.controls1[ formInput ].value);
		}
		houseData.append('parking', this.state.parking);
		houseData.append('furnished', this.state.furnished);
		houseData.append('gated', this.state.gated);
		houseData.append('houseVideo', this.state.houseVideo);
		this.state.houseImages.forEach(houseImages => {
			houseData.append('houseImages', houseImages);
		})
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
		};
		this.setState({ controls: updatedControls, })
	}

	inputChangedHandler2 = (event, controlName) => {
		const updatedControls = {
			...this.state.controls1,
			[ controlName ]: {
				...this.state.controls1[ controlName ],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls1[ controlName ].validation),
				touched: true
			}
		};
		this.setState({ controls1: updatedControls, })
	}
	parkingCheckBoxHander = (event) => {
		const isChecked = event.target.checked;
		this.setState({ parking: isChecked })

	}
	gatedCheckBoxHander = (event) => {
		const isChecked = event.target.checked;
		this.setState({ gated: isChecked })

	}
	furnishedCheckBoxHander = (event) => {
		const isChecked = event.target.checked;
		this.setState({ furnished: isChecked })

	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[ key ]
			});
		}
		const formElementsArray1 = [];
		for (let key in this.state.controls1) {
			formElementsArray1.push({
				id: key, config: this.state.controls1[ key ]
			})
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
		));
		let form1 = formElementsArray1.map(formElement => (
			<Input
				key={ formElement.id }
				elementType={ formElement.config.elementType }
				elementConfig={ formElement.config.elementConfig }
				value={ formElement.config.value }
				required={ formElement.config.validation.required }
				invalid={ !formElement.config.valid }
				shouldValidate={ formElement.config.validation }
				touched={ formElement.config.touched }
				changed={ (event) => this.inputChangedHandler2(event, formElement.id) } />
		))
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p className="">Some thing Went Wrong</p>
			);
		}
		return (

			<div className={ classes.House }>
				<h2 className={ classes.PrimaryHeading }>Welcome To house Listing</h2>
				<form onSubmit={ this.houseAddHandler } className={ classes.Form }>
					<div className={ classes.HouseForm }>
						<div className={ classes.FormSegment }>	{ form }</div>
						<div className={ classes.FormSegment }>
							{ form1 }
							<div className={ classes.LabelField }>
								<div>	<label>Parking</label>	<input type="checkbox" value={ true } onChange={ event => this.parkingCheckBoxHander(event) } /></div>
								<div><label>Furnished</label>	<input type="checkbox" value={ true } onChange={ event => this.furnishedCheckBoxHander(event) } /></div>
								<div><label>Gated</label>	<input type="checkbox" value={ true } onChange={ event => this.gatedCheckBoxHander(event) } /></div>
							</div>
							<div >
								<div className={ classes.FilesInput }>	<label htmlFor="video" onClick={ () => this.videoInput.click() }> Upload House video(optional)</label>	<input type="file" hidden id="video" ref={ videoInput => this.videoInput = videoInput } onChange={ this.houseVideoHandler } /></div>
								<div className={ classes.FilesInput }> <label htmlFor="images" onClick={ () => this.imageInput.click() }> Upload House Image</label><input type="file" id="images" onChange={ this.fileSelectorHandler } multiple hidden ref={ imageInput => this.imageInput = imageInput } /></div>

							</div>
							<div className={ classes.HouseButton }>	<Button btnType="Success"> SUBMIT { this.props.loading ? <Spinner /> : '' } </Button></div>
						</div>
					</div>
					{ errorMessage }
				</form>
			</div>
		)
	}

}
const mapStateToProps = state => {
	return {
		loading: state.house.loading,
		error: state.house.error
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onAddHouse: (houseData) => dispatch(actions.addHouse(houseData))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(AddHouse, axios));