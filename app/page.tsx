"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import SkillCard from "@/components/skill-card";
import ParallaxSection from "@/components/parallax-section";
import SectionHeading from "@/components/section-heading";
import AnimatedGradientBackground from "@/components/animated-gradient-background";
import ParticleBackground from "@/components/particle-background";
import CustomCursor from "@/components/custom-cursor";
import ParticleText from "@/components/particle-text";
import ContactForm from "@/components/contact-form";
import CertificationViewer from "@/components/certification-viewer";

// Create a client-only wrapper component
function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
}

// Certification data
const certifications = [
  {
    title: "Introduction to Web Development with HTML, CSS, JavaScript",
    image: "/Intro-to-web.png?height=200&width=300",
    description:
      "Gained hands-on experience in building dynamic websites using HTML for structure, CSS for design, and JavaScript for interactivity. Also learned key web development tools like Git and popular IDEs.",
    issuer: "IBM",
    date: "July 2023",
    url: "https://coursera.org/verify/L7M6MB8WMCQT",
  },
  {
    title: "SQL for Beginners",
    image: "/SQL-Certificate.png?height=200&width=300",
    description:
      "Master SQL step-by-step through hands-on coding exercises, real-world examples, and detailed explanations by industry experts. Gain practical skills in writing queries, managing databases, and using essential SQL statements like COMMIT and ROLLBACK.",
    issuer: "Udemy",
    date: "April 2025",
    url: "https://udemy-certificate.s3.amazonaws.com/image/UC-e5c2791e-5153-4fc5-98ff-55f85c0f7d03.jpg",
  },
  {
    title: "Developing AI Applications with Python and Flask",
    image: "/Developing-Ai-Appl.png?height=200&width=300",
    description:
      "Learned to build and deploy AI-based web apps using Python, Flask, and IBM Watson, while following best coding and testing practices.",
    issuer: "IBM",
    date: "March 2024",
    url: "https://coursera.org/verify/HS4CECAE82TG",
  },
  {
    title: "Data Structures and Algorithms Specialization",
    image: "/Algorithmic-Toolbox.png?height=200&width=300",
    description:
      "In-depth study of data structures and algorithms with practical implementations in various programming languages.",
    issuer: "University of California San Diego",
    date: "July 2024",
    url: "https://coursera.org/verify/3CQ9VNXPEWRC",
  },
  {
    title: "Introduction to Data Analytics",
    image: "/Intro-to-data-analytics.png?height=200&width=300",
    description:
      "Fundamentals of data analytics including data collection, cleaning, analysis, and visualization techniques.",
    issuer: "IBM",
    date: "January 2023",
    url: "https://coursera.org/verify/VSFK4D5QRHZT",
  },
  {
    title: "Data Visualization with Tableau",
    image: "/Data-Visualization-with-tableau.png?height=200&width=300",
    description:
      "Creating interactive and insightful data visualizations using Tableau software.",
    issuer: "University of California, Davis",
    date: "December 2023",
    url: "https://coursera.org/verify/specialization/EA8T2QAYUPAW",
  },
];

