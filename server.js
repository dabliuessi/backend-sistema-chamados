import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

// Rotas
import authRoutes from './routes/authRoutes.js';
import chamadoRoutes from './routes/chamadoRoutes.js';

// Models (para garantir que as associações sejam carregadas)
import './models/index.js';

dotenv.config();
const app = express();

app.use(express.json()); // essencial para req.body
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
app.use('/auth', authRoutes);
app.use('/chamados', chamadoRoutes);

// Testar conexão com o banco e iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com banco estabelecida!');

    await sequelize.sync({ alter: true });
    console.log('📦 Models sincronizados');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar no banco:', err);
  }
}

startServer();
