
import React from 'react';
import { HeartPulse } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 mb-6">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-8 w-8 text-medical-teal animate-pulse-slow" />
            <div>
              <h1 className="text-2xl font-bold text-medical-dark">Health Oracle</h1>
              <p className="text-sm text-gray-500">Symptom-Based Disease Prediction</p>
            </div>
          </div>
          <div className="text-sm font-medium text-medical-blue">
            Hackathon Project
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
