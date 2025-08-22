"use client";
import React, { useTransition, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Briefcase,
  GraduationCap,
  Star,
  Trash2,
  PlusCircle,
  Sparkles,
  Clipboard,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useResumeStore } from "@/lib/store";
import { generateSuggestionsAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ResumeStrength = () => {
  const resume = useResumeStore((state) => state.resume);
  const [strength, setStrength] = useState(0);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const checks = [
      {
        pass: !!resume.personalInfo.name,
        tip: "Add your full name.",
      },
      {
        pass: !!resume.personalInfo.email,
        tip: "Add your email address.",
      },
      {
        pass: !!resume.summary.trim(),
        tip: "Write a professional summary.",
      },
      {
        pass: resume.experience.length > 0,
        tip: "Add at least one work experience.",
      },
      {
        pass: resume.education.length > 0,
        tip: "Add your educational background.",
      },
      {
        pass: resume.skills.length > 0,
        tip: "List at least one skill.",
      },
    ];
    const passedChecks = checks.filter((c) => c.pass).length;
    const newStrength = (passedChecks / checks.length) * 100;
    const newTips = checks.filter((c) => !c.pass).map((c) => c.tip);
    setStrength(newStrength);
    setTips(newTips);
  }, [resume]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Strength</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Progress value={strength} className="w-full" />
            <span className="font-bold text-lg">{Math.round(strength)}%</span>
          </div>
          {tips.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">How to improve:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AiAssistant = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { setSummary, updateExperience } = useResumeStore();

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateSuggestionsAction(jobDescription);
      if (result.success && result.data) {
        setSuggestions(result.data);
        setIsModalOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(suggestions);
    toast({
      title: "Copied!",
      description: "Suggestions copied to clipboard.",
    });
  };

  return (
    <>
      <AccordionItem value="ai-assistant">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            <span className="font-semibold">AI Assistant</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 space-y-4">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description here to get AI-powered content suggestions."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
            />
            <Button onClick={handleGenerate} disabled={isPending || !jobDescription}>
              {isPending ? "Generating..." : "Generate Suggestions"}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Content Suggestions</DialogTitle>
            <DialogDescription>
              Here are some suggestions based on the job description. Copy and paste them into your resume.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-4 bg-secondary rounded-md whitespace-pre-wrap">
            {suggestions}
          </div>
          <Button onClick={handleCopyToClipboard} className="mt-4">
            <Clipboard className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export function ResumeEditor() {
  const {
    resume,
    setPersonalInfo,
    setSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
  } = useResumeStore();

  return (
    <div className="space-y-6">
      <ResumeStrength />
      <Accordion type="multiple" defaultValue={["personal-info", "summary"]} className="w-full">
        <AccordionItem value="personal-info">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <User />
              <span className="font-semibold">Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={resume.personalInfo.name} onChange={(e) => setPersonalInfo("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={resume.personalInfo.email} onChange={(e) => setPersonalInfo("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={resume.personalInfo.phone} onChange={(e) => setPersonalInfo("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={resume.personalInfo.location} onChange={(e) => setPersonalInfo("location", e.target.value)} />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="website">Website / Portfolio</Label>
                <Input id="website" value={resume.personalInfo.website} onChange={(e) => setPersonalInfo("website", e.target.value)} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="summary">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Briefcase />
              <span className="font-semibold">Professional Summary</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <Textarea
                placeholder="Write a brief summary of your career, skills, and goals."
                rows={5}
                value={resume.summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Briefcase />
              <span className="font-semibold">Work Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-4">
              {resume.experience.map((exp, index) => (
                <Card key={exp.id}>
                  <CardContent className="p-4 space-y-4 relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input value={exp.role} onChange={(e) => updateExperience(index, "role", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input value={exp.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input value={exp.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={exp.description} rows={4} onChange={(e) => updateExperience(index, "description", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addExperience}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <GraduationCap />
              <span className="font-semibold">Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-4">
              {resume.education.map((edu, index) => (
                <Card key={edu.id}>
                  <CardContent className="p-4 space-y-4 relative">
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input value={edu.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree/Certificate</Label>
                        <Input value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                      </div>
                       <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input value={edu.startDate} onChange={(e) => updateEducation(index, "startDate", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input value={edu.endDate} onChange={(e) => updateEducation(index, "endDate", e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addEducation}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Star />
              <span className="font-semibold">Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {resume.skills.map((skill, index) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <Input value={skill.name} onChange={(e) => updateSkill(index, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={addSkill}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AiAssistant />
      </Accordion>
    </div>
  );
}
