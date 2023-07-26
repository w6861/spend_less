import React, {useState, useEffect} from "react";
import {Input, Form, Select, Button, InputNumber, message, DatePicker} from "antd";
import {WarningOutlined} from "@ant-design/icons";
import {addExpense, updateExpense} from "../../utils/api/expenses";
import {getCategories, getCategory} from "../../utils/api/categories";

const {Option} = Select;

function CreateExpense({locations, closeAddExpense, refreshData}) {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState();
    const [availableCategories, setAvailableCategories] = useState([]);
    const [categories, setCategories] = useState(null);

    const getAvailableCategories = async () => {
        try {
            let response = await getCategories();
            let categoriesData = await response.json();
            setCategories(categoriesData);
            return categoriesData;
        } catch (error) {
            console.log(error);
            setAvailableCategories([]); // Handle error by setting empty categories
        }
    };

    useEffect(() => {
        getAvailableCategories();
    }, []);

    const addExps = async () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then(async (validatedFields) => {
                await addExpense(validatedFields).then(async (response) => {
                    if (!response.ok) {
                        console.log(response);
                        const e = await response.json();
                        message.error(e.message);
                    } else {
                        closeAddExpense();
                        message.success("Expense Added");
                        refreshData();
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
        setConfirmLoading(false);
    };
    return (
        <Form form={form} preserve={false}
              style={{border: "solid 1px rgba(0, 0, 0, 0.06)", padding: "20px", width: "auto"}} layout="vertical">
            <Form.Item label="Name" name="name" rules={[
                {
                    required: true,
                    message: "Please input name!",
                },
            ]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Cost" name="amount" rules={[
                {
                    required: true,
                    message: "Please input cost!",
                    type: "number",
                    min: 0,
                    max: 999999,
                },
            ]}>
                <InputNumber min={0} max={999999} />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input/>
            </Form.Item>
            <Form.Item label="Expense Date" name="expenseDate" rules={[
                {
                    required: true,
                    message: "Please input date!",
                },
            ]}>
                <DatePicker style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[
                {
                    required: true,
                    message: "Please input category!",
                },
            ]}>
                <Select
                    placeholder="Category"
                    style={{width: "auto"}}
                    value={currentCategory}
                    onChange={(value) => getAvailableCategories()}
                >
                    {Array.isArray(categories) &&
                        categories.map((category) => (
                            <Option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" onClick={addExps} loading={confirmLoading}>
                Add Expense
            </Button>
            <Button onClick={closeAddExpense} loading={confirmLoading} style={{float: "right"}}>
                Close
            </Button>
        </Form>
    );
}

export default CreateExpense;
