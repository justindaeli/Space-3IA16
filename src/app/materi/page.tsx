import { MaterialLocker } from "@/components/features/materials/MaterialLocker";

export const metadata = {
  title: "Material Locker · Space 3IA16",
};

export default function MateriPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Material Locker
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Materi kuliah Space 3IA16, dikelompokkan per mata kuliah.
        </p>
      </div>
      <MaterialLocker />
    </div>
  );
}
