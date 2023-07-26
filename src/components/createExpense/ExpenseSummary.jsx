import React, { useEffect } from "react";
import { Descriptions, Typography } from "antd";

const { Title } = Typography;

const ExpenseSummary = ({selectedCategory, selectedAmount }) => {
  useEffect(() => {});
  return (
    <>
      <Title level={3}>Expense summary</Title>
      <Descriptions bordered layout="horizontal" column={1}>
        <Descriptions.Item label="Category">{selectedCategory.name}</Descriptions.Item>
        <Descriptions.Item label="Amount">{selectedAmount}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default ExpenseSummary;
