/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable perfectionist/sort-imports */
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createLogistica } from "../../../redux/actions";
import validate from "./validate"
import './formTransport.css'
import primeraMayuscula from "../../../functions/primeraMayuscula";


   
const CreateTransport = () => {
    
    const dispatch = useDispatch();
    
    const [errorSubmit,setErrorSubmit] = useState("");
    
    const [input, setInput] = useState({
        name: '',
        location: '',
        email: '',
        phone: '',
        shippingPrice: 0
        
    })
    
    const [errors, setErrors] = useState({
        name: '',
        location: 'default',
        email: '',
        phone: '',
        shippingPrice: 0
       
    })
    
      useEffect(() => {
       
      }, [dispatch])

      const mostrarAlertaExitosa = () => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'La transportadora ha sido creada',
        });
      };
    
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
    
      const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
          console.log(input)
          let long = Object.values(errors);
          if (long.length === 0) {
          input.name = primeraMayuscula(input.name)
          await dispatch(createLogistica(input))
          mostrarAlertaExitosa ()
          setInput({name:'', location: 'default', email:'', phone: '', shippingPrice: 0})
          setErrors({name:'', location: '', email:'', phone: '', shippingPrice: 0})
          
          }else {
            setErrorSubmit("Debe llenar todos los campos sin errores");
           
          }
        }catch (error) {
          setErrorSubmit(error)

        }
        
      }
    
      return <div className="Formtransport-container">
      <form  onSubmit={handleSubmit} name ='form'>
      <h3 className="transportTitle"> Crear Transportadora</h3>
        <div className="formtransport">
           
        
            <div>
                <label>Nombre de la empresa:</label>
                <input type="text" name ="name" id="name" value={input.name} onChange ={handleChange}
                className = {errors.name && 'warning'} />
                {errors.name && <p className ='danger'>{errors.name}</p>}
            </div>

            <div>
                <label >Email:</label>
                <input type="text" name="email" id = "email" value={input.email} onChange = {handleChange}
                className = {errors.birthDay && 'warning'}/>
                {errors.email && <p className ='danger'>{errors.email}</p>}
            </div>

            <div>
                <label >Teléfono:</label>
                <input type="text" name="phone" value={input.phone} onChange = {handleChange}/>
                {errors.phone && <p className ='danger'>{errors.phone}</p>}
            </div>
            <div>
                <label>Locación:</label>
                <select onChange = {handleChange} name ="location" value={input.location}>
                    <option value="default">Seleccione una opción</option>
                    <option value="local" >Local</option>
                    <option value="nacional" >Nacional</option>
                </select>
            </div>
            <div >
                <label >Tarifa:</label>
                <input  type="number" min="0" name="shippingPrice" value={input.shippingPrice} onChange = {handleChange}/>
                <p className ='danger'>{errorSubmit}</p>
            </div>
       
            
            
        </div>
        <button className = 'button' id="submit">Crear Transportadora</button>
              
      </form>
      </div>
    }


export default CreateTransport