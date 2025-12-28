// Pequeño servidor Express con SQLite para almacenar inscripciones
const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const DB_DIR = path.join(__dirname,'db');
if(!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);
const DB_PATH = path.join(DB_DIR,'inscripciones.db');

const db = new sqlite3.Database(DB_PATH);

// Crear tablas y datos iniciales
db.serialize(()=>{
  // Crear todas las tablas primero
  db.run(`CREATE TABLE IF NOT EXISTS inscripciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    ects INTEGER,
    fecha TEXT,
    status TEXT DEFAULT 'pendiente'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS actividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    ects INTEGER DEFAULT 0,
    fecha_inicio TEXT,
    fecha_fin TEXT,
    modalidad TEXT DEFAULT 'Presencial',
    max_inscritos INTEGER DEFAULT 50,
    created_by INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(created_by) REFERENCES admin_users(id)
  )`);

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

  db.run(`CREATE TABLE IF NOT EXISTS asistencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inscripcion_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    actividad_id INTEGER NOT NULL,
    verificado_por INTEGER,
    asistio INTEGER DEFAULT 0,
    creditos_otorgados INTEGER DEFAULT 0,
    fecha_verificacion TEXT,
    UNIQUE(inscripcion_id),
    FOREIGN KEY(inscripcion_id) REFERENCES inscripcion_actividades(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(actividad_id) REFERENCES actividades(id),
    FOREIGN KEY(verificado_por) REFERENCES admin_users(id)
  )`);

  // Ahora insertar datos de demo si las tablas están vacías
  setTimeout(() => {
    db.get('SELECT COUNT(*) as c FROM actividades', (err, row) => {
      if (err) return console.error('Error al contar actividades:', err);
      if (row.c === 0) {
        const stmt = db.prepare('INSERT INTO actividades (nombre,descripcion,ects,fecha_inicio,fecha_fin,modalidad,max_inscritos) VALUES (?,?,?,?,?,?,?)');
        stmt.run('Voluntariado UFV Solidaria', 'Actividad de voluntariado social. Únete a nuestro equipo para ayudar a la comunidad.', 2, '2025-02-20', '2025-02-22', 'Presencial', 30);
        stmt.run('Seminario de Innovación Social', 'Seminario sobre innovación social y emprendimiento. Aprende nuevas formas de hacer negocios.', 2, '2025-03-12', '2025-03-14', 'Híbrido', 25);
        stmt.run('Taller de Liderazgo', 'Taller práctico de habilidades de liderazgo. Desarrolla tus capacidades.', 1, '2025-04-10', '2025-04-11', 'Presencial', 20);
        stmt.run('Taller de Fotografía Creativa', 'Aprende técnicas de fotografía móvil y composición. Crea contenido visual impactante.', 1, '2025-05-05', '2025-05-06', 'Presencial', 20);
        stmt.run('Curso de Programación Básica', 'Introducción a la programación en Python. Aprende los fundamentos del código.', 3, '2025-06-01', '2025-06-15', 'Online', 40);
        stmt.run('Club de Debate', 'Sesiones semanales de debate y oratoria. Mejora tus habilidades de comunicación.', 1, '2025-04-20', '2025-06-20', 'Presencial', 30);
        stmt.run('Equipo de Fútbol Sala', 'Entrenamientos y torneos internos. Diviértete jugando.', 1, '2025-02-01', '2025-12-15', 'Presencial', 25);
        stmt.finalize(() => {
          console.log('✓ Actividades de demo insertadas en la DB');
        });
      }
    });

    // Crear usuario de prueba si no existe
    db.get('SELECT COUNT(*) as c FROM users WHERE email = ?', ['alumnos@alumnos.ufv.es'], (err, row) => {
      if (err) return console.error('Error al buscar usuario:', err);
      if (row.c === 0) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('123456', salt);
        db.run('INSERT INTO users (nombre,email,password_hash) VALUES (?,?,?)',
          ['Usuario de Prueba', 'alumnos@alumnos.ufv.es', hash], function (err2) {
          if (err2) return console.error('Error al crear usuario:', err2);
          const userId = this.lastID;

          // Inscribir a actividades
          const inscripcionesStmt = db.prepare('INSERT INTO inscripcion_actividades (user_id, actividad_id, status) VALUES (?,?,?)');
          // Actividad 1: Voluntariado (2 ECTS) - completado
          inscripcionesStmt.run(userId, 1, 'completado');
          // Actividad 2: Seminario (2 ECTS) - completado
          inscripcionesStmt.run(userId, 2, 'completado');
          // Actividad 3: Taller Liderazgo (1 ECTS) - completado
          inscripcionesStmt.run(userId, 3, 'completado');
          // Actividad 4: Taller Foto (1 ECTS) - inscrito (sin completar)
          inscripcionesStmt.run(userId, 4, 'inscrito');
          inscripcionesStmt.finalize(() => {
            // Ahora crear registros de asistencia para las completadas (3 créditos totales: 2+1)
            const asistenciaStmt = db.prepare(
              'INSERT INTO asistencias (inscripcion_id, user_id, actividad_id, asistio, creditos_otorgados, fecha_verificacion) VALUES (?,?,?,?,?,?)'
            );
            
            // Inscripción 1: Voluntariado (2 ECTS)
            asistenciaStmt.run(1, userId, 1, 1, 2, new Date().toISOString());
            // Inscripción 2: Seminario (2 ECTS) - pero solo otorgamos 1 crédito para total de 3
            asistenciaStmt.run(2, userId, 2, 1, 1, new Date().toISOString());
            
            asistenciaStmt.finalize(() => {
              console.log('✓ Usuario de prueba creado: alumnos@alumnos.ufv.es (contraseña: 123456)');
              console.log('✓ Actividades completadas: 3 créditos obtenidos');
            });
          });
        });
      }
    });

    // Crear cuenta de administrador de prueba si no existe
    db.get('SELECT COUNT(*) as c FROM admin_users WHERE email = ?', ['admin@ufv.es'], (err, row) => {
      if (err) return console.error('Error al buscar admin:', err);
      if (row.c === 0) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('123456', salt);
        db.run('INSERT INTO admin_users (nombre,email,password_hash) VALUES (?,?,?)',
          ['Administrador', 'admin@ufv.es', hash], function (err2) {
          if (err2) return console.error('Error al crear admin:', err2);
          console.log('✓ Cuenta de administrador creada: admin@ufv.es (contraseña: 123456)');
        });
      }
    });
  }, 500);
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/api/health', (req,res)=>{
  res.json({status:'ok', timestamp: new Date().toISOString()});
});

