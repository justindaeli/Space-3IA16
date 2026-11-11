import { getSupabaseServer } from "./supabase";
import type { Task, Material, Announcement, ActivityLog, CreateTaskInput, CreateMaterialInput, CreateAnnouncementInput } from "@/types";

export async function getAllTasks(): Promise<Task[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, course, deadline, status, created_at")
    .order("deadline", { ascending: true });

  if (error || !data) return [];

  return data.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    course: t.course,
    deadline: t.deadline,
    status: t.status,
    assignee: { id: "", name: "Unknown", initials: "?" }, // ponytail: placeholder until proper user join
  }));
}

export async function getTaskById(id: string): Promise<Task | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, course, deadline, status, created_at")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    course: data.course,
    deadline: data.deadline,
    status: data.status,
    assignee: { id: "", name: "Unknown", initials: "?" },
  };
}

export async function createTask(
  task: CreateTaskInput
): Promise<Task | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: task.title,
      description: task.description || "",
      course: task.course,
      deadline: task.deadline,
      status: task.status || "todo",
    })
    .select("id, title, description, course, deadline, status")
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    course: data.course,
    deadline: data.deadline,
    status: data.status,
    assignee: { id: "", name: "Unknown", initials: "?" },
  };
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<Task, "id">>
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("tasks").update(updates).eq("id", id);
  return !error;
}

export async function deleteTask(id: string): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  return !error;
}

export async function getAllMaterials(): Promise<Material[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("materials")
    .select("id, title, course, type, url, uploaded_at")
    .order("uploaded_at", { ascending: false });

  if (error || !data) return [];

  return data.map((m) => ({
    id: m.id,
    title: m.title,
    course: m.course,
    type: m.type,
    url: m.url,
    uploadedAt: m.uploaded_at,
  }));
}

export async function createMaterial(
  material: CreateMaterialInput
): Promise<Material | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("materials")
    .insert({
      title: material.title,
      course: material.course,
      type: material.type,
      url: material.url,
    })
    .select("id, title, course, type, url, uploaded_at")
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    course: data.course,
    type: data.type,
    url: data.url,
    uploadedAt: data.uploaded_at,
  };
}

export async function updateMaterial(
  id: string,
  updates: Partial<Omit<Material, "id">>
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("materials")
    .update(updates)
    .eq("id", id);
  return !error;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("materials").delete().eq("id", id);
  return !error;
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((a) => ({
    id: a.id,
    title: a.title,
    createdAt: a.created_at,
  }));
}

export async function createAnnouncement(
  announcement: CreateAnnouncementInput
): Promise<Announcement | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title: announcement.title,
    })
    .select("id, title, created_at")
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    createdAt: data.created_at,
  };
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);
  return !error;
}

export async function logActivity(
  userId: string,
  userName: string,
  action: string,
  target: string,
  details?: string
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("activity_logs").insert({
    user_id: userId,
    user_name: userName,
    action,
    target,
    details: details ?? null,
  });
  return !error;
}

export async function getAllActivityLogs(): Promise<ActivityLog[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("activity_logs")
    .select(
      "id, user_id, user_name, action, target, details, created_at"
    )
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((a) => ({
    id: a.id,
    userId: a.user_id,
    userName: a.user_name,
    action: a.action,
    target: a.target,
    details: a.details,
    createdAt: a.created_at,
  }));
}

export async function getActivities(limit: number): Promise<ActivityLog[]> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("activity_logs")
    .select(
      "id, user_id, user_name, action, target, details, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((a) => ({
    id: a.id,
    userId: a.user_id,
    userName: a.user_name,
    action: a.action,
    target: a.target,
    details: a.details,
    createdAt: a.created_at,
  }));
}

export async function getAdminStats(): Promise<{
  totalUsers: number;
  totalTasks: number;
  totalMaterials: number;
  activitiesCount: number;
}> {
  const supabase = getSupabaseServer();
  
  const [usersRes, tasksRes, materialsRes, activitiesRes] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id", { count: "exact", head: true }),
    supabase.from("materials").select("id", { count: "exact", head: true }),
    supabase.from("activity_logs").select("id", { count: "exact", head: true }),
  ]);

  return {
    totalUsers: usersRes.count ?? 0,
    totalTasks: tasksRes.count ?? 0,
    totalMaterials: materialsRes.count ?? 0,
    activitiesCount: activitiesRes.count ?? 0,
  };
}

export async function updateTaskStatus(
  id: string,
  status: string
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id);
  return !error;
}

export async function updateUserPassword(
  id: string,
  passwordHash: string,
  passwordSalt: string
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("users")
    .update({ password_hash: passwordHash, password_salt: passwordSalt })
    .eq("id", id);
  return !error;
}

export async function updateUserRole(
  id: string,
  role: "admin" | "user"
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", id);
  return !error;
}

export async function updateUserStatus(
  id: string,
  status: "active" | "inactive"
): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id);
  return !error;
}

export async function deleteUser(id: string): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("users").delete().eq("id", id);
  return !error;
}
