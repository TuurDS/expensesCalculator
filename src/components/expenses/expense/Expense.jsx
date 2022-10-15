import React from 'react'
import "./expense.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export default function Expense({ expense }) {
    console.log(expense);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(amount.toFixed(2));
    }

    //format date to dd/mm/yyyy hh:mm
    const formatDate = (date) => {
        //if the date is in this year, don't show the year
        if (new Date(date).getFullYear() === new Date().getFullYear()) {
            return new Date(date).toLocaleDateString('nl-BE', { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' });
        } else {
            return new Date(date).toLocaleDateString('nl-BE', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
    }

    return (
        <div className='expense'>
            <div className="description">{expense.description}</div>
            <div className="amount"><div className="center">{formatCurrency(expense.amount)}</div></div>
            <div className="date"><div className="label">at:</div>{formatDate(expense.date)}</div>
            <div className="paidby"><div className="label">paidby:</div>{expense.paid.name}</div>
            <div className="splittype"><div className="label">splitType:</div>{expense.splitType}</div>
            <div className="editicon"><div className="center"><FontAwesomeIcon icon={faEdit} /></div></div>
        </div>
    )
}

