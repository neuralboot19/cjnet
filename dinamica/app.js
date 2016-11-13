var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/cjnet")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Definir el schema de nuestros servicios.
var servicioSquema = {
	title:String,
	description:String,
	imageUrl:String,
	pricing: Number
};

var Servicio = mongoose.model("Servicio", servicioSquema);

app.set("view engine","jade");

app.use(express.static("public"));

app.get('/',function(solicitud,respuesta){

	/* var data = {
		title: "Servicios",
		description: "Mantenimiento, Formateos entre otros.",
		imageUrl: "servicio.png",
		pricing: 5000
	}

	var service = new Servicio(data);

	service.save(function(err){
		console.log(service);
	}); */

	respuesta.render("index"); //res.end("Hola mundo");
});

app.post("/servicios",function(solicitud,respuesta){
	if (solicitud.body.password == "1234") {
		var data = {
			title: solicitud.body.title,
			description: solicitud.body.description,
			imageUrl: "servicio.png",
			pricing: solicitud.body.pricing
		}

		var service = new Servicio(data);

		service.save(function(err){
			console.log(service);
			respuesta.render("index");
		});
	}else{
		respuesta.render("servicios/new")
	}
});

app.get('/servicios/new',function(solicitud,respuesta){

	respuesta.render("servicios/new")

})

//HTTP
	//Metodos
		//GET
		//POST

app.listen(8080);