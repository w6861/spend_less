import React, { useState, useEffect } from "react";
import { Button, Divider, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateExpense from "../components/createForms/CreateExpense";
import ExpensesTable from "../components/tables/ExpensesTable";
import {getExpenses} from "../utils/api/expenses";

const { Title } = Typography;

const Expenses = () => {
    const [addExpenseVisible, setAddExpenseVisible] = useState();
    const [loading, setLoading] = useState();
    const [Expenses, setExpenses] = useState(null);

    const toggleAddExpenseVisibility = () => {
        addExpenseVisible ? setAddExpenseVisible(false) : setAddExpenseVisible(true);
    };

    const refreshData = async () => {
        const fetch = async () => {
            setLoading(true);
            let Expenses = await getExpenses();
            setExpenses(await Expenses.json());
            setLoading(false);
        };
        fetch();
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <Title>Expenses</Title>
            <Button icon={<PlusOutlined />} style={{ display: addExpenseVisible ? "none" : "inline-block" }} onClick={toggleAddExpenseVisibility}>
                Add new Expense
            </Button>
            {addExpenseVisible && Expenses && (
                <CreateExpense
                    toggleAddExpenseVisibility={() => toggleAddExpenseVisibility()}
                    Expenses={Expenses}
                    closeAddExpense={() => setAddExpenseVisible(false)}
                    refreshData={() => refreshData()}
                />
            )}
            <Divider />
            <ExpensesTable loading={loading} Expenses={Expenses} refreshData={refreshData} />
        </>
    );
};

export default Expenses;
