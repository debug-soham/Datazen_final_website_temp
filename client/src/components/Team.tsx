import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import "./Team.css";

// Define types for team member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  description: string;
  github: string;
  linkedin: string;
  instagram: string;
  photo?: string;
}

export default function Team() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);

  // State for selected category and pagination
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 4; // Number of team members to show at once

  // Team data with realistic roles
  const teamMembers: TeamMember[] = [
    // Council Heads
   
    {
      id: 1,
      name: "Harsh Nagrani",
      role: "Council Head",
      category: "Core",
      description: "Chief of Breaking Things and Fixing Them at 2 AM",
      photo: "/harsh.png",
      github: "https://github.com/HarshNagrani9",
      linkedin: "https://www.linkedin.com/in/harsh-nagrani-1ab98623a/",
      instagram: "https://www.instagram.com/harshnagrani009/",
    },
    {
      id: 2,
      name: "Riya Shrivastava",
      role: "Council Head",
      category: "Core",
      photo: "/riya.jpg",
      description: "Steering the ship, barely",
      github: "https://github.com/riya-020",
      linkedin: "https://www.linkedin.com/in/riya-shrivastava-b9b38b296/",
      instagram: "https://www.instagram.com/riyaa.02/",
    },
    {
      id: 3,
      name: "Vedant Shetty",
      role: "Tech Head",
      category: "Technical",
      description: "Name's PyKnight73",
      photo: "/vedant.png",
      github: "https://github.com/PyKnight-vedant",
      linkedin: "https://www.linkedin.com/in/vedant-shetty-315853287/",
      instagram: "https://www.instagram.com/veder73/profilecard/?igsh=MWYyaTBoNzZuc2N4Mw==",
    },
    {
      id: 4,
      name: "Aahan Shetye",
      role: "Tech Member",
      category: "Technical",
      description: "It is what it is",
      photo: "/aahan.png",
      github: "https://github.com/aahanshetye",
      linkedin: "https://www.linkedin.com/in/aahan-shetye",
      instagram: "https://www.instagram.com/aa.h.an/",
    },
    {
      id: 5,
      name: "Arya Madhani",
      role: "Tech Member",
      category: "Technical",
      description: "I am always... plotting .",
      photo: "/arya.jpg",
      github: "https://github.com/Arya1754",
      linkedin: "https://www.linkedin.com/in/arya-madhani-83a902257/",
      instagram: "https://www.instagram.com/madhani_arya?igsh=MWJwOGllcGk1azFkeA==",
    },
    {
      id: 6,
      name: "Mann Shah",
      role: "Tech Member",
      category: "Technical",
      description: "Designing user-friendly and engaging experiences.",
      photo: "/mann.jpg",
      github: "https://github.com/mannn13",
      linkedin: "https://www.linkedin.com/in/mann-shah-3940a3278/",
      instagram: "https://www.instagram.com/m.annn13/",
    },
    {
      id: 7,
      name: "Hriday Shah",
      role: "Tech Member",
      category: "Technical",
      description: "Introverted for a reason",
      photo: "/hriday.png",
      github: "https://github.com/cinnamon1952",
      linkedin: "https://www.linkedin.com/in/hriday-shah-09b33b288/",
      instagram: "https://www.instagram.com/hriday_shah05/",
    },
    {
      id: 8,
      name: "Jiya Shetty",
      role: "PR and Marketing Head",
      category: "Outreach",
      description: "Certified Yapper",
      photo: "/jiya.jpg",
      github: "https://github.com/jiyashetty28",
      linkedin: "https://www.linkedin.com/in/jiya-shetty-640b04252/",
      instagram: "https://www.instagram.com/jiyaa.28/profilecard/?igsh=c2F4cGc5MDV4d3Ni",
    },
    {
      id: 9,
      name: "Siddharth Chintawar",
      role: "PR and Marketing Member",
      category: "Outreach",
      description: "Applying physics principles to engineering solutions.",
      photo: "/siddarth.jpg",
      github: "https://github.com/isaac",
      linkedin: "https://www.linkedin.com/in/siddharth-chintawar-a76366291/",
      instagram: "https://www.instagram.com/godknowssid/",
    },
    {
      id: 10,
      name: "Shaurya Kumar Roy",
      role: "PR and Marketing Member",
      category: "Outreach",
      description: "Dedicated - Diligent - Devoted",
      photo: "/shaurya.jpg",
      github: "https://github.com/jack",
      linkedin: "https://linkedin.com",
      instagram: "https://www.instagram.com/shauryakroy",
    },
    {
      id: 11,
      name: "Prekshya Joshi",
      role: "PR and Marketing Member",
      category: "Outreach",
      description: "Creating and planning content strategies.",
      photo: "/prekshya.jpg",
      github: "https://github.com/prekshyaaa",
      linkedin: "https://www.linkedin.com/in/prekshya-joshi-ba5644287",
      instagram: "https://www.instagram.com/prekshyaa_20/",
    },
    {
      id: 12,
      name: "Gaurang Mavle",
      role: "Creative Head",
      category: "Content",
      description: "Ensuring the safety and security of systems.",
      photo: "/gaurang.jpg",
      github: "https://github.com/liam",
      linkedin: "https://www.linkedin.com/in/gaurang-mavle-31397b241/",
      instagram: "https://www.instagram.com/gaurang._.mavle_/",
    },
    {
      id: 13,
      name: "Rida Nakhuda",
      role: "Creative Member",
      category: "Content",
      description: "Making tech look good",
      photo: "/rida.jpg",
      github: "https://github.com/Rida-14",
      linkedin: "https://www.linkedin.com/in/rida-nakhuda-5b019728a/",
      instagram: "https://www.instagram.com/rida.14_/",
    },
    {
      id: 14,
      name: "Swadha Kumari",
      role: "Creative Member",
      category: "Content",
      description: "Designing seamless digital experiences.",
      photo: "/swadha.jpg",
      github: "https://github.com/Swadha06",
      linkedin: "https://www.linkedin.com/in/swadha-kumari-525a61294/",
      instagram: "https://www.instagram.com/swaddhaa._/",
    },
    {
      id: 15,
      name: "Meet Satra",
      role: "Creative Member",
      category: "Content",
      description: "50%sweetness 50%savage",
      photo: "/meet.png",
      github: "https://github.com/Meet17-hub",
      linkedin: "https://in.linkedin.com/in/meet-satra-637445311",
      instagram: "https://www.instagram.com/meet.satra.503/profilecard/?igsh=MThyZmJuc3JoZHh6Mg==",
    },
    {
      id: 16,
      name: "Hiranya Patil",
      role: "Operations Head",
      category: "Operations",
      description: "Managing employee relations and recruitment.",
      photo: "/hiranya.jpg",
      github: "https://github.com/Hiranya-Patil",
      linkedin: "https://in.linkedin.com/in/hiranyapatil",
      instagram: "https://in.linkedin.com/in/hiranyapatil",
    },
    {
      id: 17,
      name: "Vriddhi Shetty",
      role: "Operations Member",
      category: "Operations",
      description: "unhinged",
      photo: "/vridhi.jpg",
      github: "https://github.com/Vriddhis",
      linkedin: "https://www.linkedin.com/in/vriddhi-shetty-339378249/",
      instagram: "https://www.instagram.com/vriddhishettyy/",
    },
    {
      id: 18,
      name: "Ojas Keer",
      role: "Operations Member",
      category: "Operations",
      description: "I'm a bunny",
      photo: "/ojas.jpg",
      github: "https://github.com/ojaskeer",
      linkedin: "https://www.linkedin.com/in/ojas-keer-3bb266244/",
      instagram: "https://www.instagram.com/ojaskeer?igsh=MXBvcGZ1MXF5Y3VwNg%3D%3D&utm_source=qr",
    },
    {
      id: 19,
      name: "Nidhi Shetty",
      role: "Operations Member",
      category: "Operations",
      description: "Keepin' it real",
      photo: "/nidhi.jpg",
      github: "https://github.com/NidhiShetty3",
      linkedin: "https://www.linkedin.com/in/nidhi-shetty-b28733289",
      instagram: "https://www.instagram.com/_nidhi.shettyy/profilecard/?igsh=MWd4eGp3Z2o5ZjQ2Ng==",
    },
    {
      id: 20,
      name: "Jinay Bhatt",
      role: "FY Representative",
      category: "Technical",
      description: "High on .py",
      photo: "/jinay.png",
      github: "https://github.com/Jinay-26",
      linkedin: "https://www.linkedin.com/in/jinay-bhatt-8a423b320/",
      instagram: "https://www.instagram.com/jinay.26/",
    },
    {
      id: 21,
      name: "Aryan Chaurasia",
      role: "FY Representative",
      category: "Technical",
      description: "Turning caffeine into code",
      photo: "/aryan.jpg",
      github: "https://github.com/chaurasia-aryan",
      linkedin: "https://www.linkedin.com/in/aryan-chaurasia2005",
      instagram: "https://www.instagram.com/_aryanchaurasia_?igsh=YzljYTk1ODg3Zg==",
    },
    {
      id: 22,
      name: "Mrinali Sharma",
      role: "FY Representative",
      category: "Outreach",
      description: "That's the move, Chief ",
      photo: "/mrinali.jpg",
      github: "https://github.com/mrinalishh",
      linkedin: "https://www.linkedin.com/in/mrinali-sharma-353b92327/",
      instagram: "https://www.instagram.com/mrinaliisharma?igsh=MTRocWI5a2s2eDI0bA==",
    },
    {
      id: 23,
      name: "Akshita Sabat",
      role: "FY Representative",
      category: "Outreach",
      description: "Comfortably Numb",
      photo: "/akshita.jpg",
      github: "https://github.com/Akshitasabat",
      linkedin: "https://www.linkedin.com/in/akshita-sabat-132585312/r",
      instagram: "https://www.instagram.com/akshitasabat/",
    },
    {
      id: 24,
      name: "Suryaansh Jain",
      role: "FY Representative",
      category: "Technical",
      description: "Doin it for the plot",
      photo: "/suryaansh.jpg",
      github: "https://github.com/suryaansh-jain",
      linkedin: "https://in.linkedin.com/in/suryaansh-jain-61b74b28a",
      instagram: "https://www.instagram.com/suryaansh._._/profilecard/?igsh=cmw0OXh4ZHY4Nzlm",
    },
    {
      id: 25,
      name: "Abhishek Joshi",
      role: "FY Representative",
      category: "Technical",
      description: "Fueled by Coffee & Code.",
      photo: "/abhishek.png",
      github: "https://github.com/ketanabhishek8",
      linkedin: "https://www.linkedin.com/in/abhishek-joshi-83b482340/",
      instagram: "https://www.instagram.com/ketanabhishek8/profilecard/?igsh=Mzhjc2swMjdmOXc4",
    },
    {
      id: 26,
      name: "Riya Gupta",
      role: "FY Representative",
      category: "Outreach",
      description: "The cat is my spirit animal",
      photo: "/riyagupta.jpg",
      github: "https://github.com/riyaa-g",
      linkedin: "https://www.linkedin.com/in/riyagupta70/",
      instagram: "https://www.instagram.com/_riyaya_07/",
    },
    {
      id: 27,
      name: "Naman Lodha",
      role: "FY Representative",
      category: "Operations",
      description: "good mornin",
      photo: "/naman.png",
      github: "https://github.com/zayn",
      linkedin: "https://www.linkedin.com/in/lodhanaman",
      instagram: "https://www.instagram.com/naman.ld",
    },
    {
      id: 28,
      name: "Atharva Sawant",
      role: "FY Representative",
      category: "Operations",
      description: "Great power, endless sarcasm.",
      photo: "/athrava.png",
      github: "https://github.com/atharvasawant",
      linkedin: "http://www.linkedin.com/in/atharva-sawant10",
      instagram: "https://www.instagram.com/athawastaken/",
    },
    {
      id: 29,
      name: "Gurkirat Kaur",
      role: "FY Representative",
      category: "Operations",
      description: "Cosmic Wanderer",
      photo: "/gurkirat.jpg",
      github: "https://github.com/GurkiratKaur22",
      linkedin: "https://www.linkedin.com/in/gurkirat-kaur-b159a12b4/",
      instagram: "https://www.instagram.com/gurkirat_227/profilecard/?igsh=MXdoNDE5ZDhpYzc5cQ%3D%3D",
    },
    {
      id: 30,
      name: "Pratibha Singh",
      role: "FY Representative",
      category: "Content",
      description: "internal storage full",
      photo: "/pratibha.PNG",
      github: "https://github.com/pratibhasoup",
      linkedin: "https://www.linkedin.com/in/pratibha-singh-76bb51340/",
      instagram: "https://www.instagram.com/pratibha.singhh/",
    },
    {
      id: 31,
      name: "Sumit Borade",
      role: "FY Representative",
      category: "Technical",
      description: "Stats is Life",
      photo: "/sumit.jpg",
      github: "https://github.com/username",
      linkedin: "https://www.linkedin.com/in/sumit-borade-7534681b3/",
      instagram: "https://www.instagram.com/sumit.24_7?igsh=MTF6Y2dyd28wcjg5ZA==",
    },


  ];

  // Create a flat array of all team categories including "All"
  const teamCategories = [
    "All",
    ...Array.from(new Set(teamMembers.map((m) => m.category))),
  ];

  // Filtered members based on selected category
  const filteredMembers =
    selectedCategory === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.category === selectedCategory);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  // Get current page of members
  const getCurrentMembers = () => {
    const start = currentIndex * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  };

  // Handle pagination
  const paginate = (newDirection: number) => {
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= totalPages) newIndex = 0;
      if (newIndex < 0) newIndex = totalPages - 1;
      return newIndex;
    });
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Handle horizontal scrolling of category buttons
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Binary Background Pattern
  const BinaryBackground = () => (
    <motion.div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      <div className="absolute inset-0 font-mono text-sm text-[var(--power-red)] leading-none flex flex-wrap">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="p-2">
            {Array.from({ length: 8 }).map((_, j) => (
              <span key={j}>{Math.round(Math.random())}</span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="team"
      className="py-20 md:py-28 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background pattern */}
      <BinaryBackground />

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--power-red) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--vitality-red) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our People
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-foreground">The Team </span>
            <span className="text-gradient">Behind </span>
            <span className="text-foreground">DataZen</span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet our passionate team of data enthusiasts driving innovation and
            excellence in data science.
          </motion.p>

          <motion.div
            className="h-1 w-20 bg-gradient-red mx-auto mt-8"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Team Category Selection Menu */}
        <div className="mb-14 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground">Filter by Team</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all border border-primary/20"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all border border-primary/20"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          <div ref={scrollContainerRef} className="category-filter">
            {teamCategories.map((category) => {
              const count =
                category === "All"
                  ? teamMembers.length
                  : teamMembers.filter((m) => m.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentIndex(0);
                  }}
                  className={`category-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                >
                  <span className="font-medium">{category}</span>
                  <span
                    className={`rounded-full text-sm px-2 py-0.5 ml-2 ${
                      selectedCategory === category
                        ? "bg-white/20"
                        : "bg-red-100"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Members Carousel */}
        <div className="mb-24 relative">
          {/* Decorative elements */}
          <div className="absolute -left-20 -top-10 w-40 h-40 bg-gradient-to-r from-red-500/10 to-red-300/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-10 w-40 h-40 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-full blur-3xl"></div>

          <div className="relative overflow-hidden py-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex + selectedCategory}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.7, ease: [0.4, 0.0, 0.2, 1] },
                  opacity: { duration: 0.4 },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
              >
                {getCurrentMembers().map((member, index) => (
                  <div key={`${member.id}`} className="h-full">
                    <div className="team-member-card group">
                      {/* Profile circle at top */}
                      <div className="team-avatar-container">
                        <div className="team-avatar">
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                // If image fails to load, show initials instead
                                const target = e.currentTarget;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="team-avatar-initials">${getInitials(
                                    member.name
                                  )}</div>`;
                                }
                              }}
                            />
                          ) : (
                            <div className="team-avatar-initials">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="team-content">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>

                        {/* Red horizontal line */}
                        <div className="team-divider"></div>

                        {/* Category badge */}
                        <div className="mb-4">
                          <span className="team-category">
                            {member.category}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <p className="text-muted-foreground text-sm leading-relaxed italic">
                            "{member.description}"
                          </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3">
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:shadow-md"
                            aria-label={`${member.name}'s Instagram`}
                          >
                            <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(-1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </button>

                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-6 h-6 text-primary" />
                </button>
              </div>
            )}

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="pagination-dots">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }
                    }}
                    className={`pagination-dot ${
                      index === currentIndex ? "active" : "bg-gray-300"
                    }`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats about the team */}
        <motion.div
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-card rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-4xl font-bold text-primary">30+</p>
            <p className="text-muted-foreground mt-1">Team Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">6</p>
            <p className="text-muted-foreground mt-1">Departments</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">15+</p>
            <p className="text-muted-foreground mt-1">Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">5+</p>
            <p className="text-muted-foreground mt-1">Events Per Year</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
