import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function fetchStockData(companyName) {
  if (!companyName) {
    console.error("No company name provided");
    return null;
  }

  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/search",
    params: { search: companyName },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (
      !response.data ||
      !response.data.body ||
      !Array.isArray(response.data.body) ||
      response.data.body.length === 0
    ) {
      console.error(`No stock data found for ${companyName}`);
      return null;
    }
    return response.data.body[0]; // Return the first matching result
  } catch (error) {
    console.error(`Error fetching stock data for ${companyName}:`, error);
    return null;
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // First, get domain and competitor analysis from Gemini
    const domainPrompt = `Analyze this business data and identify the company's domain and suggest two main competitors. Return ONLY a JSON object with this structure:
    {
      "domain": "description of the company's main business domain",
      "competitors": ["competitor1", "competitor2"]
    }
    
    Business Profile: ${JSON.stringify(data.business_profile)}
    Financials: ${JSON.stringify(data.financials)}
    Customer Metrics: ${JSON.stringify(data.customer_metrics)}
    Digital Presence: ${JSON.stringify(data.digital_presence)}
    Growth Goals: ${JSON.stringify(data.growth_goals)}
    Competitor Info: ${JSON.stringify(data.competitor_info)}`;

    const domainResponse = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: domainPrompt,
    });

    // Extract the JSON content from the domain response
    const domainResponseText = domainResponse.text;
    let domainJsonContent = domainResponseText;

    // Remove markdown code block if present
    if (domainResponseText.includes("```json")) {
      domainJsonContent = domainResponseText
        .split("```json")[1]
        .split("```")[0]
        .trim();
    } else if (domainResponseText.includes("```")) {
      domainJsonContent = domainResponseText
        .split("```")[1]
        .split("```")[0]
        .trim();
    }

    let domainAnalysis = JSON.parse(domainJsonContent);

    // Fetch stock data for the company and competitors
    const companyName = data.business_profile.name;
    const stockData = {
      mainCompany: await fetchStockData(companyName),
      competitors: await Promise.all(
        domainAnalysis.competitors.map((comp) => fetchStockData(comp))
      ),
    };

    // Create the main analysis prompt
    const prompt = `Analyze this business data and provide insights in JSON format. Return ONLY the JSON object without any markdown formatting or additional text:
    Business Profile: ${JSON.stringify(data.business_profile)}
    Financials: ${JSON.stringify(data.financials)}
    Customer Metrics: ${JSON.stringify(data.customer_metrics)}
    Digital Presence: ${JSON.stringify(data.digital_presence)}
    Growth Goals: ${JSON.stringify(data.growth_goals)}
    Competitor Info: ${JSON.stringify(data.competitor_info)}
    Stock Data: ${JSON.stringify(stockData)}

    Return a JSON object with this structure:
    {
      "business_profile": {
        "business_name": "string",
        "industry": "string",
        "sub_industry": "string",
        "founded_year": "number",
        "location": "string",
        "employee_count": "number",
        "owner_name": "string",
        "description": "string",
        "key_products": ["string"],
        "market_position": "string"
      },
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
      model: "gemini-1.5-flash",
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

    // Add stock data to the response
    analysis.stockData = stockData;

    // Ensure business profile data is included
    if (!analysis.business_profile) {
      analysis.business_profile = data.business_profile;
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing data:", error);
    return NextResponse.json(
      { error: "Failed to analyze data" },
      { status: 500 }
    );
  }
}
