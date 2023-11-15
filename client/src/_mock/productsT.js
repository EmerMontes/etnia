/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { sample } from 'lodash';

// JSON con la información de los usuarios
const products = [
    {
      "id": 1,
      "name": "SHORT SOLO TONO PRETINA MEDIA CIERRE",
      "brand": "ETNIA",
      "gender": "female",
      "size": "M",
      "color": "Verde Menta",
      "sale": 20,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/141-200x200.png",
      "description": "Licra para mujer",
      "price": "68000",
      "quantity": "12"
    },
    {
      "id": 2,
      "name": "SHORT SOLO TONO PRETINA MEDIA CIERRE",
      "brand": "ETNIA",
      "gender": "female",
      "size": "S",
      "color": "Verde Menta",
      "sale": 20,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/142-100x100.png",
      "description": "Vestido ligero y cómodo para el verano",
      "price": "68000",
      "quantity": "30"
    },
    {
      "id": 3,
      "name": "SHORT SOLO TONO PRETINA ALTA",
      "brand": "ETNIA",
      "gender": "female",
      "size": "L",
      "color": "Palo de Rosa Claro",
      "sale": 0,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
      "description": "Pantalones vaqueros modernos para hombres",
      "price": "70000",
      "quantity": "40"
    },
    {
      "id": 4,
      "name": "SHORT SOLO TONO PRETINA ALTA",
      "brand": "ETNIA",
      "gender": "female",
      "size": "M",
      "color": "Palo de Rosa Claro",
      "sale": 0,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
      "description": "Elegante vestido de noche para ocasiones especiales",
      "price": "70000",
      "quantity": "20"
    },
    {
      "id": 5,
      "name": "SHORT SOLO TONO PRETINA ALTA",
      "brand": "ETNIA",
      "gender": "female",
      "size": "XL",
      "color": "Negro",
      "sale": 0,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
      "description": "Camiseta con diseño gráfico",
      "price": "70000",
      "quantity": "60"
    },
    {
      "id": 6,
      "name": "SHORT SOLO TONO PRETINA ALTA",
      "brand": "ETNIA",
      "gender": "female",
      "size": "S",
      "color": "Negro",
      "sale": 0,
      "category": "licras",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/1-100x100.png",
      "description": "Falda plisada de moda para mujeres",
      "price": "70000",
      "quantity": "35"
    },
    {
      "id": 7,
      "name": "BLUSA SOLO TONO RESORTES",
      "brand": "ETNIA",
      "gender": "female",
      "size": "L",
      "color": "Mora en leche",
      "sale": 1,
      "category": "blusas",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/175-100x100.png",
      "description": "Chaqueta de cuero genuino",
      "price": "60000",
      "quantity": "15"
    },
    {
      "id": 8,
      "name": "BLUSA SOLO TONO RESORTES",
      "brand": "ETNIA",
      "gender": "female",
      "size": "M",
      "color": "Mora en leche",
      "sale": 0,
      "category": "blusas",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/173-100x100.png",
      "description": "Vestido cómodo para uso diario",
      "price": "60000",
      "quantity": "25"
    },
    {
      "id": 9,
      "name": "BLUSA SOLO TONO RESORTES",
      "brand": "ETNIA",
      "gender": "female",
      "size": "XXL",
      "color": "Mora en leche",
      "sale": 0,
      "category": "blusas",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/169-100x100.png",
      "description": "Camiseta de manga larga de calidad",
      "price": "60000",
      "quantity": "70"
    },
    {
      "id": 10,
      "name": "BLUSA SOLO TONO RESORTES",
      "brand": "ETNIA",
      "gender": "female",
      "size": "L",
      "color": "Blanco",
      "sale": 0,
      "category": "blusas",
      "img": "https://etniasportswear.com/wp-content/uploads/2023/04/188-100x100.png",
      "description": "Blusa con estampado floral para mujeres",
      "price": "60000",
      "quantity": "45"
    }
  ];
  
  
  export const product = products.map((user, index) => ({
    id: index, // Asigna un ID único (puede ser simplemente el índice)
    avatarUrl: user.img,
    name: user.name,
    company: user.gender,
    cantidad: user.quantity,
    status: user.price,
    role: user.color// Puedes establecer el rol según tus necesidades
  }));
  