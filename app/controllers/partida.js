const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('partida/index', {
        conteudo: conteudo,
        layout:'main'
    });
};
const game = (req, res) => {
    res.render('partida/game');
}
const socket = (req, res)=>{
  res.render('partida/socket',{
      layout:'main'
  })
}

module.exports = { socket,index,game}