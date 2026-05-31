import pg from 'pg';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Password hashing helper using Node.js native crypto
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Check for DATABASE_URL or Postgres environment variables
const dbUrl = process.env.DATABASE_URL;

// Hybrid DB Setup
let usePostgres = false;
let pool: pg.Pool | null = null;

const FALLBACK_FILE = path.join(process.cwd(), 'db_fallback.json');

interface FallbackSchema {
  users: any[];
  projects: any[];
  timeline: any[];
}

const defaultData: FallbackSchema = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: hashPassword('admin123')
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Cozinha Gourmet Anthracite',
      category: 'Cozinha',
      image: '',
      album: [
      ],
      description: 'Cozinha com acabamento em tons escuros, ilha central e ferragens alemãs de alta performance.'
    },
    {
      id: 2,
      title: 'Suíte Master Walk-in',
      category: 'Closet',
      image: '',
      album: [
        ],
      description: 'Closet planejado com divisões inteligentes, iluminação em LED embutida e nichos para calçados.'
    },
    {
      id: 3,
      title: 'Home Office Executivo',
      category: 'Quarto',
      image: '',
      album: [
          ],
      description: 'Ambiente focado em produtividade com mesa em L, painéis ripados e armários para organização.'
    },
    {
      id: 4,
      title: 'Living Integrado',
      category: 'Sala',
      image: '',
      album: [
      ],
      description: 'Painel de TV com fundo em pedra e móveis suspensos em laca branca fosca.'
    },
    {
      id: 5,
      title: 'Adega Gourmet Climatizada',
      category: 'Adega',
      image: '',
      album: [
      ],
      description: 'Churrasqueira integrada com marcenaria naval e linda adega para vinhos selecionados.'
    },
    {
      id: 6,
      title: 'Banheiro Spa',
      category: 'Banheiro',
      image: '',
      album: [
      ],
      description: 'Gabinete suspenso com gavetões e espelheira com moldura em metal.'
    }
  ],
  timeline: [
    {
      id: 1,
      year: '2022',
      title: 'Fundação da eMe Móveis',
      description: 'Nascimento da eMe Móveis no Rio Grande do Sul, com foco inicial em cozinhas planejadas e painéis.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      year: '2023',
      title: 'Primeiro móvel produzido',
      description: 'Entrega do primeiro dormitório completo com ferragens telescópicas e iluminação integrada de alto padrão.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 21,
      year: '2024',
      title: 'Sede e show-room próprio',
      description: 'Inauguração de nossa sede em Frederico Westphalen/RS, apresentando as últimas tendências em acabamentos e MDF premium.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      year: '2026',
      title: 'Mais de 100 Projetos Entregues',
      description: 'Marca histórica de projetos entregues e clientes satisfeitos em nossa região, unindo qualidade e exclusividade.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
    }
  ]
};

