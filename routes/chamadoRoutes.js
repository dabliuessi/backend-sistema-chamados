import express from 'express';
import { abrirChamado, verMeusChamados, verTodosChamados, atualizarStatus, excluirChamado, editarChamado } from '../controllers/chamadoController.js';
import autenticar from '../middleware/autenticar.js';

const router = express.Router();

router.use(autenticar);
router.post('/', abrirChamado);
router.get('/meus', verMeusChamados);
router.get('/todos', verTodosChamados);
router.patch('/:id/status', atualizarStatus);
router.delete('/:id', excluirChamado);
router.put('/:id', editarChamado);

export default router;
