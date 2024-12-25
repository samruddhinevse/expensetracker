import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome, updateIncome} = useGlobalContext();
    const [editingIncome, setEditingIncome] = useState(null);
    const [editedIncome, setEditedIncome] = useState({
        title: '',
        amount: '',
        description: '',
        category: '',
        type: ''
    });

    useEffect(() => {
        getIncomes();
    }, []);

    const handleEditClick = (income) => {
        setEditingIncome(income._id);
        setEditedIncome({
            title: income.title,
            amount: income.amount,
            description: income.description,
            category: income.category,
            type: income.type
        });
    };

    const handleSaveEdit = () => {
        updateIncome(editingIncome, editedIncome);
        setEditingIncome(null); // Reset the editing state
    };

    const handleCancelEdit = () => {
        setEditingIncome(null); // Reset the editing state
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return (
                                <div key={_id}>
                                    {editingIncome === _id ? (
                                        <div>
                                            <h3>Edit Income</h3>
                                            <input 
                                                type="text" 
                                                value={editedIncome.title}
                                                onChange={(e) => setEditedIncome({ ...editedIncome, title: e.target.value })}
                                                placeholder="Title"
                                            />
                                            <input 
                                                type="number" 
                                                value={editedIncome.amount}
                                                onChange={(e) => setEditedIncome({ ...editedIncome, amount: e.target.value })}
                                                placeholder="Amount"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedIncome.description}
                                                onChange={(e) => setEditedIncome({ ...editedIncome, description: e.target.value })}
                                                placeholder="Description"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedIncome.category}
                                                onChange={(e) => setEditedIncome({ ...editedIncome, category: e.target.value })}
                                                placeholder="Category"
                                            />
                                            <input 
                                                type="text" 
                                                value={editedIncome.type}
                                                onChange={(e) => setEditedIncome({ ...editedIncome, type: e.target.value })}
                                                placeholder="Type"
                                            />
                                            <button className='save' onClick={handleSaveEdit}>Save</button>
                                            <button className='cancel' onClick={handleCancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <IncomeItem
                                            key={_id}
                                            id={_id} 
                                            title={title} 
                                            description={description} 
                                            amount={amount} 
                                            date={date} 
                                            type={type}
                                            category={category} 
                                            indicatorColor="var(--color-green)"
                                            deleteItem={deleteIncome}
                                        />
                                    )}
                                    <button className="edit-button" onClick={() => handleEditClick(income)}>Edit</button>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
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
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
    button {
        margin-left: 10px;
        cursor: pointer;
    }
    input {
        margin: 5px;
    }

    .edit-button {
        background-color: var(--primary-color); 
        color: #fff; /* White text */
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
        }}

    .cancel {
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
        }}
`;

export default Income;
