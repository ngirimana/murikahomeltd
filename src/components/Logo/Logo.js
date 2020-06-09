import React from 'react';
import Logo from '../../assets/images/MRK_2.png';
import classes from './Logo.module.css';

const logo = (props) => (
	<div className={ classes.Logo } style={ { height: props.height } }>
		<img src={ Logo } alt="Murika Home" />
		<h2 className={ classes.Name }>Murika Home</h2>
	</div>
);

export default logo;