import './eventPage.scss';
import React from 'react';
import NavBar from '../../components/shared/navBar/NavBar';
import UserBar from '../../components/shared/userBar/UserBar';
import ExpensesList from '../../components/expenses/ExpensesList';
import { useParams } from 'react-router-dom';

export default function EventPage() {
    const { id } = useParams();

    return (
        <div className="base-box2">
            <div className='pagetitle'>
                <h1>Expense Calculator</h1>
            </div>
            <ExpensesList id={id} />
            <UserBar />
            <NavBar />
        </div>
    )
}