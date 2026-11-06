export interface Announcement {
  id: string;
  title: string;
  createdAt: string;
}

export interface CreateAnnouncementInput {
  title: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  details?: string;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  adminCount: number;
  totalTasks: number;
  completedTasks: number;
  totalMaterials: number;
  totalAnnouncements: number;
  tasksByCourse: Record<string, number>;
  recentActivities: ActivityLog[];
}

export interface QuickStats {
  activeTaskCount: number;
  nearestDeadline: string | null;
  latestAnnouncement: Announcement | null;
}

export interface StatCard {
  label: string;
  value: string;
  description?: string;
}

