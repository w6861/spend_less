import React, {useEffect, useState} from "react";
import {Divider, Form, Input, InputNumber, Select, Typography} from "antd";
import {getCategories} from "utils/api/categories";

const {Title} = Typography;

const ChooseCategory = ({setCategory, selectedCategory}) => {
    const [Categories, setCategories] = useState(undefined);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async function () {
            const p = await getCategories();
            setCategories(await p.json());
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            form.setFieldsValue({
                Category: selectedCategory.name,
                Name: selectedCategory.name,
            });
        }
    }, [selectedCategory]);

    return (
        <Form form={form} labelCol={{span: 3, offset: 0}} layout="horizontal">
            <Title level={3}>Category</Title>
            <Form.Item label="Category: " name="Category">
                <Select
                    style={{width: "auto"}}
                    dropdownMatchSelectWidth={false}
                    placeholder="Choose a category"
                    onChange={(_, key) => {
                        setCategory(JSON.parse(key.key));
                    }}
                    options={
                        Categories &&
                        Categories.map((category) => ({
                            value: `${category.name}`,
                            key: JSON.stringify(category),
                        }))
                    }
                >
                    {" "}
                </Select>
            </Form.Item>
            <Form.Item label="Category name" name="Name">
                <Input type={"text"} style={{width: "auto"}} disabled={true}></Input>
            </Form.Item>
            <Divider></Divider>
        </Form>
    );
};

export default ChooseCategory;
