require("dotenv").config();
const { User } = require("../db");
console.log(User);
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const URL = "https://etnia.vercel.app";
const URL = "http://localhost:3031";


const uuid = require("uuid");
const sgMail = require("@sendgrid/mail");

// DEBRIA ENTRAR DESDE .ENV
// ...

const confirmEmailControll = async (req, res) => {
  const { token } = req.params;

  // Busca el usuario en la base de datos por el token de confirmación
  const user = await User.findOne({ where: { confirmationToken: token } });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Token de confirmación no válido." });
  }

  // Marca el correo como confirmado (actualiza el campo de confirmación en tu modelo de datos)
  user.isVerify = true; // Suponiendo que tienes un campo llamado 'confirmationToken'

  // Guarda el usuario actualizado en la base de datos
  try {
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (req, res) => {
  const { name, last_name, phone_number, address, email, password } = req.body;

  // Validación de datos (puedes agregar más validaciones según tus necesidades)
  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error("Este usuario ya está registrado.");
  }

  const confirmationToken = uuid.v4();

  // Almacena el token de confirmación y otros detalles del usuario en la base de datos
  try {
    const newUser = await createusers({
      name,
      last_name,
      phone_number,
      address,
      email,
      password,
      confirmationToken,
    });
    console.log("holaaaaaa")
    console.log({newUser});
    const { SENDGRID_API_KEY } = process.env;
    console.log(SENDGRID_API_KEY);
    sgMail.setApiKey(SENDGRID_API_KEY);
    //sendgrid
    const msg = {
      to: email, // Usar el correo del usuario registrado
      from: "clickyticketg18pf@gmail.com", // Cambiar al remitente verificado
      subject: "Confirmación de Correo Electrónico",
      text: "Confirmación de Correo Electrónico",
      html: `<p style="font-size: 16px; color: #0074d9;">
      Para confirmar tu correo electrónico, haz clic <a href="${URL}/ConfirmTokenForm?token=${confirmationToken}" style="text-decoration: none; color: #ff4136; font-weight: bold;">aquí</a>.
    </p>
    `,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email enviado");
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
      });
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    throw new Error("Error al registrar al usuario.");
  }
};

const getAllUser = async () => {
  const usuariotDB = await User.findAll();
  console.log("lista de todos los usuarios");
  return usuariotDB;
};
const getUsuarById = async (id) => {
  console.log(id)
  const userDB = await User.findByPk(id);
  console.log(userDB)
  return userDB;
};

const getUserByName = async (name) => {
  const userDB = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, // Búsqueda de coincidencia parcial insensible a mayúsculas/minúsculas
      },
    },
  });
  if (userDB.length === 0) {
    return [{ message: "No se encontraron usuarios con la búsqueda." }];
  }

  return userDB;
};

const createusers = async (userData) => {
  try {
    const {
      name,
      last_name,
      phone_number,
      address,
      admin,
      employee,
      email,
      password,
      confirmationToken,
    } = userData;

       //verifica si ya existe
       const userCreated = await User.findOne ({where: {email: email}});
       if(userCreated){
           throw new Error (`Un usuario con ese email ya existe`)
       }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      name,
      last_name,
      phone_number,
      address,
      admin,
      employee,
      email,
      password: hashedPassword,
      confirmationToken,
    });

    return newuser;
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  console.log("Deleting user")
  try {
    const userToDelete = await User.findByPk(id);

    if (!userToDelete) {
      throw new Error(`usero con ID ${id} no encontrado.`);
    }

    await userToDelete.destroy();

    return `user con ID ${id} eliminado exitosamente.`;
  } catch (error) {
    throw error;
  }
};
const updateUserById = async (id, newData) => {
  try {
    const userToUpdate = await User.findByPk(id);
   
    if (!userToUpdate) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }

    // Actualiza los campos del usuario con los nuevos datos
    await userToUpdate.update(newData);

    return userToUpdate;
  } catch (error) {
    throw error;
  }
};

const postRegsiterTercerosController = async (req, res) => {
  console.log("hola desde postRegsiterTercerosController antes del req.body ");
  console.log(req.body);
  console.log(req.body.sub);
  console.log(req.body.email);
  try {
    console.log("hola desde postRegsiterTercerosController");
    const auth0UserId = req.body.sub;
    const emailauth0 = req.body.email;
    // Verifica si auth0UserId está presente antes de realizar la consulta
    if (auth0UserId) {
      let user = await User.findOne({ where: { auth0UserId } });
      if (!user) {
        user = await User.create({ auth0UserId, email: emailauth0 });
      }
      console.log(user); // Imprime el usuario después de definirlo
      res.send(user);
      console.log("hola desde el indexdOS");
    } else {
      // Si auth0UserId está vacío, responde con un mensaje indicando el problema.
      res.status(400).send({ error: "auth0UserId no presente en la solicitud." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Hubo un problema al intentar autenticar al usuario." });
  }
};




const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Correo electrónico o contraseña inválidos" });
    }
    const userId = user.id;
    const userEmail = user.email;
    
    const passwordMatch = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (passwordMatch) {
      // La contraseña proporcionada coincide con la contraseña almacenada en la base de datos
      const token = jwt.sign({ userId: user.dataValues.id }, "your_jwt_secret"); // Reemplaza 'your_jwt_secret' por tu clave JWT real
      res.json({ token, userId, userEmail });
    } else {
      // Las contraseñas no coinciden
      return res
        .status(400)
        .json({ error: "Correo electrónico o contraseña inválidos" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
module.exports = {
  registerUser,
  getAllUser,
  getUsuarById,
  getUserByName,
  createusers,
  deleteUserById,
  updateUserById,
  loginUser,
  confirmEmailControll,
  postRegsiterTercerosController
};
