
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { symptoms, predictDiseases, Disease } from "@/lib/medical-data";
import { Activity, AlertCircle } from "lucide-react";
import { toast } from 'sonner';

interface SymptomCheckerProps {
  onShowResults: (results: {
    disease: Disease;
    confidence: number;
  }[]) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onShowResults }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }

    setIsChecking(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const results = predictDiseases(selectedSymptoms);
      onShowResults(results);
      setIsChecking(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-medical-teal border-t-4">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-medical-dark mb-2">Select Your Symptoms</h2>
          <p className="text-gray-600">
            Choose all symptoms you're currently experiencing for the most accurate prediction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {symptoms.map((symptom) => (
            <div 
              key={symptom.id} 
              className="flex items-start space-x-3 p-3 rounded-md hover:bg-medical-light transition-colors"
            >
              <Checkbox 
                id={`symptom-${symptom.id}`}
                checked={selectedSymptoms.includes(symptom.id)}
                onCheckedChange={() => toggleSymptom(symptom.id)}
                className="mt-1 border-medical-blue"
              />
              <div>
                <label 
                  htmlFor={`symptom-${symptom.id}`} 
                  className="text-base font-medium cursor-pointer"
                >
                  {symptom.name}
                </label>
                {symptom.description && (
                  <p className="text-sm text-gray-500">{symptom.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{selectedSymptoms.length} symptoms selected</span>
          </div>
          <Button 
            onClick={handleAnalyze}
            disabled={isChecking}
            className="bg-medical-teal hover:bg-medical-blue text-white"
          >
            {isChecking ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Symptoms"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomChecker;
