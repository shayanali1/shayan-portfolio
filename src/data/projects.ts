export interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
  [key: string]: string | undefined;
}

export interface Project {
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link: string;
  links?: ProjectLinks;
  video?: string;
}

export const projects: Project[] = [
  {
    title: "NexRate",
    category: "Fullstack Currency Exchange Platform",
    tools: "Python, Flask, HTML/CSS, User Auth, Live Charts, Watchlist",
    description:
      "A full-stack currency exchange platform featuring real-time exchange rates, interactive currency charts, customizable watchlists, and user authentication.",
    image: "/images/nexrate.png",
    link: "https://github.com/shayanali1/NexRate",
    links: {
      github: "https://github.com/shayanali1/NexRate",
    },
  },
  {
    title: "EthicalLink",
    category: "Loan & Installment Planner",
    tools: "Python, Flask, HTML/CSS, Islamic Finance, CSV Export",
    description:
      "An Islamic finance installment and loan calculator supporting zero-interest schedules, amortization breakdown, and CSV reporting exports.",
    image: "/images/ethicallink.png",
    link: "https://ethical-link.onrender.com",
    links: {
      live: "https://ethical-link.onrender.com",
    },
  },
  {
    title: "Electricity Consumption AI",
    category: "Machine Learning Prediction System",
    tools: "Python, Random Forest, XGBoost, Data Visualization",
    description:
      "A machine learning application utilizing Random Forest and XGBoost regression to model, forecast, and visualize energy consumption trends.",
    image: "/images/electricityai.png",
    link: "https://github.com/shayanali1/Electricity-Consumption-AI",
    links: {
      github: "https://github.com/shayanali1/Electricity-Consumption-AI",
    },
  },
  {
    title: "CivicPulse",
    category: "Community Engagement & Civic Analytics Platform",
    tools: "React, TypeScript, Node.js, Express, PostgreSQL",
    description:
      "A civic engagement platform designed for real-time reporting of community issues, public feedback aggregation, and municipality resolution tracking.",
    image: "/images/preview1.png",
    link: "https://github.com/shayanali1",
    links: {
      github: "https://github.com/shayanali1",
    },
  },
  {
    title: "Voxa",
    category: "AI Voice & Communication Assistant",
    tools: "Next.js, Python, FastAPI, WebSockets, OpenAI API",
    description:
      "An intelligent AI-powered voice workspace enabling real-time conversational speech synthesis, automated transcription, and audio streaming.",
    image: "/images/preview1.png",
    link: "https://github.com/shayanali1",
    links: {
      github: "https://github.com/shayanali1",
    },
  },
];
