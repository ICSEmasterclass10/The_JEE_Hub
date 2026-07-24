import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface TasksState {
  tasks: DailyTask[];
  streak: number;
  lastCompletedDate: string | null;
  completedToday: boolean;
  
  addTask: (task: DailyTask) => void;
  completeTask: (id: string) => void;
  resetDaily: () => void;
  generateDailyTasks: () => void;
  incrementStreak: () => void;
  getCompletionPercentage: () => number;
}

const DEFAULT_TASKS: DailyTask[] = [
  {
    id: "1",
    title: "Physics Concept Review",
    description: "Review one key physics concept from today's class",
    completed: false,
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "Solve 5 Chemistry Problems",
    description: "Complete 5 problems from the latest chapter",
    completed: false,
    difficulty: "Hard",
  },
  {
    id: "3",
    title: "Maths Practice Session",
    description: "Solve 10 problems in 20 minutes",
    completed: false,
    difficulty: "Medium",
  },
];

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: DEFAULT_TASKS,
      streak: 0,
      lastCompletedDate: null,
      completedToday: false,

      addTask: (task: DailyTask) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      completeTask: (id: string) =>
        set((state) => {
          const tasks = state.tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          );

          const allCompleted = tasks.every((task) => task.completed);

          return {
            tasks,
            completedToday: allCompleted,
          };
        }),

      resetDaily: () => {
        const today = new Date().toISOString().split("T")[0];
        set((state) => {
          const lastDate = state.lastCompletedDate?.split("T")[0];
          const isNewDay = lastDate !== today;

          if (isNewDay && state.completedToday) {
            // Increment streak if completed yesterday
            return {
              tasks: DEFAULT_TASKS,
              lastCompletedDate: null,
              completedToday: false,
              streak: state.streak + 1,
            };
          } else if (isNewDay && !state.completedToday) {
            // Reset streak if not completed yesterday
            return {
              tasks: DEFAULT_TASKS,
              lastCompletedDate: null,
              completedToday: false,
              streak: 0,
            };
          }

          return state;
        });
      },

      generateDailyTasks: () => {
        const newTasks: DailyTask[] = [
          {
            id: `${Date.now()}-1`,
            title: "Physics Concept Review",
            description: "Review one key physics concept",
            completed: false,
            difficulty: "Medium",
          },
          {
            id: `${Date.now()}-2`,
            title: "Solve Chemistry Problems",
            description: "Complete 5 problems",
            completed: false,
            difficulty: "Hard",
          },
          {
            id: `${Date.now()}-3`,
            title: "Maths Practice Session",
            description: "Solve 10 problems",
            completed: false,
            difficulty: "Medium",
          },
        ];

        set({ tasks: newTasks });
      },

      incrementStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          return {
            streak: state.streak + 1,
            lastCompletedDate: today,
            completedToday: true,
          };
        }),

      getCompletionPercentage: () => {
        const state = get();
        if (state.tasks.length === 0) return 0;
        const completed = state.tasks.filter((t) => t.completed).length;
        return Math.round((completed / state.tasks.length) * 100);
      },
    }),
    {
      name: "tasks-store",
      version: 1,
    }
  )
);
