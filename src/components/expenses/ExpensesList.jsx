import React, { useEffect, useCallback } from 'react'
import { useEventData } from '../../hooks/useEventData';
import Expense from './expense/Expense';
import "./expensesList.scss";

export default function ExpensesList({ id }) {

    const { fetchEventData, eventData, loading, error } = useEventData();

    const updateEventData = useCallback(async () => {
        await fetchEventData(id);
    }, [fetchEventData, id]);


    useEffect(() => {
        updateEventData();
    }, [updateEventData]);

    return (
        <div className='expenseslist'>
            {
                eventData?.Expenses && eventData.Expenses.map(element => {
                    return (
                        <>
                            <Expense expense={element} key={element.id} />
                            <Expense expense={element} key={element.id} />
                            <Expense expense={element} key={element.id} />
                        </>
                    )
                })
            }
        </div>
    )
}
