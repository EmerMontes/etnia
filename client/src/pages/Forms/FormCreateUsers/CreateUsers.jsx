/* eslint-disable jsx-a11y/label-has-associated-control */
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import './User.css';
import validate from "./validate";
import { createUser } from "../../../redux/actions";
import primeraMayuscula from "../../../functions/primeraMayuscula";


   
const CreateUser = () => {
    
    const dispatch = useDispatch();
    
    const [errorSubmit,setErrorSubmit] = useState("");
    
    const [input, setInput] = useState({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        password: '',
        password1: '',
        employee: '',
        admin: '',
        confirmationToken: ''
    })
    
    const [errors, setErrors] = useState({
        name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address:'',
        password: '',
        password1: '',
        employee: '',
        admin:'',
        confirmationToken: ''
    })
    
      useEffect(() => {
       
      }, [dispatch])
    
      const handleChange = (evento) => {
        setInput({
          ...input,
          [evento.target.name]: evento.target.value
        })
        setErrors(
          validate({
            ...input,
            [evento.target.name]: evento.target.value
          })
        )
        setErrorSubmit("");
      }

      const mostrarAlertaExitosa = () => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'El usuario ha sido creado',
        });
      };
    
      const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
          
          const long = Object.values(errors);
          if (long.length === 0) {
            input.name= primeraMayuscula(input.name)
            input.last_name= primeraMayuscula(input.last_name)
            if(input.employee ==="employee") {input.employee=true}
            else { input.employee= false}
            if(input.admin ==="admin")  {input.admin=true}
            else {input.admin= false}
            console.log(input)   
            await dispatch(createUser(input))
            mostrarAlertaExitosa();
            setInput({name:'', last_name: '', email:'', address:'', phone_number: '',
                      password: '', password1: '', employee: '', admin:'',confirmationToken: ''})
            setErrors({name:'', last_name: '', email:'', address:'', phone: '', 
                      password: '', password1: '', employee: '', admin:'', confirmationToken: ''})
            // desmarca todo los checkbox
          for (let i = 0; i < document.f1.elements.length; i +=1) {
            if (document.f1.elements[i].type === 'checkbox') {
            document.f1.elements[i].checked = false;
          }
      }
            
          }else {
            setErrorSubmit("Debe llenar los campos sin errores");
           
          }
        }catch (error) {
          setErrorSubmit(error)

        }
        
      }

      return <div className='Formuser-container'>
      <form  onSubmit={handleSubmit} name ="f1">
      <div className='formusertitle'>
      <h3 className="userTitle"> Crear un usuario</h3>
      <div className="formuser">
      
        <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" name ="name" id="name" value={input.name} onChange ={handleChange}
        className = {errors.name && 'warning'}/>
        {errors.name && <p className ='danger'>{errors.name}</p>}
        </div>

        <div>
        <label htmlFor="last_name">Apellido:</label>
        <input type="text" name ="last_name" id="last_name" value={input.last_name} onChange ={handleChange}
        className = {errors.last_name && 'warning'}/>
        {errors.last_name && <p className ='danger'>{errors.last_name}</p>}
        
        </div>
        
        <div>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id = "email" value={input.email} onChange = {handleChange}
        className = {errors.email && 'warning'}/>
        {errors.email && <p className ='danger'>{errors.email}</p>}
        </div>

        <div>
        <label htmlFor="phone">Teléfono:</label>
        <input type="text" name="phone_number" id="phone_number" value={input.phone_number} onChange = {handleChange}/>
        {errors.phone && <p className ='danger'>{errors.phone}</p>}
        </div>
       
        <div>
        <label htmlFor="address">Dirección:</label>
        <input type="text" name="address" value={input.address} onChange = {handleChange}/>
        {errors.address && <p className ='danger'>{errors.address}</p>}
        </div>

        <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" name="password" value={input.password} onChange = {handleChange}/>
        {errors.password && <p className ='danger'>{errors.password}</p>}
        <label htmlFor="password1">Repetir Contraseña:</label>
        <input type="password" name="password1" value={input.password1} onChange = {handleChange}/>
        {errors.password1 && <p className ='danger'>{errors.password1}</p>}
        </div>
        </div>
        </div>
        <div className='empleadoform'>
          <div className='formempleado-group'>
          <input type="checkbox" name="employee" id="employee" value="employee" onChange={handleChange} />
          <label htmlFor="empleado">Empleado</label>
          <input type="checkbox" name="admin" id="admin" value="admin" onChange={handleChange} />
          <label htmlFor="admin">Administrador</label>
          <span className ='danger'>{errorSubmit}</span>
        </div>

        
       
        
        <button className ='userbutton' type="submit" id="submit">Crear Usuario</button>
        </div>
      
        
      </form>
      </div>
    }


export default CreateUser




