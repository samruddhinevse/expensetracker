import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Calculate total income
  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      console.log('Income added successfully:', response.data);
      getIncomes(); // Refresh incomes list after successful addition
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error adding income:', err);
    }
  };

  const updateIncome = async (id, updatedIncome) => {
    try {
      const response = await axios.put(`${BASE_URL}update-income/${id}`, updatedIncome);
      console.log('Income updated successfully:', response.data);
      getIncomes(); // Refresh incomes list after successful update
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error updating income:', err);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching incomes:', err);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes(); // Refresh incomes list after successful deletion
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error deleting income:', err);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Calculate total expenses
  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses(); // Refresh expenses list after successful addition
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error adding expense:', err);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`${BASE_URL}update-expense/${id}`, updatedExpense);
      console.log('Expense updated successfully:', response.data);
      getExpenses(); // Refresh expenses list after successful update
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error updating expense:', err);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses(); // Refresh expenses list after successful deletion
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
      console.error('Error deleting expense:', err);
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider value={{
      addIncome,
      updateIncome,
      getIncomes,
      incomes,
      deleteIncome,
      expenses,
      totalIncome,
      addExpense,
      updateExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      error,
      setError,
      isAuthenticated,
      login,
      logout,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
