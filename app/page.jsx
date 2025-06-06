import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Brain,
  Upload,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                StartupAssistor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/upload">
                <Button variant="outline">Get Started</Button>
              </Link>
              <Link href="/dashboard">
                <Button>View Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Business Data Into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {" "}
                Actionable Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your business reports and get AI-powered analytics
              including financial trends, profit margins, customer efficiency,
              marketing ROI, and predictive forecasting—all in one intelligent
              dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="text-lg px-8 py-3">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Your Data
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Business Intelligence
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to understand and optimize your business
              performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Financial Trends</h3>
                <p className="text-gray-600">
                  Track revenue, profit, and marketing spend trends with
                  advanced time-series analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profit Margins</h3>
                <p className="text-gray-600">
                  Detailed expense breakdown and margin analysis over time
                  periods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Customer Efficiency
                </h3>
                <p className="text-gray-600">
                  Analyze CAC, retention rates, and transaction values for
                  customer insights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Marketing ROI</h3>
                <p className="text-gray-600">
                  Correlate website traffic with revenue growth and marketing
                  effectiveness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Competitor Analysis
                </h3>
                <p className="text-gray-600">
                  Benchmark your revenue and social reach against industry
                  competitors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Forecasting</h3>
                <p className="text-gray-600">
                  Predictive analytics and location-based strategic
                  recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business Analytics?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using AI-powered insights to
            drive growth
          </p>
          <Link href="/upload">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Zap className="mr-2 h-5 w-5" />
              Start Your Analysis Now
            </Button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-lg font-semibold">StartupAssistor</span>
          </div>
          <p className="text-gray-400">
            Empowering businesses with intelligent analytics and actionable
            insights.
          </p>
        </div>
      </footer>
    </div>
  );
}