export default function Home() {
  // Add this to handle SSR
  const [isClient, setIsClient] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [isCertificationViewerOpen, setIsCertificationViewerOpen] =
    useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCertificationClick = (certification) => {
    setSelectedCertification(certification);
    setIsCertificationViewerOpen(true);
  };
  // Project data
  const projects = [
    {
      title: "Job Portal",
      description:
        "A MERN stack job portal enabling users to register as applicants or recruiters, with persistent login and secure JWT-protected REST APIs.",
      image: "/job.jpg?height=400&width=600",
      category: "Full Stack",
      date: "Apr 2024",
      demoUrl: "https://github.com/Akash5746/Job-Portal",
      githubUrl: "https://github.com/Akash5746/Job-Portal",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    },
    {
      title: "Robo-Ai",
      description:
        "An interactive education website, streamlining course listings, registration deadlines, and team profiles; improved user experience by 15% through client feedback integration.",
      image: "/robo.png?height=400&width=600",
      category: "Web Application",
      date: "Jun 2023",
      demoUrl: "https://akash5746.github.io/Robo_Ai/",
      githubUrl: "https://github.com/Akash5746/Robo_Ai",
      technologies: ["HTML", "CSS", "JavaScript", "UI/UX"],
    },
    {
      title: "3D Profiling System",
      description:
        "A 3D model generation system using sensor technologies on drones, combining ultrasonic sensors for proximity, LiDAR for point cloud data, and MPU6050 IMU for motion tracking.",
      image: "/3D_image.png?height=400&width=600",
      category: "Research",
      date: "Apr 2024",
      demoUrl:
        "https://drive.google.com/file/d/1UqEKmxIPHSm0EltvjYuR2VvTRIJbEbf3/view",
      githubUrl:
        "https://drive.google.com/file/d/1UqEKmxIPHSm0EltvjYuR2VvTRIJbEbf3/view",
      technologies: ["Python", "IoT", "3D Modeling", "Sensor Fusion"],
    },
  ];

  // Skills data
  const programmingSkills = [
    { name: "C", level: "Advanced", percentage: 85 },
    { name: "C++", level: "Advanced", percentage: 85 },
    { name: "Python", level: "Advanced", percentage: 90 },
    { name: "SQL", level: "Advanced", percentage: 85 },
    { name: "HTML", level: "Advanced", percentage: 90 },
    { name: "CSS", level: "Advanced", percentage: 85 },
    { name: "JavaScript", level: "Advanced", percentage: 90 },
  ];

  const dataSkills = [
    { name: "Power BI", level: "Intermediate", percentage: 75 },
    { name: "Tableau", level: "Intermediate", percentage: 75 },
    { name: "Pandas", level: "Intermediate", percentage: 80 },
    { name: "Excel", level: "Intermediate", percentage: 75 },
  ];

  // Wrap the return with a check for client-side rendering
  if (!isClient) {
    return null;
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <AnimatedGradientBackground />
        <ParticleBackground />
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen overflow-hidden flex items-center justify-center"
        >
          {/* 3D Particle Text Effect */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="w-full h-[50vh] md:h-[70vh]">
              <ParticleText text="AKASH MISHRA" textColor="#0ea5e9" />
            </div>
          </div>

          {/* Content that appears over the particle effect */}
          <div className="absolute bottom-0 left-0 right-0 z-10 mb-20 md:mb-32">
            <div className="container flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="text-lg relative overflow-hidden group"
                >
                  <a href="#projects">
                    <span className="relative z-10">View Projects</span>
                    <span className="absolute inset-0 bg-primary-foreground/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="text-lg relative overflow-hidden group"
                >
                  <a
                    href="https://drive.google.com/file/d/1nRvn0QshoSuAapvspG-8pzPoZVKPuHvQ/view?usp=sharing"
                    className="flex items-center gap-2"
                  >
                    <span className="relative z-10">Download Resume</span>
                    <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <ParallaxSection id="about" className="container py-16 md:py-24">
          <SectionHeading
            title="About Me"
            subtitle="Get to know more about my background, skills, and passion for technology"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg leading-relaxed mb-6">
                I'm a Computer Science Engineering student at Chandigarh
                University with a passion for software development, web
                technologies, and data analytics. I have experience in
                full-stack development and have worked on various projects
                ranging from job portals to 3D modeling systems.
              </p>
              <p className="text-lg leading-relaxed">
                My technical expertise includes programming languages like C,
                C++, Python, JavaScript, and tools like AWS, MySQL, Power BI,
                and Tableau. I'm constantly learning and exploring new
                technologies to enhance my skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-muted rounded-lg p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>Akash Mishra</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>akashmi5746@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>+91-8004815141</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Education:</span>
                  <span>B.E. in CSE (2021-2025)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">University:</span>
                  <span>Chandigarh University</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">CGPA:</span>
                  <span>7.55</span>
                </div>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Experience Section */}
        <ParallaxSection id="experience" className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <SectionHeading title="Work Experience" />

            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle>Software Developer</CardTitle>
                        <CardDescription>MyEquation</CardDescription>
                      </div>
                      <Badge className="bg-primary hover:bg-primary/90">
                        Jun 2023 - Aug 2023
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Proficiently developed a dynamic website using Web
                        Development tools, prioritizing intuitive UI/UX with
                        functional programming. Gained experience in
                        collaborating within a team and meeting client
                        deadlines.
                      </li>
                      <li>
                        Conducted market analysis to identify trends and
                        insights that informed the design and content strategy
                        of the website, resulting in increased traffic and
                        customer engagement.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Projects Section */}
        <ParallaxSection id="projects" className="container py-16 md:py-24">
          <SectionHeading
            title="Projects"
            subtitle="Explore some of my recent work and personal projects"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </ParallaxSection>

        {/* Skills Section */}
        <ParallaxSection id="skills" className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <SectionHeading
              title="Skills & Expertise"
              subtitle="A comprehensive overview of my technical abilities and areas of expertise"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-background/50 backdrop-blur-sm rounded-lg p-8 shadow-lg"
              >
                <Tabs defaultValue="technical" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="technical" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Programming Languages
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {programmingSkills.map((skill, i) => (
                          <SkillCard
                            key={i}
                            name={skill.name}
                            level={skill.level}
                            percentage={skill.percentage}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Data Analytics
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dataSkills.map((skill, i) => (
                          <SkillCard
                            key={i}
                            name={skill.name}
                            level={skill.level}
                            percentage={skill.percentage}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tools" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Developer Tools
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Visual Studio Code", "Linux", "JIRA", "Git"].map(
                          (tool, i) => (
                            <motion.div
                              key={i}
                              className="bg-background rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <span>{tool}</span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Cloud & Databases
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["AWS", "MySQL", "Oracle", "RDBMS", "PL/SQL"].map(
                          (tool, i) => (
                            <motion.div
                              key={i}
                              className="bg-background rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <span>{tool}</span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interests">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {[
                        "Research",
                        "Development",
                        "Web Development",
                        "Data Analytics",
                        "Emerging Technologies",
                      ].map((interest, i) => (
                        <motion.div
                          key={i}
                          className="bg-background rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <span className="font-medium">{interest}</span>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-full flex items-center justify-center"
              >
                <div className="relative w-full h-[400px] perspective-effect">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </div>

                  <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                    {[
                      "React",
                      "Node.js",
                      "Python",
                      "TypeScript",
                      "MongoDB",
                      "AWS",
                    ].map((skill, i) => (
                      <motion.div
                        key={i}
                        className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="font-medium text-center">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Education & Certifications */}
        <ParallaxSection id="education" className="container py-16 md:py-24">
          <SectionHeading
            title="Education & Certifications"
            subtitle="My academic background and professional certifications"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-6">Education</h3>
              <Card className="shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                <CardHeader>
                  <CardTitle>B.E. - Computer Science and Engineering</CardTitle>
                  <CardDescription>
                    Chandigarh University, Mohali, Punjab
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Duration:</span>
                    <span>2021 - 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">CGPA:</span>
                    <span>7.55</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6">Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card
                      className="shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleCertificationClick(cert)}
                    >
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">
                          {cert.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Achievements Section */}
        <ParallaxSection className="bg-muted/50 py-16 md:py-24">
          <div className="container">
            <SectionHeading title="Achievements" />
            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle>Hack Overflow 4.0 (Hack the fest)</CardTitle>
                    <CardDescription>April 2022</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Achieved runner-up in a Hack-Overflow hackathon hosted by
                      Coding Ninjas at Chandigarh University, competing among
                      more than 80 teams.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle>NPTEL Internet of Things</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Achieved a top 5% rank in the examination with an
                      impressive 90% score.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Contact Section */}
        <ParallaxSection id="contact" className="container py-16 md:py-24">
          <SectionHeading
            title="Get In Touch"
            subtitle="Feel free to contact me for any opportunities or collaborations"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href="mailto:akashmi5746@gmail.com"
                    className="hover:underline group-hover:text-primary transition-colors duration-300"
                  >
                    akashmi5746@gmail.com
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href="tel:+918004815141"
                    className="hover:underline group-hover:text-primary transition-colors duration-300"
                  >
                    +91-8004815141
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href="https://www.linkedin.com/in/akash-mishra-3a8339231/"
                    target="_blank"
                    className="hover:underline group-hover:text-primary transition-colors duration-300"
                    rel="noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href="https://github.com/Akash5746/"
                    target="_blank"
                    className="hover:underline group-hover:text-primary transition-colors duration-300"
                    rel="noreferrer"
                  >
                    GitHub Profile
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Your Name"
                      className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-2 rounded-md border border-input bg-background resize-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>
                <Button className="w-full relative overflow-hidden group">
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 bg-primary-foreground/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </form>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Footer */}
        <footer className="border-t py-8 bg-background/80 backdrop-blur-sm">
          <div className="container flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Akash Mishra. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/akash-mishra-3a8339231/"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={20} />
                <span className="sr-only">
                  https://www.linkedin.com/in/akash-mishra-3a8339231/
                </span>
              </Link>
              <Link
                href="https://github.com/Akash5746/"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="mailto:akashmi5746@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </footer>
        {/* Certification Viewer */}
        {selectedCertification && (
          <CertificationViewer
            isOpen={isCertificationViewerOpen}
            onClose={() => setIsCertificationViewerOpen(false)}
            certification={selectedCertification}
          />
        )}
      </div>
    </ClientOnly>
  );
}
