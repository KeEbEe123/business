import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MapPin,
  Target,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

export function AISuggestions({ analysis }) {
  const locationBased = analysis?.location_based || [];
  const channelSpecific = analysis?.channel_specific || [];

  // Combine and format the recommendations for display
  const recommendations = [
    ...locationBased.map((rec) => ({
      category: "Location-Based",
      icon: MapPin, // Using MapPin icon for location-based
      priority: "High", // Default priority, can be adjusted if API provides it
      title: rec.split(":")[0] || "Location-Based Recommendation", // Use part before colon as title
      description: rec, // Use the whole string as description for now
    })),
    ...channelSpecific.map((rec) => ({
      category: "Channel-Specific",
      icon: Users, // Using Users icon for channel-specific
      priority: "Medium", // Default priority, can be adjusted
      title: rec.split(":")[0] || "Channel-Specific Recommendation", // Use part before colon as title
      description: rec, // Use the whole string as description for now
    })),
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          <span>AI-Powered Strategic Recommendations</span>
        </CardTitle>
        <CardDescription>
          Personalized insights and actionable strategies based on your business
          data and market analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.length > 0 ? (
            recommendations.map((suggestion, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <suggestion.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {suggestion.category}
                      </p>
                      <h3 className="font-semibold text-gray-900">
                        {suggestion.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No strategic recommendations available yet.
            </p>
          )}
        </div>

        {/* Removed the static Location-Based Insights section */}
      </CardContent>
    </Card>
  );
}
