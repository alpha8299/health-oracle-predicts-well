
// Sample symptom and disease data for the app
// In a real application, this would be replaced with a more comprehensive medical database

export interface Symptom {
  id: string;
  name: string;
  description?: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export const symptoms: Symptom[] = [
  { id: "fever", name: "Fever", description: "Elevated body temperature above 37.5°C or 99.5°F" },
  { id: "cough", name: "Cough", description: "Sudden expulsion of air from the lungs" },
  { id: "headache", name: "Headache", description: "Pain in the head or upper neck" },
  { id: "fatigue", name: "Fatigue", description: "Extreme tiredness resulting from mental or physical exertion" },
  { id: "sore_throat", name: "Sore Throat", description: "Pain or irritation in the throat" },
  { id: "shortness_of_breath", name: "Shortness of Breath", description: "Difficulty breathing or catching your breath" },
  { id: "body_ache", name: "Body Ache", description: "Generalized muscle pain throughout the body" },
  { id: "runny_nose", name: "Runny Nose", description: "Excess discharge of mucus from the nose" },
  { id: "nausea", name: "Nausea", description: "Feeling of sickness with an inclination to vomit" },
  { id: "diarrhea", name: "Diarrhea", description: "Loose, watery bowel movements" },
  { id: "chest_pain", name: "Chest Pain", description: "Pain or discomfort in the chest area" },
  { id: "rash", name: "Skin Rash", description: "Area of irritated or swollen skin" }
];

export const diseases: Disease[] = [
  {
    id: "common_cold",
    name: "Common Cold",
    description: "A viral infectious disease of the upper respiratory tract that primarily affects the nose.",
    symptoms: ["cough", "sore_throat", "runny_nose", "fatigue", "headache"],
    severity: "low",
    recommendations: [
      "Rest and stay hydrated",
      "Take over-the-counter cold medications",
      "Use a humidifier to ease congestion"
    ]
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses.",
    symptoms: ["fever", "cough", "sore_throat", "body_ache", "fatigue", "headache"],
    severity: "medium",
    recommendations: [
      "Rest and stay hydrated",
      "Take antiviral medications if prescribed",
      "Take pain relievers for fever and aches"
    ]
  },
  {
    id: "covid_19",
    name: "COVID-19",
    description: "A respiratory illness caused by the SARS-CoV-2 virus.",
    symptoms: ["fever", "cough", "fatigue", "shortness_of_breath", "body_ache", "headache", "sore_throat", "nausea", "diarrhea"],
    severity: "high",
    recommendations: [
      "Isolate to prevent spreading the virus",
      "Rest and stay hydrated",
      "Monitor symptoms and seek medical attention if they worsen"
    ]
  },
  {
    id: "allergies",
    name: "Seasonal Allergies",
    description: "An immune system response to allergens such as pollen, dust, or pet dander.",
    symptoms: ["runny_nose", "cough", "headache"],
    severity: "low",
    recommendations: [
      "Avoid known allergens",
      "Take antihistamines as directed",
      "Use nasal sprays if recommended by a doctor"
    ]
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    description: "Inflammation of the bronchial tubes, which carry air to your lungs.",
    symptoms: ["cough", "shortness_of_breath", "chest_pain", "fatigue", "headache", "fever"],
    severity: "medium",
    recommendations: [
      "Rest and drink plenty of fluids",
      "Use a humidifier to loosen mucus",
      "Take cough medicine as recommended by a doctor"
    ]
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
    symptoms: ["fever", "cough", "shortness_of_breath", "chest_pain", "fatigue"],
    severity: "high",
    recommendations: [
      "Seek immediate medical attention",
      "Take prescribed antibiotics if bacterial",
      "Rest and stay hydrated"
    ]
  }
];

// Simple predictive algorithm that matches symptoms to diseases and returns matches with confidence scores
export function predictDiseases(selectedSymptomIds: string[]): {
  disease: Disease;
  confidence: number;
}[] {
  if (selectedSymptomIds.length === 0) return [];

  const predictions = diseases.map(disease => {
    // Count how many selected symptoms match this disease
    const matchingSymptoms = disease.symptoms.filter(symptomId => 
      selectedSymptomIds.includes(symptomId)
    ).length;
    
    // Calculate a basic confidence score
    const confidence = (matchingSymptoms / disease.symptoms.length) * 
                       (matchingSymptoms / selectedSymptomIds.length);
    
    return {
      disease,
      confidence: parseFloat((confidence * 100).toFixed(1))
    };
  });

  // Filter out diseases with zero confidence and sort by confidence (highest first)
  return predictions
    .filter(prediction => prediction.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
}
