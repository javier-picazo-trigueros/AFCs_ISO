// Pequeño servidor Express con SQLite para almacenar inscripciones
const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const DB_DIR = path.join(__dirname,'db');
if(!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);
const DB_PATH = path.join(DB_DIR,'inscripciones.db');

const db = new sqlite3.Database(DB_PATH);

// Crear tabla si no existe e insertar datos de ejemplo
db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS inscripciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    ects INTEGER,
    fecha TEXT,
    status TEXT DEFAULT 'pendiente'
  )`);

  // Insertar filas demo si tabla vacía
  db.get('SELECT COUNT(*) as c FROM inscripciones', (err,row)=>{
    if(err) return console.error(err);
    if(row.c === 0){
      const stmt = db.prepare('INSERT INTO inscripciones (nombre,ects,fecha,status) VALUES (?,?,?,?)');
      stmt.run('Voluntariado UFV Solidaria',2,'20 Febrero 2025','pendiente');
      stmt.run('Seminario de Innovación Social',2,'12 Marzo 2025','en_curso');
      stmt.finalize();
      console.log('Datos iniciales insertados en la DB');
    }
  });
  // Crear tabla de usuarios si no existe
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Crear tabla de administradores
  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Crear tabla de actividades
  db.run(`CREATE TABLE IF NOT EXISTS actividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    ects INTEGER DEFAULT 0,
    fecha_inicio TEXT,
    fecha_fin TEXT,
    max_inscritos INTEGER DEFAULT 50,
    created_by INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(created_by) REFERENCES admin_users(id)
  )`);

  // Crear tabla de inscripciones (relación usuario-actividad)
  db.run(`CREATE TABLE IF NOT EXISTS inscripcion_actividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    actividad_id INTEGER,
    status TEXT DEFAULT 'inscrito',
    inscrito_en TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, actividad_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(actividad_id) REFERENCES actividades(id)
  )`);

  // Insertar actividades de demo
  db.get('SELECT COUNT(*) as c FROM actividades', (err,row)=>{
    if(err) return console.error(err);
    if(row.c === 0){
      const stmt = db.prepare('INSERT INTO actividades (nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos) VALUES (?,?,?,?,?,?)');
      stmt.run('Voluntariado UFV Solidaria','Actividad de voluntariado social',2,'2025-02-20','2025-02-22',30);
      stmt.run('Seminario de Innovación Social','Seminario sobre innovación social y emprendimiento',2,'2025-03-12','2025-03-14',25);
      stmt.run('Taller de Liderazgo','Taller práctico de habilidades de liderazgo',1,'2025-04-10','2025-04-11',20);
      stmt.finalize();
      console.log('Actividades de demo insertadas en la DB');
    }
  });
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/api/health', (req,res)=>{
  res.json({status:'ok', timestamp: new Date().toISOString()});
});

// API: listar inscripciones
app.get('/api/inscripciones',(req,res)=>{
  db.all('SELECT * FROM inscripciones ORDER BY id DESC', (err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});

// API: eliminar inscripción
app.delete('/api/inscripciones/:id',(req,res)=>{
  const id = Number(req.params.id);
  db.run('DELETE FROM inscripciones WHERE id = ?', id, function(err){
    if(err) return res.status(500).json({error:err.message});
    if(this.changes === 0) return res.status(404).json({error:'No encontrado'});
    res.json({ok:true});
  });
});

// API: crear inscripción (ejemplo)
app.post('/api/inscripciones',(req,res)=>{
  const {nombre,ects,fecha,status} = req.body;
  if(!nombre) return res.status(400).json({error:'nombre requerido'});
  db.run('INSERT INTO inscripciones (nombre,ects,fecha,status) VALUES (?,?,?,?)', [nombre,ects||0,fecha||'',status||'pendiente'], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.status(201).json({id:this.lastID});
  });
});

// API: registrar usuario alumno
app.post('/api/users', async (req,res)=>{
  try{
    const {nombre,email,password} = req.body || {};
    if(!email || !password) return res.status(400).json({error:'email y password requeridos'});
    const domain = '@alumnos.ufv.es';
    if(!email.toLowerCase().endsWith(domain)){
      return res.status(400).json({error:`El email debe terminar en ${domain}`});
    }
    if(typeof password !== 'string' || password.length < 6){
      return res.status(400).json({error:'La contraseña debe tener al menos 6 caracteres'});
    }
    db.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()], (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(row) return res.status(409).json({error:'Usuario ya existe'});
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.run('INSERT INTO users (nombre,email,password_hash) VALUES (?,?,?)', [nombre||'', email.toLowerCase(), hash], function(err2){
        if(err2) return res.status(500).json({error:err2.message});
        res.status(201).json({id:this.lastID, email: email.toLowerCase()});
      });
    });
  }catch(e){
    console.error(e);
    res.status(500).json({error:'error interno'});
  }
});

// API: registrar administrador
app.post('/api/admin/register', async (req,res)=>{
  try{
    const {nombre,email,password} = req.body || {};
    if(!email || !password) return res.status(400).json({error:'email y password requeridos'});
    const domain = '@ufv.es';
    if(!email.toLowerCase().endsWith(domain) || email.toLowerCase().includes('alumnos')){
      return res.status(400).json({error:`El email debe ser institucional ${domain} (no alumnos)`});
    }
    if(typeof password !== 'string' || password.length < 6){
      return res.status(400).json({error:'La contraseña debe tener al menos 6 caracteres'});
    }
    db.get('SELECT id FROM admin_users WHERE email = ?', [email.toLowerCase()], (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(row) return res.status(409).json({error:'Admin ya existe'});
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.run('INSERT INTO admin_users (nombre,email,password_hash) VALUES (?,?,?)', [nombre||'', email.toLowerCase(), hash], function(err2){
        if(err2) return res.status(500).json({error:err2.message});
        res.status(201).json({id:this.lastID, email: email.toLowerCase(), role:'admin'});
      });
    });
  }catch(e){
    console.error(e);
    res.status(500).json({error:'error interno'});
  }
});

// API: login admin (retorna token simple en sesión)
app.post('/api/admin/login', async (req,res)=>{
  try{
    const {email,password} = req.body || {};
    if(!email || !password) return res.status(400).json({error:'email y password requeridos'});
    db.get('SELECT * FROM admin_users WHERE email = ?', [email.toLowerCase()], (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(!row) return res.status(401).json({error:'Admin no encontrado'});
      const match = bcrypt.compareSync(password, row.password_hash);
      if(!match) return res.status(401).json({error:'Contraseña incorrecta'});
      res.json({id:row.id, email: row.email, nombre: row.nombre, role:'admin'});
    });
  }catch(e){
    console.error(e);
    res.status(500).json({error:'error interno'});
  }
});

// API: listar actividades
app.get('/api/actividades',(req,res)=>{
  db.all('SELECT * FROM actividades ORDER BY fecha_inicio DESC', (err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});

// API: crear actividad (admin)
app.post('/api/actividades',(req,res)=>{
  const {nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos,admin_id} = req.body;
  if(!nombre || !admin_id) return res.status(400).json({error:'nombre y admin_id requeridos'});
  db.run('INSERT INTO actividades (nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos,created_by) VALUES (?,?,?,?,?,?,?)', 
    [nombre,descripcion||'',ects||0,fecha_inicio||'',fecha_fin||'',max_inscritos||50,admin_id], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.status(201).json({id:this.lastID});
  });
});

// API: actualizar actividad (admin)
app.put('/api/actividades/:id',(req,res)=>{
  const id = Number(req.params.id);
  const {nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos} = req.body;
  if(!nombre) return res.status(400).json({error:'nombre requerido'});
  db.run('UPDATE actividades SET nombre=?,descripcion=?,ects=?,fecha_inicio=?,fecha_fin=?,max_inscritos=? WHERE id=?',
    [nombre,descripcion||'',ects||0,fecha_inicio||'',fecha_fin||'',max_inscritos||50,id], function(err){
    if(err) return res.status(500).json({error:err.message});
    if(this.changes === 0) return res.status(404).json({error:'No encontrado'});
    res.json({ok:true});
  });
});

// API: eliminar actividad (admin)
app.delete('/api/actividades/:id',(req,res)=>{
  const id = Number(req.params.id);
  db.run('DELETE FROM actividades WHERE id = ?', id, function(err){
    if(err) return res.status(500).json({error:err.message});
    if(this.changes === 0) return res.status(404).json({error:'No encontrado'});
    res.json({ok:true});
  });
});

// API: estadísticas de actividades
app.get('/api/actividades/:id/stats',(req,res)=>{
  const id = Number(req.params.id);
  db.get('SELECT COUNT(*) as total_inscritos FROM inscripcion_actividades WHERE actividad_id = ?', [id], (err,row)=>{
    if(err) return res.status(500).json({error:err.message});
    db.get('SELECT max_inscritos FROM actividades WHERE id = ?', [id], (err2, act)=>{
      if(err2) return res.status(500).json({error:err2.message});
      if(!act) return res.status(404).json({error:'Actividad no encontrada'});
      res.json({
        actividad_id: id,
        inscritos: row.total_inscritos,
        max: act.max_inscritos,
        disponibles: Math.max(0, act.max_inscritos - row.total_inscritos)
      });
    });
  });
});

// API: inscribir usuario a actividad
app.post('/api/inscribir',(req,res)=>{
  const {user_id, actividad_id} = req.body;
  if(!user_id || !actividad_id) return res.status(400).json({error:'user_id y actividad_id requeridos'});
  db.run('INSERT INTO inscripcion_actividades (user_id, actividad_id) VALUES (?,?)', [user_id, actividad_id], function(err){
    if(err){
      if(err.message.includes('UNIQUE')) return res.status(409).json({error:'Ya estás inscrito'});
      return res.status(500).json({error:err.message});
    }
    res.status(201).json({id:this.lastID});
  });
});

// API: reporte general de actividades
app.get('/api/admin/reporte',(req,res)=>{
  db.all(`SELECT a.id, a.nombre, a.ects, COUNT(ia.id) as inscritos, a.max_inscritos 
          FROM actividades a 
          LEFT JOIN inscripcion_actividades ia ON a.id = ia.actividad_id 
          GROUP BY a.id 
          ORDER BY a.nombre`, (err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', ()=>{
  const os = require('os');
  const ifaces = os.networkInterfaces();
  let localIp = 'localhost';
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIp = iface.address;
        break;
      }
    }
  }
  console.log(`\n🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📡 Accesible en red local: http://${localIp}:${PORT}`);
  console.log(`⚠️  Comparte esta URL con otros dispositivos en la WiFi\n`);
});
