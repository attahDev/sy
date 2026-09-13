"use client";

// Course CRUD is fully supported by the backend. Module editing is not:
// there's only POST /academy/admin/courses/:id/modules (add) — no
// PATCH/DELETE for a module once created, so this UI only lets you add
// modules, not edit or reorder existing ones. Flagged inline below too.
import { useEffect, useState } from "react";
import {
  BookPlus,
  ChevronDown,
  ChevronUp,
  Layers,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  addModule,
  createCourse,
  deleteCourse,
  fetchAdminCourses,
  updateCourse,
  type AdminCourse,
  type CourseInput,
  type ModuleContent,
  type ModuleInput,
} from "@/lib/adminAcademyApi";

const emptyCourseForm: CourseInput = {
  title: "",
  description: "",
  tags: [],
  isFeatured: false,
};

const emptyModuleForm = {
  title: "",
  description: "",
  paragraphs: "",
};

export default function AdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseInput>(emptyCourseForm);
  const [tagsText, setTagsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [moduleForms, setModuleForms] = useState<Record<string, typeof emptyModuleForm>>({});
  const [addingModuleFor, setAddingModuleFor] = useState<string | null>(null);

  const load = () => { fetchAdminCourses().then(setCourses); };
  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyCourseForm);
    setTagsText("");
    setShowForm(true);
  };

  const startEdit = (course: AdminCourse) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      description: course.description ?? "",
      tags: course.tags,
      isFeatured: course.isFeatured,
    });
    setTagsText(course.tags.join(", "));
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      if (editingId) {
        await updateCourse(editingId, { ...form, tags });
      } else {
        await createCourse({ ...form, tags });
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course and all its modules? This can't be undone.")) return;
    await deleteCourse(id);
    load();
  };

  const toggleActive = async (course: AdminCourse) => {
    await updateCourse(course.id, { isActive: !course.isActive });
    load();
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const moduleForm = (id: string) => moduleForms[id] ?? emptyModuleForm;

  const setModuleField = (id: string, field: keyof typeof emptyModuleForm, value: string) => {
    setModuleForms((prev) => ({ ...prev, [id]: { ...moduleForm(id), [field]: value } }));
  };

  const submitModule = async (course: AdminCourse) => {
    const mf = moduleForm(course.id);
    if (!mf.title.trim()) return;
    const content: ModuleContent = {
      description: mf.description || undefined,
      sections: mf.paragraphs.trim()
        ? [
            {
              id: `section-${Date.now()}`,
              title: mf.title,
              type: "content",
              paragraphs: mf.paragraphs.split("\n").map((p) => p.trim()).filter(Boolean),
            },
          ]
        : [],
    };
    const input: ModuleInput = {
      title: mf.title,
      order: course.modules?.length ?? 0,
      content,
    };
    await addModule(course.id, input);
    setModuleForms((prev) => ({ ...prev, [course.id]: emptyModuleForm }));
    setAddingModuleFor(null);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Courses</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Create courses and add modules. Editing or reordering a module after it&apos;s
            added isn&apos;t supported by the backend yet — get the content right before saving.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white"
        >
          <BookPlus size={16} /> New course
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-3 rounded-2xl border border-[#0D1B3E1F] bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#0D1B3E]">{editingId ? "Edit course" : "New course"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#6B7280]">
              <X size={18} />
            </button>
          </div>

          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
          />
          <input
            placeholder="Tags (comma separated)"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-[#0D1B3E]">
            <input
              type="checkbox"
              checked={form.isFeatured ?? false}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Featured
          </label>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {editingId ? "Save changes" : "Create course"}
          </button>
        </form>
      )}

      <div className="mt-5 space-y-2">
        {courses === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {courses?.map((course) => {
          const isOpen = expandedId === course.id;
          const mf = moduleForm(course.id);
          return (
            <div key={course.id} className="rounded-2xl border border-[#001F3F]/10 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[#0D1B3E]">{course.title}</p>
                    {course.isFeatured && (
                      <span className="rounded-full bg-[#F6D04D]/20 px-2 py-0.5 text-[10px] font-semibold text-[#8a6d00]">
                        Featured
                      </span>
                    )}
                    <button
                      onClick={() => toggleActive(course)}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        course.isActive ? "bg-emerald-50 text-emerald-700" : "bg-[#001F3F]/5 text-[#6B7280]"
                      }`}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-[#6B7280]">{course.description}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    {(course.modules?.length ?? 0)} module{course.modules?.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => startEdit(course)} className="rounded-full p-1.5 text-[#0D1B3E] hover:bg-[#001F3F]/5">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="rounded-full p-1.5 text-red-600 hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                  <button onClick={() => toggleExpanded(course.id)} className="rounded-full p-1.5 text-[#0D1B3E] hover:bg-[#001F3F]/5">
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-3 space-y-3 border-t border-[#001F3F]/10 pt-3">
                  {course.modules?.length ? (
                    <ul className="space-y-1.5">
                      {course.modules
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((m) => (
                          <li key={m.id} className="flex items-center gap-2 rounded-lg bg-[#001F3F]/[0.03] px-3 py-2 text-sm text-[#0D1B3E]">
                            <Layers size={14} className="shrink-0 text-[#6B7280]" />
                            {m.title}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[#6B7280]">No modules yet.</p>
                  )}

                  {addingModuleFor === course.id ? (
                    <div className="space-y-2 rounded-xl border border-[#001F3F]/10 p-3">
                      <input
                        placeholder="Module title"
                        value={mf.title}
                        onChange={(e) => setModuleField(course.id, "title", e.target.value)}
                        className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Short description (optional)"
                        value={mf.description}
                        onChange={(e) => setModuleField(course.id, "description", e.target.value)}
                        className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
                      />
                      <textarea
                        placeholder="Lesson content — one paragraph per line"
                        value={mf.paragraphs}
                        onChange={(e) => setModuleField(course.id, "paragraphs", e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-[#001F3F]/15 px-3 py-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => submitModule(course)}
                          className="rounded-full bg-[#0D1B3E] px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Add module
                        </button>
                        <button
                          onClick={() => setAddingModuleFor(null)}
                          className="rounded-full bg-[#001F3F]/5 px-3 py-1.5 text-xs font-semibold text-[#0D1B3E]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingModuleFor(course.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#0D1B3E]"
                    >
                      <Plus size={14} /> Add module
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
