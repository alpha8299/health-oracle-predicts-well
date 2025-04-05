
import React, { useState } from "react";
import Header from "@/components/Header";
import SymptomChecker from "@/components/SymptomChecker";
import PredictionResults from "@/components/PredictionResults";
import { Disease } from "@/lib/medical-data";
import { Stethoscope, AlertTriangle, FileText } from "lucide-react";

const Index: React.FC = () => {
  const [results, setResults] = useState<{ disease: Disease; confidence: number; }[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleShowResults = (predictionResults: { disease: Disease; confidence: number; }[]) => {
    setResults(predictionResults);
    setShowResults(true);
  };

  const handleBackToSymptoms = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 pb-16">
        {/* Intro Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-medical-dark mb-3">
            AI-Powered Symptom Checker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your symptoms and let our algorithm predict possible conditions based on your input.
          </p>
        </div>
        
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-medical-blue">
            <div className="flex items-center mb-3">
              <Stethoscope className="h-5 w-5 text-medical-blue mr-2" />
              <h3 className="font-medium">Quick Assessment</h3>
            </div>
            <p className="text-sm text-gray-600">
              Get instant insights about your health based on your symptoms.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-medical-green">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-medical-green mr-2" />
              <h3 className="font-medium">Detailed Information</h3>
            </div>
            <p className="text-sm text-gray-600">
              Receive information about potential causes and recommended actions.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-medium">Medical Disclaimer</h3>
            </div>
            <p className="text-sm text-gray-600">
              This tool is for informational purposes only and not a substitute for professional advice.
            </p>
          </div>
        </div>
        
        {/* Main Component */}
        <div className="mt-8">
          {showResults ? (
            <PredictionResults results={results} onBack={handleBackToSymptoms} />
          ) : (
            <SymptomChecker onShowResults={handleShowResults} />
          )}
        </div>
        
        {/* Disclaimer */}
        <div className="mt-10 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          <p>
            <strong>Important:</strong> Health Oracle is a hackathon project and does not replace professional medical advice. 
            Always consult with qualified healthcare providers for diagnosis and treatment.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
