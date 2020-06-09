import React from 'react';
import classes from './NavigationItems.module.css';
import Auxilary from '../../../hoc/Auxiliary/Auxiliary'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={ classes.NavigationItems }>
		<NavigationItem link="/" exact>Home</NavigationItem>
		{!props.isAuthenticated? <Auxilary>
			<NavigationItem link="/signup">Signup</NavigationItem>
						<NavigationItem link="/login">Login</NavigationItem>
		</Auxilary>
		
            : <NavigationItem link="/logout">Logout</NavigationItem>}
		

	</ul>
);

export default navigationItems;