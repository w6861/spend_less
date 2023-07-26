import React, {useState, useEffect} from "react";
import {Input, Form, Select, Button, InputNumber, message} from "antd";
import {addCategory} from "../../utils/api/categories";

const {Option} = Select;

function CreateCategory({closeAddCategory, refreshData}) {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState();


    const addCtgr = async () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then(async (validatedFields) => {
                await addCategory(validatedFields).then(async (response) => {
                    if (!response.ok) {
                        console.log(response);
                        const e = await response.json();
                        message.error(e.message);
                    } else {
                        message.success("Category Added");
                        closeAddCategory();
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
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input category name!",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Button type="primary" htmlType="submit" onClick={addCtgr} loading={confirmLoading}>
                Add Category
            </Button>
            <Button onClick={closeAddCategory} loading={confirmLoading} style={{float: "right"}}>
                Close
            </Button>
        </Form>
    );
}

export default CreateCategory;
