import React from 'react';
import classes from './Pagination.module.scss';
import PageNumber from './PageNumber/PageNumber';

const Pagination = props => {
    return <div className={classes.Pagination}>
        <PageNumber value="&lt;" onPageChange={() => props.onPageClick(props.activePage === 0 ? props.totalPages - 1 : props.activePage - 1)} />
        {[...Array(props.totalPages)
            .keys()]
            .map((page, index) => <PageNumber value={index + 1} key={index} onPageChange={() => props.onPageClick(index)} isActive={props.activePage === index} />)}

        <PageNumber value="&gt;" onPageChange={() => props.onPageClick(props.activePage === props.totalPages - 1 ? 0 : props.activePage + 1)} />

    </div>
};

export default Pagination;