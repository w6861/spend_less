import React, { useEffect, useState } from "react";
import { Typography, Table, DatePicker, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getRaport } from "../utils/api/raports"; // Import the getRaport function

const { Title } = Typography;
const { RangePicker } = DatePicker;

function ExpensesStats({stats, predictions, refreshData }) {
    const [timeRange, setTimeRange] = useState([]);
    const [raports, setRaports] = useState(null);
    const [loading, setLoading] = useState(false); // Define the loading state

    useEffect(() => {
        refreshData();
    }, []);



    const handleDateChange = (dates) => {
        setTimeRange(dates);
    };

    const handleRefreshClick = async () => {
        await refreshRaportByTimeRange();
    };

    function getTimestamp (timeStamp) {
        const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date(timeStamp);

        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    }
    const refreshRaportByTimeRange = async () => {
        try {
            setLoading(true);
            const [timeFrom, timeTo] = timeRange;
            if (timeFrom && timeTo) {
                let timeFromT = getTimestamp(timeFrom);
                let timeToT = getTimestamp(timeTo);
                const raportsByTimeRange = await getRaport(timeFromT, timeToT);
                setRaports(await raportsByTimeRange.json());
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching raport by time range:", error);
            setLoading(false);
        }
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

    if (!stats) {
        return (
            <>
                <Title>Statistics</Title>
                <p>Loading...</p>
            </>
        );
    }

    // Define the columns
    const statsColumns = [
        {
            title: "Warnings",
            dataIndex: "warnings",
            key: "warnings",
            render: (warnings) => (
                <>
                    {warnings.map((warning, index) => (
                        <p key={index}>{warning}</p>
                    ))}
                </>
            ),
        },
    ];

    const predictionsColumns = [
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "name",
        },
        {
            title: "Average expenses costs",
            dataIndex: "expensesAvg",
            key: "expensesAvg",
        },
    ];

    const raportsColumns = [
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Total Expenses",
            dataIndex: "expensesSum",
            key: "expensesSum",
        },
    ];

    return (
        <>
            <Title>Statistics</Title>

            <Table
                dataSource={[stats]}
                columns={statsColumns}
                loading={{ indicator: antIcon, spinning: loading }}
                pagination={{ defaultPageSize: 10 }}
                rowKey={(record) => record.id}
                scroll={{ x: true }}
            />

            {predictions && predictions.categoryPredictions && (
                <Table
                    dataSource={predictions.categoryPredictions}
                    columns={predictionsColumns}
                    loading={{ indicator: antIcon, spinning: loading }}
                    pagination={{ defaultPageSize: 10 }}
                    rowKey={(record) => record.categoryName}
                    scroll={{ x: true }}
                />
            )}
            <RangePicker onChange={handleDateChange} value={timeRange} />
            <Button type="primary" onClick={handleRefreshClick}>
                Refresh Data
            </Button>
            {raports && raports.mostExpensiveCategories && (
                <Table
                    dataSource={raports.mostExpensiveCategories}
                    columns={raportsColumns}
                    loading={{ indicator: antIcon, spinning: loading }}
                    pagination={{ defaultPageSize: 10 }}
                    rowKey={(record) => record.categoryName}
                    scroll={{ x: true }}
                />
            )}
        </>
    );
}

export default ExpensesStats;
