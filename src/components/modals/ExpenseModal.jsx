import React, {useState, useEffect} from "react";
import {Modal, Input, Form, Button, Popconfirm, message, Select, DatePicker} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {removeExpense, updateExpense} from "../../utils/api/expenses";
import {getCategories} from "../../utils/api/categories";

const {Option} = Select;

function ExpenseModal({currentItem: currentExpense, closeModal, refreshData}) {
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
        form.setFieldsValue({
            name: currentExpense.name,
            cost: currentExpense.amount,
            description: currentExpense.description,
            expense_date: currentExpense.expenseDate,
            category: currentExpense.category?.categoryId, // Fixed: use categoryId
        });
    }, [currentExpense]);

    useEffect(() => {
        if (currentCategory) {
            // Filter availableCategories based on the selected category (if any)
            setAvailableCategories(
                categories.filter((category) => category.categoryId === currentCategory)
            );
        } else {
            // If no category is selected, reset availableCategories to the original list
            setAvailableCategories(categories);
        }
    }, [currentCategory, categories]);

    const saveCurrentExpense = async () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then(async (validatedFields) => {
                await updateExpense(currentExpense.expenseId, validatedFields).then(async (response) => {
                    if (!response.ok) {
                        console.log(response);
                        const e = await response.json();
                        message.error(e.message);
                    } else {
                        closeModal();
                        message.success("Expense Modified");
                        refreshData();
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
        setConfirmLoading(false);
    };

    const removeCurrentExpense = async () => {
        setDeleteLoading(true);
        try {
            await removeExpense(currentExpense.expenseId);
            message.success("Expense Removed");
        } catch (error) {
            message.error("Error");
            console.log(error);
        } finally {
            setDeleteLoading(false);
            closeModal();
        }
    };

    return (
        <Modal
            title="Modify Expense"
            visible={Boolean(currentExpense)}
            onCancel={closeModal}
            onOk={saveCurrentExpense}
            afterClose={() => Modal.destroyAll()}
            confirmLoading={confirmLoading}
            footer={[
                <Popconfirm
                    title="Are you sure you want to delete this Expense?"
                    okText="Yes"
                    cancelText="No"
                    key="delete"
                    onConfirm={removeCurrentExpense}
                >
                    <Button type="primary" danger loading={deleteLoading} style={{float: "left"}}>
                        <DeleteOutlined/>
                    </Button>
                </Popconfirm>,
                <Button key="back" onClick={closeModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={saveCurrentExpense}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} preserve={false} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                <Form.Item label="Name" name="name" rules={[
                    {
                        required: true,
                        message: "Please input name!",
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Cost" name="amount">
                    <Input/>
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
                        onChange={(value) => setCurrentCategory(value)}
                    >
                        {Array.isArray(categories) &&
                            categories.map((category) => (
                                <Option key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ExpenseModal;
