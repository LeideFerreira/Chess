module.exports = function(app){
app.get("/about",function(req,res){
    res.render('about',{
        message:'Olá, entrou a view About',
        layout: false,
    });
});
};