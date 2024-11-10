import React from 'react';
import ServiceFAQ from '../components/ServiceFAQ';

const GroupTrainingFAQ = () => {
  const faqs = [
    {
      question: "How many people are in each group session?",
      answer: "Our group sessions typically have 6-12 participants to ensure everyone receives adequate attention while maintaining a motivating group dynamic."
    },
    {
      question: "What's the structure of group workouts?",
      answer: "Sessions include a dynamic warm-up, skill practice, the main workout (which may be circuit-based, partner work, or team challenges), and a cool-down."
    },
    {
      question: "Can I join if I'm a beginner?",
      answer: "Absolutely! Our trainers provide modifications for all fitness levels, and our supportive community welcomes newcomers."
    },
    {
      question: "What should I bring to class?",
      answer: "Bring water, a towel, and wear comfortable workout clothes. All equipment is provided."
    },
    {
      question: "How often should I attend?",
      answer: "We recommend attending 2-4 classes per week for best results, but you can adjust based on your goals and schedule."
    },
    {
      question: "Do you offer trial classes?",
      answer: "Yes, we offer a complimentary trial class so you can experience our group training atmosphere firsthand."
    }
  ];

  const features = [
    "High-energy group workouts",
    "Expert instruction and motivation",
    "Supportive community atmosphere",
    "All equipment provided",
    "Flexible class schedule",
    "Progress tracking and challenges"
  ];

  return (
    <ServiceFAQ
      title="Group Training"
      description="Get fit together with our energizing group sessions"
      faqs={faqs}
      price="Starting at $199/month"
      features={features}
    />
  );
};

export default GroupTrainingFAQ;