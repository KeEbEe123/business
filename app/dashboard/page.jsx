"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, RefreshCw, Settings } from "lucide-react";
import { FinancialTrends } from "@/components/financial-trends";
import { ProfitMargins } from "@/components/profit-margins";
import { CustomerEfficiency } from "@/components/customer-efficiency";
import { MarketingROI } from "@/components/marketing-roi";
import { CompetitorBenchmark } from "@/components/competitor-benchmark";
import { Forecasting } from "@/components/forecasting";
import { StockMarketData } from "@/components/stock-market-data";
import { AISuggestions } from "@/components/ai-suggestions";

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("businessAnalysis");
    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Analysis Data Found</h2>
          <p className="text-gray-600 mb-6">
            Please upload your business data first
          </p>
          <Link href="/upload">
            <Button>Upload Data</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Business Analytics Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {analysis.financial_trends.revenue_growth}
              </div>
              <p className="text-sm text-green-600">
                {analysis.financial_trends.profit_trend}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Profit Margin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {analysis.profit_analysis.margin_trend}
              </div>
              <p className="text-sm text-gray-600">
                {analysis.profit_analysis.expense_breakdown}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Customer Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {analysis.customer_insights.acquisition_efficiency}
              </div>
              <p className="text-sm text-gray-600">
                {analysis.customer_insights.retention_analysis}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Marketing ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {analysis.marketing_roi.campaign_effectiveness}
              </div>
              <p className="text-sm text-gray-600">
                {analysis.marketing_roi.traffic_correlation}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FinancialTrends analysis={analysis.financial_trends} />
          <ProfitMargins analysis={analysis.profit_analysis} />
          <CustomerEfficiency analysis={analysis.customer_insights} />
          <MarketingROI analysis={analysis.marketing_roi} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <CompetitorBenchmark analysis={analysis.competitor_analysis} />
          <Forecasting analysis={analysis.forecasting} />
          <StockMarketData analysis={analysis.stock_market} />
        </div>

        <AISuggestions analysis={analysis.strategic_recommendations} />
      </div>
    </div>
  );
}
