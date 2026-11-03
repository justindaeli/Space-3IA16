'use client';

import { useEffect, useState } from 'react';
import { WelcomeHeader } from '@/components/features/dashboard/WelcomeHeader';
import { QuickStats } from '@/components/features/dashboard/QuickStats';
import { MaterialLocker } from '@/components/features/materials/MaterialLocker';
import { TaskBoard } from '@/components/features/tasks/TaskBoard';
import { getQuickStats, materials } from '@/lib/mock-data';
import { getTasks } from '@/services/taskService';
import { Task } from '@/types';
import { LoadingState } from '@/components/ui/LoadingState';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const stats = getQuickStats();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error('Gagal memuat data dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) return <LoadingState label="Memuat dashboard Space 3IA16..." />;

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <QuickStats stats={stats} />
      <TaskBoard tasks={tasks} />
      <MaterialLocker materials={materials} />
    </div>
  );
}