import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { LoadingOutlined, EditTwoTone } from "@ant-design/icons";
import ExpenseModal from "../modals/ExpenseModal";

function ExpensesTable({ refreshData, loading, Expenses }) {
    const [currentItem, setCurrentItem] = useState(undefined);

    const showModal = async (item) => {
        setCurrentItem(item);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Cost",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Creation Date",
            dataIndex: "creationDate",
            key: "creationDate"
        }
        ,{
            title: "Expense Date",
            dataIndex: "expenseDate",
            key: "expenseDate"
        }
        ,{
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category) => (category ? category.name : "N/A"),
        },
        {
            title: "Edit",
            dataIndex: "Edit",
            fixed: "right",
            width: 60,
            render: (_, record) => {
                return <EditTwoTone style={{ fontSize: 22 }} onClick={() => showModal(record)} />;
            },
        },
    ];
    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
    return (
        <>
            <Table
                dataSource={Expenses}
                columns={columns}
                loading={{ indicator: antIcon, spinning: loading }}
                pagination={{ defaultPageSize: 10 }}
                rowKey={(record) => record.id}
                scroll={{ x: true }}
            />
            {currentItem && (
                <ExpenseModal
                    currentItem={currentItem}
                    closeModal={() => {
                        setCurrentItem(undefined);
                    }}
                    refreshData={refreshData}
                />
            )}
        </>
    );
}

export default ExpensesTable;
