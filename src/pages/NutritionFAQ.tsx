import React from 'react';
import ServiceFAQ from '../components/ServiceFAQ';

const NutritionFAQ = () => {
  const faqs = [
    {
      question: "What's included in nutrition coaching?",
      answer: "Our nutrition coaching includes personalized meal plans, macro calculations, supplement guidance, regular check-ins, and ongoing support through our app."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Yes, we work with various dietary preferences and restrictions, including vegetarian, vegan, gluten-free, and food allergies."
    },
    {
      question: "How often will I receive meal plans?",
      answer: "Initial meal plans are provided within 48 hours of starting, with updates every 2-4 weeks based on your progress and feedback."
    },
    {
      question: "Do I need to count calories?",
      answer: "While tracking can be helpful, we focus on sustainable habits and can work with various approaches based on your preferences and lifestyle."
    },
    {
      question: "Will I need to buy special foods?",
      answer: "No, our meal plans use readily available whole foods. We may recommend some supplements based on your goals."
    },
    {
      question: "How long until I see results?",
      answer: "Most clients see initial changes within 2-4 weeks, with significant results in 8-12 weeks when following the program consistently."
    }
  ];

  const features = [
    "Personalized meal plans",
    "Macro tracking guidance",
    "Supplement recommendations",
    "Regular progress check-ins",
    "Recipe database access",
    "Ongoing nutrition support"
  ];

  return (
    <ServiceFAQ
      title="Nutrition Coaching"
      description="Fuel your success with expert nutrition guidance"
      faqs={faqs}
      price="Starting at $149/month"
      features={features}
    />
  );
};

export default NutritionFAQ;