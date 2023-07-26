import React, { useEffect, useState } from "react";
import ExpensesStats from "../components/ExpensesStats";
import { getPredictions } from "../utils/api/predictions";
import { getStats } from "../utils/api/stats";
import { getRaports, getRaport } from "../utils/api/raports"; // Import the new getRaports function

function Home() {
    const [predictions, setPredictions] = useState(null);
    const [stats, setStats] = useState(null);
    const [raports, setRaports] = useState(null);
    const [timeRange, setTimeRange] = useState([]);

    const refreshData = async () => {
        try {
            const predictions = await getPredictions();
            const stats = await getStats();
            const raports = await getRaports(); // Use getRaports to fetch initial data
            setPredictions(await predictions.json());
            setStats(await stats.json());
            setRaports(await raports.json());
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const refreshRaportByTimeRange = async () => {
        try {
            const [timeFrom, timeTo] = timeRange;
            if (timeFrom && timeTo) {
                // Convert date objects to the desired format
                const formattedTimeFrom = timeFrom.toISOString();
                const formattedTimeTo = timeTo.toISOString();
                const raportsByTimeRange = await getRaport(formattedTimeFrom, formattedTimeTo);
                setRaports(await raportsByTimeRange.json());
            }
        } catch (error) {
            console.error("Error fetching raport by time range:", error);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        refreshRaportByTimeRange();
    }, [timeRange]);

    return (
        <ExpensesStats
            stats={stats}
            predictions={predictions}
            raports={raports}
            refreshData={refreshData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
        />
    );
}

export default Home;