// API: listar inscripciones (por usuario o todas si admin)
app.get('/api/inscripciones',(req,res)=>{
  const userId = req.query.user_id ? Number(req.query.user_id) : null;
  if(userId){
    db.all(`SELECT ia.id as inscripcion_id, a.id as actividad_id, a.nombre, a.ects, a.fecha_inicio, a.fecha_fin, ia.inscrito_en
            FROM inscripcion_actividades ia
            JOIN actividades a ON ia.actividad_id = a.id
            WHERE ia.user_id = ?
            ORDER BY ia.inscrito_en DESC`, [userId], (err,rows)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json(rows);
    });
  } else {
    // retornar todas las inscripciones (admin/report)
    db.all(`SELECT ia.id as inscripcion_id, ia.user_id, a.id as actividad_id, a.nombre, ia.inscrito_en
            FROM inscripcion_actividades ia
            LEFT JOIN actividades a ON ia.actividad_id = a.id
            ORDER BY ia.inscrito_en DESC`, (err,rows)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json(rows);
    });
  }
});

// API: eliminar inscripción (usuario) - requiere ownership check opcional
app.delete('/api/inscripciones/:id',(req,res)=>{
  const id = Number(req.params.id);
  const userId = req.body && req.body.user_id ? Number(req.body.user_id) : null;
  if(userId){
    db.get('SELECT user_id FROM inscripcion_actividades WHERE id = ?', [id], (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(!row) return res.status(404).json({error:'No encontrado'});
      if(row.user_id !== userId) return res.status(403).json({error:'No autorizado'});
      db.run('DELETE FROM inscripcion_actividades WHERE id = ?', [id], function(err2){
        if(err2) return res.status(500).json({error:err2.message});
        res.json({ok:true});
      });
    });
  } else {
    db.run('DELETE FROM inscripcion_actividades WHERE id = ?', [id], function(err){
      if(err) return res.status(500).json({error:err.message});
      if(this.changes === 0) return res.status(404).json({error:'No encontrado'});
      res.json({ok:true});
    });
  }
});

