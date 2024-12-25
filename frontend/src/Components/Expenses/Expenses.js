import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem' // Rename if needed for consistency

function Expenses() {
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses, updateExpense } = useGlobalContext();
    const [editingExpense, setEditingExpense] = useState(null);  // For managing the state of editing
    const [editedExpense, setEditedExpense] = useState({
            title: '',
            amount: '',
            description: '',
            category: '',
            type: ''
        });

    useEffect(() => {
        getExpenses();
    }, []);

    const handleEditClick = (expense) => {
        setEditingExpense(expense._id);
        setEditedExpense({
            title: expense.title,
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
            type: expense.type
        });
    };

    const handleSaveEdit = () => {
        updateExpense(editingExpense, editedExpense);
        setEditingExpense(null); // Reset the editing state
    };

    const handleCancelEdit = () => {
        setEditingExpense(null); // Cancel edit
    };

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expenses">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        {/* Render ExpenseForm with a condition to handle update */}
                        <ExpenseForm
                            editingExpense={editingExpense}
                            setEditingExpense={setEditingExpense}
                            handleCancelEdit={handleCancelEdit}
                        />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <div key={_id}>
                                    {editingExpense === _id ? (
                                        <div>
                                            <h3>Edit Expense</h3>
                                            <input 
                                                type="text" 
                                                value={editedExpense.title}
                                                onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })}
                                                placeholder="Title"
                                            />
                                            <input 
                                                type="number" 
                                                value={editedExpense.amount}
                                                onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                                                placeholder="Amount"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedExpense.description}
                                                onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                                                placeholder="Description"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedExpense.category}
                                                onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                                                placeholder="Category"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedExpense.type}
                                                onChange={(e) => setEditedExpense({ ...editedExpense, type: e.target.value })}
                                                placeholder="Type"
                                            />
                                            <button className='save' onClick={handleSaveEdit}>Save</button>
                                            <button className='cancel' onClick={handleCancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <IncomeItem
                                            id={_id} 
                                            title={title} 
                                            description={description} 
                                            amount={amount} 
                                            date={date} 
                                            type={type}
                                            category={category} 
                                            indicatorColor="var(--color-red)"
                                            deleteItem={deleteExpense}
                                            updateItem={updateExpense}
                                            handleEditExpense={handleEditClick} // Pass edit handler to each item
                                        />
                                    )}
                                   <button className="edit-button" onClick={() => handleEditClick(expense)}>Edit</button>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expenses {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .expense-content {
        display: flex;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }

    .edit-button {
        background-color: var(--primary-color); 
        color: #fff; 
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: var( --color-green); 
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }
    }

    .save {
    background-color: var(--primary-color); 
        color: #fff; 
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: var( --color-green); 
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }
    }

    .cancel{
    background-color: var(--primary-color); 
        color: #fff; 
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: var( --color-green); 
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }
            
    }
`;

export default Expenses;
