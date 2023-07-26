import React, {useState, useEffect} from "react";
import {Modal, Input, Form, Button, Popconfirm, message} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {removeCategory, updateCategory} from "../../utils/api/categories";

function CategoryModal({currentItem: currentCategory, closeModal, refreshData}) {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState();
    const [deleteLoading, setDeleteLoading] = useState();
    console.log(currentCategory)
    console.debug(currentCategory)

    const saveCurrentCategory = async () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then(async (validatedFields) => {
                await updateCategory(currentCategory.categoryId, validatedFields).then(async (response) => {
                    if (!response.ok) {
                        console.log(response);
                        const e = await response.json();
                        message.error(e.message);
                    } else {
                        closeModal();
                        message.success("Category modified");
                        refreshData();
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
        setConfirmLoading(false);
    };

    const removeCurrentCategory = async () => {
        setDeleteLoading(true);
        let categoryId = currentCategory.categoryId;
        try {
            await removeCategory(categoryId);
            message.success("Category Removed");
        } catch (error) {
            message.error("Error");
            console.log(error);
        }
        setDeleteLoading(false);
        closeModal();
    };

    useEffect(() => {
        form.setFieldsValue({
            name: currentCategory.name,
        });
    }, []);

    return (
        <Modal
            title="Modify Category"
            visible={currentCategory}
            onCancel={closeModal}
            onOk={async () => saveCurrentCategory()}
            afterClose={() => Modal.destroyAll()}
            confirmLoading={confirmLoading}
            footer={[
                <Popconfirm
                    title="Are you sure you want to delete this Category?"
                    okText="Yes"
                    cancelText="No"
                    key="delete"
                    onConfirm={removeCurrentCategory}
                >
                    <Button type="primary" danger loading={deleteLoading} style={{float: "left"}}>
                        <DeleteOutlined/>
                    </Button>
                </Popconfirm>,
                <Button key="back" onClick={closeModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={saveCurrentCategory}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} preserve={false} labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CategoryModal;
