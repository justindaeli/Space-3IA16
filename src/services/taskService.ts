import { supabase } from '@/lib/supabase';
import { Task, TaskStatus } from '@/types';

export interface CreateTaskInput {
  title: string;
  description?: string;
  subject: string;
  due_date: string;
  status?: TaskStatus;
}

/**
 * Mengambil seluruh data tugas dari Supabase
 */
export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error.message);
    throw new Error('Gagal mengambil data tugas.');
  }

  return data as Task[];
}

/**
 * Menambahkan tugas baru ke Supabase
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title: input.title,
        description: input.description || '',
        subject: input.subject,
        due_date: input.due_date,
        status: input.status || 'TODO',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error.message);
    throw new Error('Gagal membuat tugas baru.');
  }

  return data as Task;
}

/**
 * Mengupdate status tugas (TODO / IN_PROGRESS / DONE)
 */
export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task status:', error.message);
    throw new Error('Gagal memperbarui status tugas.');
  }

  return data as Task;
}