"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  FileText,
  Database,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadComplete(false);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const fileContent = await selectedFile.text();
      const businessData = JSON.parse(fileContent);

      // Send data to our API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze data");
      }

      const analysis = await response.json();

      // Store the analysis in localStorage for the dashboard to use
      localStorage.setItem("businessAnalysis", JSON.stringify(analysis));

      setUploadComplete(true);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                AnalyticsAI
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your Business Data
          </h1>
          <p className="text-lg text-gray-600">
            Upload your JSON file to get started with AI-powered analytics
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Select your business data file in JSON format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file">Business Data File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                </div>

                {selectedFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{selectedFile.name}</span>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-gray-600">
                      Analyzing your data...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-red-800">Error</p>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload and Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>What We Analyze</CardTitle>
              <CardDescription>
                Our AI will automatically detect and analyze these key metrics
                from your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Financial Trends</h4>
                    <p className="text-sm text-gray-600">
                      Revenue, profit, and marketing spend analysis
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Profit Margins</h4>
                    <p className="text-sm text-gray-600">
                      Expense breakdown and margin optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Customer Metrics</h4>
                    <p className="text-sm text-gray-600">
                      CAC, retention, and transaction value insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Marketing ROI</h4>
                    <p className="text-sm text-gray-600">
                      Traffic correlation and campaign effectiveness
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Forecasting</h4>
                    <p className="text-sm text-gray-600">
                      Predictive analytics and future projections
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">Data Privacy</p>
                    <p className="text-amber-700">
                      Your data is processed securely and never stored
                      permanently. All analysis happens in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
