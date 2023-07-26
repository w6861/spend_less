import React, { useState, useEffect } from "react";
import { Button, Divider, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateCategory from "../components/createForms/CreateCategory";
import CategoriesTable from "../components/tables/CategoriesTable";
import {getCategories} from "../utils/api/categories";

const { Title } = Typography;

const Categories = () => {
    const [addCategoryVisible, setAddCategoryVisible] = useState();
    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState(null);

    const toggleAddCategoryVisibility = () => {
        addCategoryVisible ? setAddCategoryVisible(false) : setAddCategoryVisible(true);
    };

    const refreshData = async () => {
        const fetch = async () => {
            setLoading(true);
            let categories = await getCategories();
            setCategories(await categories.json());
            setLoading(false);
        };
        fetch();
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
            <Title>Categories</Title>
            <Button icon={<PlusOutlined />} style={{ display: addCategoryVisible ? "none" : "inline-block" }} onClick={toggleAddCategoryVisibility}>
                Add new Category
            </Button>
            {addCategoryVisible && categories && (
                <CreateCategory
                    toggleAddCategoryVisibility={() => toggleAddCategoryVisibility()}
                    categories={categories}
                    closeAddCategory={() => setAddCategoryVisible(false)}
                    refreshData={() => refreshData()}
                />
            )}
            <Divider />
            <CategoriesTable loading={loading} categories={categories} refreshData={refreshData} />
        </>
    );
};

export default Categories;
