import type { ResumeData } from "./types";

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
};

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Doe",
    email: "alex.doe@email.com",
    phone: "123-456-7890",
    location: "San Francisco, CA",
    website: "alexdoe.com",
  },
  summary:
    "Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.",
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      role: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      description:
        "- Led a team of 5 engineers in developing a new cloud-based SaaS platform.\n- Improved application performance by 30% through code optimization and database tuning.\n- Implemented a CI/CD pipeline, reducing deployment time by 50%.",
    },
    {
      id: "exp2",
      company: "Digital Innovations",
      role: "Software Engineer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      description:
        "- Developed and maintained web applications using React, Node.js, and TypeScript.\n- Collaborated with cross-functional teams to define, design, and ship new features.\n- Wrote unit and integration tests to ensure code quality and reliability.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "B.S. in Computer Science",
      startDate: "2013",
      endDate: "2017",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript" },
    { id: "skill2", name: "TypeScript" },
    { id: "skill3", name: "React" },
    { id: "skill4", name: "Node.js" },
    { id: "skill5", name: "SQL" },
    { id: "skill6", name: "Cloud Computing" },
  ],
};
