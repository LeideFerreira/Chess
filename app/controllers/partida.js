const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('partida/index', {
        conteudo: conteudo,
        layout:'main'
    });
};
const game = (req, res) => {

  if (!req.params.color) {

    res.render('partida/choosecolor');

  } else {

    res.render('partida/game', {
      color: req.params.color,      
      partida: 1
    });
    
  }  
}
const socket = (req, res)=>{
  res.render('partida/socket',{
      layout:'main'
  })
}

module.exports = { socket,index,game}