import React from 'react'
import classes from './LinkButton.module.scss';
import { Link } from 'react-router-dom'
const LinkButton = props => <Link className={classes.LinkButton} to={props.href}><span>{props.children}</span></Link>;

export default LinkButton;