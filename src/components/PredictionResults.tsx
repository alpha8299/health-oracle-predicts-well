
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Disease } from "@/lib/medical-data";
import { ArrowLeft, Info, Heart, AlertTriangle, AlertCircle } from "lucide-react";

interface PredictionResultsProps {
  results: {
    disease: Disease;
    confidence: number;
  }[];
  onBack: () => void;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ results, onBack }) => {
  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return <Heart className="h-5 w-5 text-medical-green" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getSeverityText = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'Low severity - typically self-resolving';
      case 'medium':
        return 'Moderate severity - medical advice recommended';
      case 'high':
        return 'High severity - seek medical attention';
      default:
        return '';
    }
  };

  const getConfidenceClass = (confidence: number) => {
    if (confidence >= 70) return 'text-medical-green';
    if (confidence >= 40) return 'text-yellow-500';
    return 'text-gray-500';
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-medical-blue border-t-4">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-medical-dark mb-2">Prediction Results</h2>
          <p className="text-gray-600 flex items-center">
            <Info className="h-4 w-4 mr-1" />
            This is a predictive tool only. Always consult with a healthcare professional for diagnosis.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              No matching conditions found for your symptoms.
            </p>
            <Button onClick={onBack} variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {results.map((result) => (
                <div 
                  key={result.disease.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{result.disease.name}</h3>
                    <div className={`font-bold ${getConfidenceClass(result.confidence)}`}>
                      {result.confidence}% match
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{result.disease.description}</p>
                  
                  <div className="flex items-center text-sm mb-3">
                    {getSeverityIcon(result.disease.severity)}
                    <span className="ml-1">{getSeverityText(result.disease.severity)}</span>
                  </div>
                  
                  {result.disease.recommendations.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium mb-1">Recommendations:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {result.disease.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={onBack} 
                variant="outline" 
                className="border-medical-blue text-medical-blue hover:bg-medical-light"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Check Different Symptoms
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
