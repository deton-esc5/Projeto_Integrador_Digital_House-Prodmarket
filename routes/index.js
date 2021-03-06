var express = require('express');
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController');
const loginController = require('../controllers/loginController');
var router = express.Router();
const {check, validationResult, body } = require('express-validator');
const contatoController = require('../controllers/contatoController');
const categoriaController = require('../controllers/categoriaController');
const carrinhoController = require('../controllers/carrinhoController');
const auth = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');


/* GET home page. */
router.get('/', produtoController.homeCard);

router.get('/contato', contatoController.viewContato);
router.post('/contato', contatoController.sendContato);

router.get('/cadastro_usuario', usuarioController.create);
router.post('/cadastro_usuario', uploadMiddleware, [
            check('tipo').isIn(['Comprar', 'Vender']),
            check('nome').isLength({min:1}).withMessage('Campo "Nome Empresarial" Obrigatório'),
            check('cnpj').isLength({min:1}).withMessage('Campo "CNPJ" Obrigatório'),
            check('ramo').isLength({min:1}).withMessage('Campo "Ramo de Atividade" Obrigatório'),
            check('telefone').isLength({min:1}).withMessage('Campo "Telefone" Obrigatório'),
            check('email').isEmail().withMessage('Campo "e-mail" Obrigatório'),
            check('password').isLength({min:1}).withMessage('Campo "Senha" Obrigatório'),
            check('responsavel').isLength({min:1}).withMessage('Campo "Nome do Responsável" Obrigatório'),
            check('endereco').isLength({min:1}).withMessage('Campo "Endereço" Obrigatório'),
            check('cep').isLength({min:1}).withMessage('Campo "CEP" Obrigatório'),
            check('estado').isLength({min:1}).withMessage('Campo "Estado" Obrigatório'),
],
usuarioController.store);

router.get('/cadastro_produto', auth, produtoController.create);
router.post('/cadastro_produto', auth,uploadMiddleware, [
            check('categoria').isLength({min:1}).withMessage('Campo "Categoria" Obrigatório'),
            check('nome').isLength({min:1}).withMessage('Campo "Nome" Obrigatório'),
            check('tipo').isLength({min:1}).withMessage('Campo "Tipo" Obrigatório'),
            check('quantidade').isLength({min:1}).withMessage('Campo "Quantidade" Obrigatório'),
            check('valor').isLength({min:1}).withMessage('Campo "Valor" Obrigatório'),
],
produtoController.store);

router.get('/login',loginController.loginview);
router.post('/login',loginController.login);

router.get('/parceiros', function(req, res, next) {
  res.render('parceiros',{usuario: req.session.usuario})
});

router.get('/sobrenos', function(req, res, next) {
  res.render('sobrenos',{usuario: req.session.usuario})
});

router.get('/seguranca', function(req, res, next) {
  res.render('seguranca_privacidade',{usuario: req.session.usuario})
});

router.get('/termos', function(req, res, next) {
  res.render('termos_garantias',{usuario: req.session.usuario})
});

router.get('/faq', contatoController.viewFaq);
router.post('/faq', contatoController.sendFaq);

// router.get('/produto', function(req, res, next) {
//   res.render('produto')
// });

router.get('/produto/:id', auth, produtoController.comprarProduto);

router.get('/lista_editar_produto/', auth, produtoController.listaProduto);
router.get('/editar/:id', auth, produtoController.editarProduto);
router.post('/editar/:id', uploadMiddleware, auth, produtoController.atualizaProduto);
router.delete('/produto/:id/eliminar', auth, produtoController.destroy);

router.get('/produtores', usuarioController.produtoresCard);

router.get('/produtor',  auth, produtoController.minhaLoja);

router.get('/carrinho', auth, carrinhoController.viewCarrinho);

router.get('/logout', auth, loginController.logout);

router.get('/:categoria', categoriaController.viewCategoria);




module.exports = router;
