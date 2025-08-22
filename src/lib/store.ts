import { create } from "zustand";
import type { ResumeData, WorkExperience, Education, Skill } from "./types";
import { initialResumeData, sampleResumeData } from "./constants";

interface ResumeState {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  setPersonalInfo: (field: string, value: string) => void;
  setSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (index: number, field: string, value: string) => void;
  removeExperience: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: string, value: string) => void;
  removeEducation: (index: number) => void;
  addSkill: () => void;
  updateSkill: (index: number, value: string) => void;
  removeSkill: (index: number) => void;
  loadSampleData: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: initialResumeData,
  setResume: (resume) => set({ resume }),
  setPersonalInfo: (field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, [field]: value },
      },
    })),
  setSummary: (summary) =>
    set((state) => ({ resume: { ...state.resume, summary } })),
  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", description: "" },
        ],
      },
    })),
  updateExperience: (index, field, value) =>
    set((state) => {
      const newExperience = [...state.resume.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { resume: { ...state.resume, experience: newExperience } };
    }),
  removeExperience: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((_, i) => i !== index),
      },
    })),
  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          { id: crypto.randomUUID(), institution: "", degree: "", startDate: "", endDate: "" },
        ],
      },
    })),
  updateEducation: (index, field, value) =>
    set((state) => {
      const newEducation = [...state.resume.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { resume: { ...state.resume, education: newEducation } };
    }),
  removeEducation: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((_, i) => i !== index),
      },
    })),
  addSkill: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, { id: crypto.randomUUID(), name: "" }],
      },
    })),
  updateSkill: (index, value) =>
    set((state) => {
      const newSkills = [...state.resume.skills];
      newSkills[index] = { ...newSkills[index], name: value };
      return { resume: { ...state.resume, skills: newSkills } };
    }),
  removeSkill: (index) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.filter((_, i) => i !== index),
      },
    })),
    loadSampleData: () => set({ resume: sampleResumeData }),
}));
