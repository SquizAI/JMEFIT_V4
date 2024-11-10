import React from 'react';
import ServiceFAQ from '../components/ServiceFAQ';

const PersonalTrainingFAQ = () => {
  const faqs = [
    {
      question: "What's included in personal training?",
      answer: "Our personal training includes customized workout plans, one-on-one coaching sessions, form correction, progress tracking, and ongoing support via our mobile app."
    },
    {
      question: "How often will we meet?",
      answer: "Training frequency is tailored to your goals and schedule. Most clients meet with their trainer 2-3 times per week for optimal results."
    },
    {
      question: "Do I need prior gym experience?",
      answer: "No prior experience is needed. We work with clients at all fitness levels and provide comprehensive guidance from day one."
    },
    {
      question: "How long are the training sessions?",
      answer: "Each training session is 60 minutes long, including warm-up and cool-down periods."
    },
    {
      question: "Can I switch trainers if needed?",
      answer: "Yes, we want you to have the best possible experience. If you'd like to switch trainers, we'll help you find a better match."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We require 24-hour notice for session cancellations. Late cancellations may result in a charged session."
    }
  ];

  const features = [
    "Personalized workout programs",
    "One-on-one coaching sessions",
    "Form correction and technique guidance",
    "Progress tracking and assessments",
    "Nutrition recommendations",
    "24/7 coach support via app"
  ];

  return (
    <ServiceFAQ
      title="Personal Training"
      description="Transform your fitness with expert guidance"
      faqs={faqs}
      price="Starting at $299/month"
      features={features}
    />
  );
};

export default PersonalTrainingFAQ;