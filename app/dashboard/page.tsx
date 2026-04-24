import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

export default async function DashboardPage() {
  const res =  await fetch(
  `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects`,
  { cache: 'no-store' }
);
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: any) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            {/* 🔵 couleur */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            {/* 🔗 lien */}
            <a href={`/projects/${p.id}`} style={{ width: 120 }}>
              {p.name}
            </a>

            {/* ✏️ RENAME */}
            <form action={renameProject} style={{ display: 'flex', gap: 5 }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />

              <input
                type="text"
                name="newName"
                placeholder="New name"
                required
                style={{ padding: 4 }}
              />

              <button type="submit">✏️</button>
            </form>

            {/* 🗑️ DELETE */}
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                🗑️
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

