module.exports = function (app) {
    app.get("/about", function (req, res) {
        const conteudo = 'Página sobre a aplicação';
        res.render('about', {
            conteudo: conteudo,
            message: 'Olá, entrou a view About',
            layout: 'main',
        });
    });
};