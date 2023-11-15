/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
export default function Validation(input){
console.log(input)
const errors={}

// Name
if(!input.name){errors.name = "Este campo es obligatorio"};
if(input.name.length > 100){errors.name = "El nombre debe estar por debajo de 100 caracteres"};

// Description

if(input.description.length > 250){errors.description = "Hasta 250 caracteres"};

// Color
if(!input.color){errors.color="Este campo es obligatorio"};
// Brand
if (!input.brand.trim()) {errors.brand = 'Este campo es obligatorio';}
// Price
if(!input.price){errors.price="Seleccione un precio"};

// Category
if (!input.category.trim()) {  errors.category = 'Este campo es obligatorio'};

// Genero
if (input.gender != "female" && input.gender != "male") {  errors.gender = 'Seleccione un género'};

// Imagen
if(!input.img) {errors.image="Seleccione una imagen para su producto"}






return errors;
}