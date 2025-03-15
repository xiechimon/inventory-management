import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import React from "react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesChart from "../components/overview/SalesChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";

const OverviewPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="概览" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SalesChart />
                    <CategoryDistributionChart />
                    <SalesChannelChart />
                </div>
            </main>
        </div>
    );
};

export default OverviewPage;
