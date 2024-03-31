import { MdAnalytics, MdSafetyCheck, MdBook } from "react-icons/md";
import { Compass, SearchCheck, Bot } from 'lucide-react'

const ourServices = [
  {
    icon: <SearchCheck />,
    heading: "Quiz Generator",
    detail:
      "Generates Quizzes based on your preferences and the topics you want to learn",
  },
  {
    icon: <Compass />,
    heading: "Course Generator",
    detail: "Generates the best course based on your preferences and the topics you want to learn",
  },
  {
    icon: <Bot />,
    heading: "AI Chatbot",
    detail: "Chat with our AI Chatbot to get answers to your queries",
  },
];

export default ourServices;