// Initialise pool if PG is configured
if (dbUrl || process.env.PGHOST) {
  try {
    pool = new pg.Pool({
      connectionString: dbUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
    console.log('PostgreSQL Pool initialized');
    usePostgres = true;
  } catch (error) {
    console.error('Failed to create PostgreSQL pool, falling back to file DB:', error);
  }
} else {
  console.log('PostgreSQL details not found. Using SQLite/file database fallback at:', FALLBACK_FILE);
}

// Function to read fallback JSON File
function readFallback(): FallbackSchema {
  if (!fs.existsSync(FALLBACK_FILE)) {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const data = fs.readFileSync(FALLBACK_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading fallback file, reconstructing:', e);
    return defaultData;
  }
}

// Function to write fallback JSON File
function writeFallback(data: FallbackSchema) {
  fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Database Init
export async function initDatabase() {
  if (usePostgres && pool) {
    try {
      const client = await pool.connect();
      try {
        console.log('Checking database tables in PostgreSQL...');
        
        // Define tables
        await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            category VARCHAR(50) NOT NULL,
            image TEXT NOT NULL,
            album JSONB
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS timeline (
            id SERIAL PRIMARY KEY,
            year VARCHAR(10) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image TEXT
          );
        `);

        // Check if admin user exists, insert if not
        const userRes = await client.query('SELECT * FROM users WHERE username = $1', ['admin']);
        if (userRes.rows.length === 0) {
          const passHash = hashPassword('admin123');
          await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', passHash]);
          console.log('Default admin user created in PostgreSQL.');
        }

        // Check if projects table is empty, insert initial ones
        const projectRes = await client.query('SELECT * FROM projects LIMIT 1');
        if (projectRes.rows.length === 0) {
          for (const p of defaultData.projects) {
            await client.query(
              'INSERT INTO projects (id, title, description, category, image, album) VALUES ($1, $2, $3, $4, $5, $6)',
              [p.id, p.title, p.description, p.category, p.image, JSON.stringify(p.album)]
            );
          }
          console.log('Initial projects seeded to PostgreSQL.');
        }

        // Check if timeline table is empty, insert initial ones
        const timelineRes = await client.query('SELECT * FROM timeline LIMIT 1');
        if (timelineRes.rows.length === 0) {
          for (const t of defaultData.timeline) {
            await client.query(
              'INSERT INTO timeline (id, year, title, description, image) VALUES ($1, $2, $3, $4, $5)',
              [t.id, t.year, t.title, p_or_t_desc(t.description), t.image]
            );
          }
          console.log('Initial timeline seeded to PostgreSQL.');
        }

        console.log('PostgreSQL configuration completed successfully.');
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('PostgreSQL configuration error. Fast falling back to File DB:', error);
      usePostgres = false;
      readFallback(); // ensure default fallback initialized
    }
  } else {
    readFallback(); // ensure default fallback initialized
  }
}

function p_or_t_desc(desc: string | undefined): string {
  return desc || '';
}

// Global query engine exposing native-style APIs
export const db = {
  // Projects Methods
  getProjects: async (): Promise<any[]> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query('SELECT * FROM projects ORDER BY id DESC');
        return res.rows.map(row => ({
          id: row.id,
          title: row.title,
          category: row.category,
          mainImage: row.image,
          album: row.album || [row.image],
          description: row.description
        }));
      } catch (err) {
        console.error('PG getProjects error, getting fallback:', err);
      }
    }
    const data = readFallback();
    // Return sorted descending from latest added
    return [...data.projects].reverse();
  },

  addProject: async (project: { title: string; category: string; image: string; description: string; album?: string[] }): Promise<any> => {
    const defaultAlbum = project.album || [project.image];
    if (usePostgres && pool) {
      try {
        const res = await pool.query(
          'INSERT INTO projects (title, category, image, description, album) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [project.title, project.category, project.image, project.description, JSON.stringify(defaultAlbum)]
        );
        return res.rows[0];
      } catch (err) {
        console.error('PG addProject error:', err);
      }
    }
    const data = readFallback();
    const newId = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.id)) + 1 : 1;
    const newProject = {
      id: newId,
      title: project.title,
      category: project.category,
      mainImage: project.image,
      album: defaultAlbum,
      description: project.description
    };
    data.projects.push(newProject);
    writeFallback(data);
    return newProject;
  },

  updateProject: async (id: number, project: { title: string; category: string; image: string; description: string; album?: string[] }): Promise<boolean> => {
    const defaultAlbum = project.album || [project.image];
    if (usePostgres && pool) {
      try {
        const res = await pool.query(
          'UPDATE projects SET title = $1, category = $2, image = $3, description = $4, album = $5 WHERE id = $6',
          [project.title, project.category, project.image, project.description, JSON.stringify(defaultAlbum), id]
        );
        return (res.rowCount ?? 0) > 0;
      } catch (err) {
        console.error('PG updateProject error:', err);
      }
    }
    const data = readFallback();
    const idx = data.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      data.projects[idx] = {
        ...data.projects[idx],
        title: project.title,
        category: project.category,
        mainImage: project.image,
        album: defaultAlbum,
        description: project.description
      };
      writeFallback(data);
      return true;
    }
    return false;
  },

  deleteProject: async (id: number): Promise<boolean> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        return (res.rowCount ?? 0) > 0;
      } catch (err) {
        console.error('PG deleteProject error:', err);
      }
    }
    const data = readFallback();
    const lenBefore = data.projects.length;
    data.projects = data.projects.filter(p => p.id !== id);
    writeFallback(data);
    return data.projects.length < lenBefore;
  },

  // Timeline Methods
  getTimeline: async (): Promise<any[]> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query('SELECT * FROM timeline ORDER BY year ASC, id ASC');
        return res.rows;
      } catch (err) {
        console.error('PG getTimeline error:', err);
      }
    }
    const data = readFallback();
    // Sort chronological ascending
    return [...data.timeline].sort((a, b) => a.year.localeCompare(b.year));
  },

  addTimeline: async (item: { year: string; title: string; description: string; image: string }): Promise<any> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query(
          'INSERT INTO timeline (year, title, description, image) VALUES ($1, $2, $3, $4) RETURNING *',
          [item.year, item.title, item.description, item.image]
        );
        return res.rows[0];
      } catch (err) {
        console.error('PG addTimeline error:', err);
      }
    }
    const data = readFallback();
    const newId = data.timeline.length > 0 ? Math.max(...data.timeline.map(t => t.id)) + 1 : 1;
    const newItem = {
      id: newId,
      ...item
    };
    data.timeline.push(newItem);
    writeFallback(data);
    return newItem;
  },

  updateTimeline: async (id: number, item: { year: string; title: string; description: string; image: string }): Promise<boolean> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query(
          'UPDATE timeline SET year = $1, title = $2, description = $3, image = $4 WHERE id = $5',
          [item.year, item.title, item.description, item.image, id]
        );
        return (res.rowCount ?? 0) > 0;
      } catch (err) {
        console.error('PG updateTimeline error:', err);
      }
    }
    const data = readFallback();
    const idx = data.timeline.findIndex(t => t.id === id);
    if (idx !== -1) {
      data.timeline[idx] = {
        id,
        year: item.year,
        title: item.title,
        description: item.description,
        image: item.image
      };
      writeFallback(data);
      return true;
    }
    return false;
  },

  deleteTimeline: async (id: number): Promise<boolean> => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query('DELETE FROM timeline WHERE id = $1', [id]);
        return (res.rowCount ?? 0) > 0;
      } catch (err) {
        console.error('PG deleteTimeline error:', err);
      }
    }
    const data = readFallback();
    const lenBefore = data.timeline.length;
    data.timeline = data.timeline.filter(t => t.id !== id);
    writeFallback(data);
    return data.timeline.length < lenBefore;
  },

  // Auth Methods
  verifyUser: async (username: string, pass: string): Promise<any | null> => {
    const hashed = hashPassword(pass);
    if (usePostgres && pool) {
      try {
        const res = await pool.query(
          'SELECT * FROM users WHERE username = $1 AND password = $2',
          [username, hashed]
        );
        if (res.rows.length > 0) {
          return { id: res.rows[0].id, username: res.rows[0].username };
        }
        return null;
      } catch (err) {
        console.error('PG verifyUser error:', err);
      }
    }
    const data = readFallback();
    const found = data.users.find(u => u.username === username && u.password === hashed);
    if (found) {
      return { id: found.id, username: found.username };
    }
    return null;
  }
};
