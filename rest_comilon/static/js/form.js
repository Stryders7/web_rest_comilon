console.log("Bienvenido, tu archivo esta vinculado.");

//Consola//
const usuarioField = document.querySelector("[name=usuario]");
const nombreField = document.querySelector("[name=nombre]");
const passwordField = document.querySelector("[name=password]");
const password2Field = document.querySelector("[name=password2]");
const correoField = document.querySelector("[name=correo]");
const telefonoField = document.querySelector("[name=telefono]");

usuarioField.addEventListener("blur", function (e) { //Blue guarda en el mismo link las veces que no ingrese el dato correcto//
    const fieldValue = e.target.value;
    if (fieldValue.length < 4 ){
        console.log("Debes escribir un nombre de usuario.")
    }
    else {
        console.log("Su nombre de usuario ha sido guardado correctamente")
    }
})

nombreField.addEventListener("blur", function (e) {
    const fieldValue = e.target.value;
    if (fieldValue.length < 4 ){
        console.log("Debes escribir un nombre de Nombre.")
    }
    else {
        console.log("Su nombre ha sido guardado correctamente")
    }
})

passwordField.addEventListener("blur", function (e) {
    const fieldValue = e.target.value;
    if (fieldValue.length < 6 ){
        console.log("La contraseña debe tener más de 6 digitos.")
    }
    else {
        console.log("Su contraseña ha sido guardado correctamente")
    }
})

password2Field.addEventListener("blur", function (e) {
    const fieldValue = e.target.value;
    if (fieldValue.length < 6 ){
        console.log("La contraseña debe ser igual que la anterior.")
    }
    else {
        console.log("Su contraseña ha sido guardado correctamente")
    }
})

correoField.addEventListener("blur", function (e) {
    const fieldValue = e.target.value;
    if (fieldValue.length < 4 ){
        console.log("Su correo debe tener más de 4 digitos y @.")
    }
    else {
        console.log("Su correo ha sido guardado correctamente")
    }
})

telefonoField.addEventListener("blur", function (e) {
    const fieldValue = e.target.value;
    if (fieldValue.length < 9 ){
        console.log("El telefono solo puede contener numeros y un maximo de 9 digitos.")
    }
    else {
        console.log("Su telefono ha sido guardado correctamente")
    }
})

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,20}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 6 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{9}$/ // 9 numeros.
}     

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});