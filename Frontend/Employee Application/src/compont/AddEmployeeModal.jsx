import { useState } from "react";

export default function AddEmployeeModal({ departments, onSubmit, onClose, submitting }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: departments[0]?.name || "",
    salary: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.position.trim()) e.position = "Position is required";
    if (!form.department) e.department = "Department required";
    if (!form.salary || isNaN(Number(form.salary)) || Number(form.salary) <= 0)
      e.salary = "Salary must be a positive number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name,
      position: form.position,
      department: form.department,
      salary: parseFloat(form.salary),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded p-2"
              placeholder="Alice Johnson"
            />
            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full border rounded p-2"
              placeholder="Frontend Engineer"
            />
            {errors.position && <div className="text-red-500 text-xs">{errors.position}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full border rounded p-2"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.department && <div className="text-red-500 text-xs">{errors.department}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              type="number"
              step="0.01"
              className="w-full border rounded p-2"
              placeholder="90000"
            />
            {errors.salary && <div className="text-red-500 text-xs">{errors.salary}</div>}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
