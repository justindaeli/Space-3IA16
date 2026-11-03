"use client";

import { useState } from "react";
import { WelcomeHeader } from "@/components/features/dashboard/WelcomeHeader";
import { QuickStats } from "@/components/features/dashboard/QuickStats";
import { MaterialLocker } from "@/components/features/materials/MaterialLocker";
import { TaskBoard } from "@/components/features/tasks/TaskBoard";
import { CreateTaskModal } from "@/components/features/tasks/CreateTaskModal";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardData } from "@/hooks/useDashboardData";
import { computeQuickStats } from "@/lib/quick-stats";

export default function HomePage() {
  const dashboard = useDashboardData();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (dashboard.loadStatus === "loading") {
    return <DashboardSkeleton />;
  }

  if (dashboard.loadStatus === "error") {
    return (
      <ErrorState
        title="Gagal Memuat Dashboard"
        description="Terjadi kendala saat menghubungkan ke sumber data. Silakan coba kembali."
        onRetry={dashboard.reload}
      />
    );
  }

  const quickStats = computeQuickStats(dashboard.tasks, dashboard.announcements);

  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <QuickStats stats={quickStats} />
      <TaskBoard
        tasks={dashboard.tasks}
        pendingTaskId={dashboard.pendingTaskId}
        actionError={dashboard.actionError}
        onAddTask={() => setIsCreateOpen(true)}
        onMoveTask={dashboard.moveTask}
      />
      <MaterialLocker materials={dashboard.materials} />
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onTaskCreated={dashboard.addTask}
      />
    </div>
  );
}
