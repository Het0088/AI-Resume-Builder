"use client";

import { useResumeStore } from "@/lib/store";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume);

  return (
    <div className="sticky top-24">
      <div id="resume-preview" className="bg-white text-gray-800 shadow-lg rounded-lg p-8 aspect-[210/297] w-full max-w-[800px] mx-auto overflow-y-auto">
        <header className="text-center mb-8 border-b-2 border-primary pb-4">
          <h1 className="text-4xl font-bold tracking-wider text-primary">
            {resume.personalInfo.name || "Your Name"}
          </h1>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
            {resume.personalInfo.email && <span className="flex items-center gap-1"><Mail size={14} />{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span className="flex items-center gap-1"><Phone size={14} />{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span className="flex items-center gap-1"><MapPin size={14} />{resume.personalInfo.location}</span>}
            {resume.personalInfo.website && <span className="flex items-center gap-1"><Globe size={14} />{resume.personalInfo.website}</span>}
          </div>
        </header>

        <main>
          {resume.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-primary border-b border-primary/30 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed">{resume.summary}</p>
            </section>
          )}

          {resume.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-primary border-b border-primary/30 pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-md">{exp.role || "Role"}</h3>
                      <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-sm italic text-gray-700">{exp.company || "Company"}</p>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-primary border-b border-primary/30 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {resume.education.map((edu) => (
                  <div key={edu.id}>
                     <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-md">{edu.degree || "Degree"}</h3>
                        <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                     </div>
                    <p className="text-sm italic text-gray-700">{edu.institution || "Institution"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {resume.skills.length > 0 && (
            <section>
               <h2 className="text-xl font-bold text-primary border-b border-primary/30 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span key={skill.id} className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
