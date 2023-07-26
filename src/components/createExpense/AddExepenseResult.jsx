import React from "react";
import { Button, Result } from "antd";

const AddExpenseResult = ({ createdExpenseId }) => {
    return (
        <Result
            status="success"
            title="Your expense has been succesfully added!"
            subTitle={`Expense number: ${createdExpenseId}.`}
            extra={[
                <Button type="primary" onClick={() => window.location.reload()}>
                    Add new Expense
                </Button>,
            ]}
        />
    );
};

export default AddExpenseResult;
