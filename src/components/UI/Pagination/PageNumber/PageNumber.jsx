import React from 'react'
import classes from './PageNumber.module.scss'

const PageNumber = props => {
    const styles = [classes.PageNumber]
    if (props.isActive) {
        styles.push(classes.Active)
    }
    return <span
        className={styles.join(' ')}
        onClick={props.onPageChange}>
        {props.value}
    </span>
}

export default PageNumber;