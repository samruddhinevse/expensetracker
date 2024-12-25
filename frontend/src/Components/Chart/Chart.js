import React from 'react'
import { Chart as ChartJs, 
    ArcElement, 
    Tooltip, 
    Legend 
} from 'chart.js'

import { Pie } from 'react-chartjs-2' // Import Pie chart
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    // Calculate total income and expenses
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0)
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
    const total = totalIncome + totalExpenses

    const data = {
        labels: ['Income', 'Expenses'], // Pie chart sections
        datasets: [
            {
                label: 'Finance Overview',
                data: [totalIncome, totalExpenses], // Data for income and expenses
                backgroundColor: ['green', 'red'], // Colors for income and expenses sections
                borderColor: ['white', 'white'], // Border color for sections
                borderWidth: 2
            }
        ]
    }

    return (
        <ChartStyled>
            <Pie data={data} /> {/* Use Pie chart */}
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
