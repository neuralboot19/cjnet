var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require('cloudinary');
var app_password = "1234";

cloudinary.config({
	cloud_name: "cjnetfp",
	api_key: "378612964352182",
	api_secret: "ET6cHxfia-IAcR5GgPYlfBCcKOU"
});

var app = express();

mongoose.connect("mongodb://localhost/cjnet")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer({dest: "./uploads"}));

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
	respuesta.render("index"); //res.end("Hola mundo");
});

app.get('/servicios',function(solicitud,respuesta){
	Servicio.find(function(error,documento){
		if(error){ console.log(error); }
		respuesta.render("servicios/index",{ servicioo: documento })
	});
});

app.get("/servicios/edit/:id",function(solicitud,respuesta){
	var id_servicio = solicitud.params.id;
	console.log(id_servicio);
	Servicio.findOne({"_id": id_servicio},function(error,servicius){
		console.log(servicius);
		respuesta.render("servicios/edit",{ servicioo: documento });
	});
});

app.post("/admin",function(solicitud,respuesta){
	if(solicitud.body.password == app_password) {
		Servicio.find(function(error,documento){
			if(error){ console.log(error); }
			respuesta.render("admin/index", { servicioo: documento })
		});
	}else{
		respuesta.redirect("/");
	}
});

app.get('/admin',function(solicitud,respuesta){
	respuesta.render("admin/form")
});

app.post("/servicios",function(solicitud,respuesta){
	if(solicitud.body.password == app_password) {
		var data = {
			title: solicitud.body.title,
			description: solicitud.body.description,
			imageUrl: "servicio.png",
			pricing: solicitud.body.pricing
		}

		var service = new Servicio(data);

		cloudinary.uploader.upload(solicitud.files.image_avatar.path,
			function(result) {
				service.imageUrl = result.url;

				service.save(function(err){
					console.log(service);
					respuesta.render("index");
				});
			}
		);

		/*service.save(function(err){
			console.log(service);
			respuesta.render("index");
		}); */
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