import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { LoadingOutlined, EditTwoTone } from "@ant-design/icons";
import CategoryModal from "../modals/CategoryModal";

function CategoriesTable({ refreshData, loading, categories }) {
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
                dataSource={categories}
                columns={columns}
                loading={{ indicator: antIcon, spinning: loading }}
                pagination={{ defaultPageSize: 10 }}
                rowKey={(record) => record.id}
                scroll={{ x: true }}
            />
            {currentItem && (
                <CategoryModal
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

export default CategoriesTable;
