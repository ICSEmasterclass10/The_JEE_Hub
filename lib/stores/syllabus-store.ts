import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Chapter {
  id: string;
  name: string;
  completed: boolean;
  topics: string[];
}

export interface Subject {
  name: string;
  chapters: Chapter[];
}

export interface SyllabusState {
  class11: Subject[];
  class12: Subject[];
  
  toggleChapter: (className: string, subjectIdx: number, chapterId: string) => void;
  getCompletionPercentage: (className: string) => number;
  getTotalChapters: (className: string) => number;
  getCompletedChapters: (className: string) => number;
}

const SYLLABUS_DATA = {
  class11: [
    {
      name: "Physics",
      chapters: [
        { id: "p1", name: "Physical World", completed: false, topics: ["Nature of Physics", "Scope of Physics"] },
        { id: "p2", name: "Units and Measurements", completed: false, topics: ["SI Units", "Dimensional Analysis"] },
        { id: "p3", name: "Motion in a Straight Line", completed: false, topics: ["Kinematics", "Velocity", "Acceleration"] },
        { id: "p4", name: "Motion in a Plane", completed: false, topics: ["Projectile Motion", "Circular Motion"] },
        { id: "p5", name: "Laws of Motion", completed: false, topics: ["Newton's Laws", "Friction"] },
        { id: "p6", name: "Work, Energy and Power", completed: false, topics: ["Work", "Kinetic Energy", "Potential Energy"] },
      ],
    },
    {
      name: "Chemistry",
      chapters: [
        { id: "c1", name: "Some Basic Concepts of Chemistry", completed: false, topics: ["Mole Concept", "Molarity"] },
        { id: "c2", name: "Structure of Atom", completed: false, topics: ["Atomic Structure", "Bohr's Model"] },
        { id: "c3", name: "Classification of Elements", completed: false, topics: ["Periodic Table", "Trends"] },
        { id: "c4", name: "Chemical Bonding", completed: false, topics: ["Ionic Bonding", "Covalent Bonding"] },
        { id: "c5", name: "States of Matter", completed: false, topics: ["Gases", "Liquids", "Solids"] },
      ],
    },
    {
      name: "Mathematics",
      chapters: [
        { id: "m1", name: "Sets", completed: false, topics: ["Set Theory", "Operations"] },
        { id: "m2", name: "Relations and Functions", completed: false, topics: ["Functions", "Mappings"] },
        { id: "m3", name: "Trigonometric Functions", completed: false, topics: ["Trigonometry", "Identities"] },
        { id: "m4", name: "Mathematical Induction", completed: false, topics: ["Principle of Induction"] },
        { id: "m5", name: "Complex Numbers", completed: false, topics: ["Complex Algebra"] },
      ],
    },
  ],
  class12: [
    {
      name: "Physics",
      chapters: [
        { id: "p7", name: "Electrostatics", completed: false, topics: ["Electric Field", "Gauss's Law"] },
        { id: "p8", name: "Current Electricity", completed: false, topics: ["Ohm's Law", "Kirchhoff's Laws"] },
        { id: "p9", name: "Magnetism", completed: false, topics: ["Magnetic Field", "Ampere's Law"] },
        { id: "p10", name: "Electromagnetic Induction", completed: false, topics: ["Faraday's Law", "Lenz's Law"] },
        { id: "p11", name: "Alternating Current", completed: false, topics: ["AC Circuits", "Impedance"] },
      ],
    },
    {
      name: "Chemistry",
      chapters: [
        { id: "c6", name: "Thermodynamics", completed: false, topics: ["Enthalpy", "Entropy"] },
        { id: "c7", name: "Equilibrium", completed: false, topics: ["Le Chatelier's Principle"] },
        { id: "c8", name: "Redox Reactions", completed: false, topics: ["Oxidation States", "Balancing"] },
        { id: "c9", name: "Coordination Compounds", completed: false, topics: ["Ligands", "Crystal Field Theory"] },
        { id: "c10", name: "Organic Chemistry", completed: false, topics: ["Hydrocarbons", "Functional Groups"] },
      ],
    },
    {
      name: "Mathematics",
      chapters: [
        { id: "m6", name: "Differentiation", completed: false, topics: ["Derivatives", "Rules"] },
        { id: "m7", name: "Integration", completed: false, topics: ["Indefinite Integrals", "Definite Integrals"] },
        { id: "m8", name: "Differential Equations", completed: false, topics: ["First Order Equations"] },
        { id: "m9", name: "Vectors", completed: false, topics: ["Vector Algebra", "Dot Product"] },
        { id: "m10", name: "3D Geometry", completed: false, topics: ["Lines", "Planes"] },
      ],
    },
  ],
};

export const useSyllabusStore = create<SyllabusState>()(
  persist(
    (set, get) => ({
      class11: SYLLABUS_DATA.class11,
      class12: SYLLABUS_DATA.class12,

      toggleChapter: (className: string, subjectIdx: number, chapterId: string) =>
        set((state) => {
          const syllabusArray = className === "11" ? [...state.class11] : [...state.class12];
          const subject = syllabusArray[subjectIdx];
          
          if (subject) {
            subject.chapters = subject.chapters.map((ch) =>
              ch.id === chapterId ? { ...ch, completed: !ch.completed } : ch
            );
          }

          return className === "11"
            ? { class11: syllabusArray }
            : { class12: syllabusArray };
        }),

      getCompletionPercentage: (className: string) => {
        const state = get();
        const syllabusArray = className === "11" ? state.class11 : state.class12;
        
        const totalChapters = syllabusArray.reduce(
          (sum, subject) => sum + subject.chapters.length,
          0
        );
        
        const completedChapters = syllabusArray.reduce(
          (sum, subject) =>
            sum + subject.chapters.filter((ch) => ch.completed).length,
          0
        );

        return totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);
      },

      getTotalChapters: (className: string) => {
        const state = get();
        const syllabusArray = className === "11" ? state.class11 : state.class12;
        return syllabusArray.reduce((sum, subject) => sum + subject.chapters.length, 0);
      },

      getCompletedChapters: (className: string) => {
        const state = get();
        const syllabusArray = className === "11" ? state.class11 : state.class12;
        return syllabusArray.reduce(
          (sum, subject) =>
            sum + subject.chapters.filter((ch) => ch.completed).length,
          0
        );
      },
    }),
    {
      name: "syllabus-store",
      version: 1,
    }
  )
);
