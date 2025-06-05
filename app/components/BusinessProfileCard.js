import React from "react";

const BusinessProfileCard = ({ businessProfile, stockData }) => {
  if (!businessProfile) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No business profile data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {businessProfile.business_name}
            </h2>
            <p className="text-gray-600">
              {businessProfile.industry} • {businessProfile.sub_industry}
            </p>
          </div>
          {stockData?.mainCompany && (
            <div className="text-right">
              <span className="text-sm font-medium text-gray-500">
                Stock Symbol
              </span>
              <p className="text-lg font-semibold text-gray-800">
                {stockData.mainCompany.symbol}
              </p>
              <p className="text-sm text-gray-600">
                {stockData.mainCompany.exchDisp}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Business Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Company Information
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Founded</span>
              <p className="text-gray-800">{businessProfile.founded_year}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Location</span>
              <p className="text-gray-800">{businessProfile.location}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Employees</span>
              <p className="text-gray-800">
                {businessProfile.employee_count?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Leadership</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-500">Ownership</span>
              <p className="text-gray-800">{businessProfile.owner_name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Competitors Section */}
      {stockData?.competitors && stockData.competitors.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Key Competitors
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {stockData.competitors.map(
              (competitor, index) =>
                competitor && (
                  <div key={index} className="bg-gray-50 rounded p-3">
                    <p className="font-medium text-gray-800">
                      {competitor.name}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-600">
                        {competitor.symbol}
                      </span>
                      <span className="text-sm text-gray-500">
                        {competitor.exchDisp}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProfileCard;
