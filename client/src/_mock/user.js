// import { sample } from 'lodash';

// JSON con la información de los usuarios
const usersJSON = {
  "users": [
    {
      "name": "John",
      "last_name": "Doe",
      "address": "123 Main St",
      "admin": true,
      "employee": false,
      "email": "john@example.com", 
      "password": "password123",
      "phone_number": 1234567890
    },
    {
      "name": "Alice",
      "last_name": "Smith",
      "address": "456 Elm St",
      "admin": false,
      "employee": true,
      "email": "alice@example.com",
      "password": "password456",
      "phone_number": 9876543210
    },
    {
      "name": "Bob",
      "last_name": "Johnson",
      "address": "789 Oak St",
      "admin": true,
      "employee": false,
      "email": "bob@example.com",
      "password": "password789",
      "phone_number": 5551234567
    },
    {
      "name": "Eve",
      "last_name": "Williams",
      "address": "101 Pine St",
      "admin": false,
      "employee": true,
      "email": "eve@example.com",
      "password": "password1234",
      "phone_number": 7778889999
    }
  ]
};

export const users = usersJSON.users.map((user, index) => ({
  id: index, // Asigna un ID único (puede ser simplemente el índice)
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: user.name,
  company: user.last_name,
  isVerified: user.admin,
  status: user.employee ? 'active' : 'banned',
  role: 'Role personalizado' // Puedes establecer el rol según tus necesidades
}));