// API: obtener progreso del usuario (créditos, actividades completadas, etc)
app.get('/api/progreso/:user_id', (req,res)=>{
  const userId = Number(req.params.user_id);
  
  // Obtener créditos totales otorgados
  db.get('SELECT COALESCE(SUM(creditos_otorgados), 0) as creditos FROM asistencias WHERE user_id = ?', [userId], (err, creditosRow)=>{
    if(err) return res.status(500).json({error:err.message});
    
    const creditosObtenidos = creditosRow.creditos || 0;
    
    // Obtener actividades completadas (con asistencia verificada)
    db.all(`
      SELECT a.id, a.nombre, a.ects, aa.creditos_otorgados, aa.fecha_verificacion
      FROM asistencias aa
      JOIN actividades a ON aa.actividad_id = a.id
      WHERE aa.user_id = ?
      ORDER BY aa.fecha_verificacion DESC
    `, [userId], (err2, actividades)=>{
      if(err2) return res.status(500).json({error:err2.message});
      
      // Obtener total de ECTS posibles e inscritos
      db.get('SELECT COUNT(*) as total, SUM(a.ects) as ects_total FROM inscripcion_actividades ia JOIN actividades a ON ia.actividad_id = a.id WHERE ia.user_id = ?', [userId], (err3, countRow)=>{
        if(err3) return res.status(500).json({error:err3.message});
        
        const totalInscripciones = countRow.total || 0;
        const ectsTotales = countRow.ects_total || 0;
        
        res.json({
          creditos_obtenidos: creditosObtenidos,
          total_inscripciones: totalInscripciones,
          ects_totales: ectsTotales,
          actividades_completadas: actividades || [],
          porcentaje_progreso: totalInscripciones > 0 ? Math.round((creditosObtenidos / Math.min(ectsTotales, 50)) * 100) : 0
        });
      });
    });
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

// API: login usuario (estudiante)
app.post('/api/users/login', async (req,res)=>{
  try{
    const {email,password} = req.body || {};
    if(!email || !password) return res.status(400).json({error:'email y password requeridos'});
    db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(!row) return res.status(401).json({error:'Usuario no encontrado'});
      const match = bcrypt.compareSync(password, row.password_hash);
      if(!match) return res.status(401).json({error:'Contraseña incorrecta'});
      res.json({id:row.id, email: row.email, nombre: row.nombre});
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

// API: obtener actividad específica
app.get('/api/actividades/:id',(req,res)=>{
  const id = Number(req.params.id);
  db.get('SELECT * FROM actividades WHERE id = ?', [id], (err,row)=>{
    if(err) return res.status(500).json({error:err.message});
    if(!row) return res.status(404).json({error:'Actividad no encontrada'});
    res.json(row);
  });
});

// API: crear actividad (admin)
app.post('/api/actividades',(req,res)=>{
  const {nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos,modalidad,admin_id} = req.body;
  if(!nombre || !admin_id) return res.status(400).json({error:'nombre y admin_id requeridos'});
  db.run('INSERT INTO actividades (nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos,modalidad,created_by) VALUES (?,?,?,?,?,?,?,?)', 
    [nombre,descripcion||'',ects||0,fecha_inicio||'',fecha_fin||'',max_inscritos||50,modalidad||'Presencial',admin_id], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.status(201).json({id:this.lastID});
  });
});

// API: actualizar actividad (admin)
app.put('/api/actividades/:id',(req,res)=>{
  const id = Number(req.params.id);
  const {nombre,descripcion,ects,fecha_inicio,fecha_fin,max_inscritos,modalidad} = req.body;
  if(!nombre) return res.status(400).json({error:'nombre requerido'});
  db.run('UPDATE actividades SET nombre=?,descripcion=?,ects=?,fecha_inicio=?,fecha_fin=?,max_inscritos=?,modalidad=? WHERE id=?',
    [nombre,descripcion||'',ects||0,fecha_inicio||'',fecha_fin||'',max_inscritos||50,modalidad||'Presencial',id], function(err){
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

// API: progreso del usuario
app.get('/api/users/:id/progreso', (req, res) => {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).json({ error: 'ID de usuario requerido' });

    // Asumimos que el status 'completado' significa que los ECTS están ganados.
    const sql = `
        SELECT 
            a.id,
            a.nombre,
            a.descripcion,
            a.ects,
            a.fecha_fin
        FROM inscripcion_actividades ia
        JOIN actividades a ON ia.actividad_id = a.id
        WHERE ia.user_id = ? AND ia.status = 'completado'
    `;

    db.all(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const totalEcts = rows.reduce((sum, act) => sum + (act.ects || 0), 0);
        
        res.json({
            actividadesCompletadas: rows,
            totalEcts: totalEcts
        });
    });
});

// API: inscribir usuario a actividad
app.post('/api/inscribir', (req,res)=>{
  const {user_id, actividad_id} = req.body || {};
  if(!user_id || !actividad_id) return res.status(400).json({error:'user_id y actividad_id requeridos'});
  // Comprobar capacidad
  db.get('SELECT max_inscritos FROM actividades WHERE id = ?', [actividad_id], (err,act)=>{
    if(err) return res.status(500).json({error:err.message});
    if(!act) return res.status(404).json({error:'Actividad no encontrada'});
    db.get('SELECT COUNT(*) as c FROM inscripcion_actividades WHERE actividad_id = ?', [actividad_id], (err2,row)=>{
      if(err2) return res.status(500).json({error:err2.message});
      const inscritos = row.c || 0;
      if(inscritos >= act.max_inscritos) return res.status(409).json({error:'Actividad completa'});
      // Intentar insertar
      db.run('INSERT INTO inscripcion_actividades (user_id, actividad_id) VALUES (?,?)', [user_id, actividad_id], function(err3){
        if(err3){
          if(err3.message && err3.message.includes('UNIQUE')) return res.status(409).json({error:'Ya estás inscrito'});
          return res.status(500).json({error:err3.message});
        }
        const nuevosInscritos = inscritos + 1;
        res.status(201).json({id:this.lastID, inscritos: nuevosInscritos, disponibles: Math.max(0, act.max_inscritos - nuevosInscritos)});
      });
    });
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

// API: obtener lista de inscritos en una actividad (para verificar asistencia)
app.get('/api/admin/actividad/:id/inscritos', (req,res)=>{
  const actividadId = Number(req.params.id);
  db.all(`
    SELECT ia.id as inscripcion_id, u.id as user_id, u.nombre, u.email, ia.inscrito_en, a.asistio, a.creditos_otorgados
    FROM inscripcion_actividades ia
    JOIN users u ON ia.user_id = u.id
    LEFT JOIN asistencias a ON ia.id = a.inscripcion_id
    WHERE ia.actividad_id = ?
    ORDER BY u.nombre
  `, [actividadId], (err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows || []);
  });
});

// API: registrar asistencia de un alumno
app.post('/api/admin/registrar-asistencia', (req,res)=>{
  const {inscripcion_id, user_id, actividad_id, asistio, admin_id} = req.body;
  if(!inscripcion_id || !user_id || !actividad_id || admin_id === undefined) {
    return res.status(400).json({error:'Parámetros requeridos'});
  }

  // Obtener info de la actividad
  db.get('SELECT ects, fecha_fin FROM actividades WHERE id = ?', [actividad_id], (err, actividad)=>{
    if(err) return res.status(500).json({error:err.message});
    if(!actividad) return res.status(404).json({error:'Actividad no encontrada'});

    const creditos = asistio ? (actividad.ects || 0) : 0;

    // Verificar si ya existe registro
    db.get('SELECT id FROM asistencias WHERE inscripcion_id = ?', [inscripcion_id], (err2, existing)=>{
      if(err2) return res.status(500).json({error:err2.message});

      if(existing){
        // Actualizar
        db.run(
          'UPDATE asistencias SET asistio=?, creditos_otorgados=?, verificado_por=?, fecha_verificacion=datetime("now") WHERE inscripcion_id=?',
          [asistio ? 1 : 0, creditos, admin_id, inscripcion_id],
          function(err3){
            if(err3) return res.status(500).json({error:err3.message});
            res.json({ok:true, creditos_otorgados: creditos});
          }
        );
      } else {
        // Insertar
        db.run(
          'INSERT INTO asistencias (inscripcion_id, user_id, actividad_id, asistio, creditos_otorgados, verificado_por, fecha_verificacion) VALUES (?,?,?,?,?,?,datetime("now"))',
          [inscripcion_id, user_id, actividad_id, asistio ? 1 : 0, creditos, admin_id],
          function(err3){
            if(err3) return res.status(500).json({error:err3.message});
            res.json({ok:true, creditos_otorgados: creditos});
          }
        );
      }
    });
  });
});

// API: obtener créditos del usuario (solo los verificados)
app.get('/api/users/:id/creditos', (req,res)=>{
  const userId = Number(req.params.id);
  db.all(`
    SELECT 
      a.nombre,
      a.ects,
      ast.creditos_otorgados,
      ast.fecha_verificacion
    FROM asistencias ast
    JOIN actividades a ON ast.actividad_id = a.id
    WHERE ast.user_id = ? AND ast.asistio = 1
    ORDER BY ast.fecha_verificacion DESC
  `, [userId], (err, rows)=>{
    if(err) return res.status(500).json({error:err.message});
    const totalCreditos = rows.reduce((sum, row) => sum + (row.creditos_otorgados || 0), 0);
    res.json({
      creditosVerificados: rows,
      totalCreditos: totalCreditos
    });
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
