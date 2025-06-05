import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const data = await request.json();

    // Create a prompt for Gemini to analyze the business data
    const prompt = `Analyze this business data and provide insights in JSON format. Return ONLY the JSON object without any markdown formatting or additional text:
    Business Profile: ${JSON.stringify(data.business_profile)}
    Financials: ${JSON.stringify(data.financials)}
    Customer Metrics: ${JSON.stringify(data.customer_metrics)}
    Digital Presence: ${JSON.stringify(data.digital_presence)}
    Growth Goals: ${JSON.stringify(data.growth_goals)}
    Competitor Info: ${JSON.stringify(data.competitor_info)}

    Return a JSON object with this structure:
    {
      "financial_trends": {
        "revenue_growth": "percentage",
        "profit_trend": "description",
        "marketing_efficiency": "description"
      },
      "profit_analysis": {
        "margin_trend": "description",
        "expense_breakdown": "description",
        "optimization_suggestions": ["suggestion1", "suggestion2"]
      },
      "customer_insights": {
        "acquisition_efficiency": "description",
        "retention_analysis": "description",
        "lifetime_value": "description"
      },
      "marketing_roi": {
        "traffic_correlation": "description",
        "campaign_effectiveness": "description",
        "channel_performance": "description"
      },
      "competitor_analysis": {
        "market_position": "description",
        "competitive_advantages": ["advantage1", "advantage2"],
        "threats": ["threat1", "threat2"]
      },
      "forecasting": {
        "revenue_projection": "description",
        "growth_opportunities": ["opportunity1", "opportunity2"],
        "risk_factors": ["risk1", "risk2"]
      },
      "stock_market": {
        "sector_performance": "description",
        "market_trends": "description",
        "investment_implications": "description"
      },
      "strategic_recommendations": {
        "location_based": ["recommendation1", "recommendation2"],
        "channel_specific": ["recommendation1", "recommendation2"],
        "growth_strategies": ["strategy1", "strategy2"]
      }
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    // Extract the JSON content from the response
    const responseText = response.text;
    let jsonContent = responseText;

    // Remove markdown code block if present
    if (responseText.includes("```json")) {
      jsonContent = responseText.split("```json")[1].split("```")[0].trim();
    } else if (responseText.includes("```")) {
      jsonContent = responseText.split("```")[1].split("```")[0].trim();
    }

    const analysis = JSON.parse(jsonContent);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing data:", error);
    return NextResponse.json(
      { error: "Failed to analyze data" },
      { status: 500 }
    );
  }
}
