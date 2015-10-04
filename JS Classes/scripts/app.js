//listas de trabajadores y estudiantes
var trabajadores = [];
var estudiantes = [];

//clase Persona
function Persona(nombre, edad) {
    this.nombre = nombre || "Fran";
    this.edad = edad || 20;
    this.mostrarDatos = function () {
        return "Me llamo " + this.nombre + " y tengo " + this.edad + " años";
    }
}

//clase Trabajador
function Trabajador(nombre, edad, puesto, salario) {
    Persona.call(this, nombre, edad);
    this.puesto = puesto || "Desarrollador";
    this.salario = salario || "1950";
}

//clase Estudiante
function Estudiante(nombre, edad, carrera, nota) {
    Persona.call(this, nombre, edad);
    this.carrera = carrera || "MCSD";
    this.nota = nota || "8";
}



//Trabajador hereda de Persona todas sus propiedades y funciones (incluso su constructor)
Trabajador.prototype = new Persona;
//por eso se sobreescribe el constructor heredado por el de Trabajador
Trabajador.prototype.constructor = Trabajador;

//misma operacion pero con la clase Estudiante
Estudiante.prototype = new Persona;
Estudiante.prototype.constructor = Estudiante;

//se añade una funcion a la clase Estudiante
Estudiante.prototype.mostrarDatosEstudiante = function () {
    return "Me llamo " + this.nombre + ", tengo " + this.edad + " años y estoy estudiando " + this.carrera + " con una calificación de " + this.nota;
}

function addTrabajador() {
    //obtencion de datos
    var nombre = $("#tNombre").val();
    var edad = $("#tEdad").val();
    var puesto = $("#tPuesto").val();
    var salario = $("#tSalario").val();

    //creacion de objeto Trabajador y añadido a la lista de trabajadores
    var t = new Trabajador(nombre, edad, puesto, salario);
    trabajadores.push(t);
    //actualiza su tabla
    refresTable("t");
}

function addEstudiante() {
    //obtencion de datos
    var nombre = $("#eNombre").val();
    var edad = $("#eEdad").val();
    var carrera = $("#eCarrera").val();
    var nota = $("#eNota").val();

    //creacion de objeto Estudiante y añadido a la lista de estudiantes
    var e = new Estudiante(nombre, edad, carrera, nota);
    estudiantes.push(e);
    refresTable("e");
}


function refresTable(tabla) {
    var lista;
    //selecciona la zona en la que se insertaran los datos tContentZone / eContentZone
    var z = $("#" + tabla + "ContentZone");

    if (tabla === "t")
        lista = trabajadores;
    else
        lista = estudiantes;
    //vacia su contenido
    $(z).html("");
    for (var i = 0; i < lista.length; i++) {
        $("<tr>" +
            "<td>" + lista[i].nombre + "</td>" +
            "<td>" + lista[i].edad + "</td>" +
            //si es trabajador obtiene sus propiedades
            (tabla === "t" ? "<td>" + lista[i].puesto + "</td>" + "<td>" + lista[i].salario + "€</td>" :
            //si es estudiante, las suyas
            "<td>" + lista[i].carrera + "</td>" + "<td>" + lista[i].nota + "</td>") +
            "</tr>").appendTo(z);
    }
}

$(document).ready(function () {

    var e1 = new Estudiante("Fran", 20, "MCSD", 9);

    console.log(e1.mostrarDatosEstudiante());
    $("#tBtn").click(addTrabajador);
    $("#eBtn").click(addEstudiante);
})