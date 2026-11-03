import { WelcomeHeader } from "@/components/features/dashboard/WelcomeHeader";
import { QuickStats } from "@/components/features/dashboard/QuickStats";
import { MaterialLocker } from "@/components/features/materials/MaterialLocker";
import { TaskBoard } from "@/components/features/tasks/TaskBoard";
import { getQuickStats, materials, tasks } from "@/lib/mock-data";

export default function HomePage() {
  const stats = getQuickStats();

  return (
    <>
      <WelcomeHeader />
      <QuickStats stats={stats} />
      <TaskBoard tasks={tasks} />
      <MaterialLocker materials={materials} />
    </>
  );
}
