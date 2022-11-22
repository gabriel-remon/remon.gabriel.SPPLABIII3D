import { Anuncio_mascota } from "./mascotas.js";
import { CrearTabla,spinner } from "./dibujos.js";
import { ValidarPrecio,validarCampoVacio,validarLongitud } from "./validaciones.js";

const $form = document.forms[0];
const $divTabla = document.getElementById("tabla"); 
const $constroles = $form.elements;
const $modificar = document.querySelectorAll("button")[1];
const $eliminar = document.querySelectorAll("button")[2];
let idSeleccionado =null;


function actualizar(){
    limpiarHijos();
    Anuncio_mascota.getServer((data)=>{
        limpiarHijos();
        if(data.length ==0)
        {
            const sin = document.createElement("p");
            sin.textContent = "no hay anuncios cargados"
            $divTabla.appendChild(sin);
        }
        else
        {
            $divTabla.appendChild(CrearTabla(data));
        }
    },()=>{
        $divTabla.appendChild(spinner("./imagenes/spinner.gif"));
    })
}

actualizar();

function limpiarHijos()
{
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstChild);
    }
}

function limpiarCampos(e)
{
    const {titulo,descripccion,precio,raza,edad} = e.target;

    titulo.value="";
    descripccion.value="";
    precio.value="";
    raza.value="";
    edad.value="";
    for(const control of $constroles)
    {
        control.classList.remove("inputOk");
    }
}

for(let i=0;i<$constroles.length;i++)
{
    const control = $constroles[i];
    if(control.matches("input") && !control.matches("[type=radio]" ))
    {
        control.addEventListener("blur",validarCampoVacio);
        if(control.matches("[id=titulo]")||control.matches("[id=descripccion]"))
        {
            control.addEventListener("blur",validarLongitud);
        }else if(control.matches("[id=precio]"))
        {
            control.addEventListener("blur",ValidarPrecio);
        }
    }
    //console.log(control);
}


$form.addEventListener("submit",(e)=>{

    e.preventDefault();
    for(const control of $constroles)
    {
        if(control.matches("input")&& !control.matches("[type=radio]")&& !control.classList.contains("inputOk")  )
        {
            return;
        }
    }
    
    const {titulo,animal,descripccion,precio,raza,edad,vacunado} = e.target;
    
    const mascota = new Anuncio_mascota(idSeleccionado,titulo.value,animal.value,descripccion.value,precio.value,raza.value,edad.value,vacunado.value);
    if(e.submitter.id == "modificar" && idSeleccionado!=null)
    {
        limpiarHijos();
        mascota.updateIdServer(()=>$divTabla.appendChild(spinner("./imagenes/spinner.gif")));
    }
    else
    {
        limpiarCampos(e);
        mascota.pushServer();
        actualizar();
    }
});

$divTabla.addEventListener("click",(e)=>{

    const id= e.target.parentElement.getAttribute("data-id");
    if(id!=null)
    {
        
        $form.children[0].elements[0].value=e.target.parentElement.children[0].innerText;
        $form.children[0].elements[1].value=e.target.parentElement.children[2].innerText;
        $form.children[0].elements[4].value=e.target.parentElement.children[3].innerText;
        $form.children[0].elements[5].value=e.target.parentElement.children[4].innerText;
        $form.children[0].elements[6].value=e.target.parentElement.children[5].innerText;
        $form.children[0].elements[7].value=e.target.parentElement.children[6].innerText;
        e.target.parentElement.children[1].innerText =="gato"?
            $form.children[0].elements[3].checked = true:
            $form.children[0].elements[2].checked = true;
        
        for(let i =0;i<=7;i++ )
        {
            $form.children[0].elements[i].classList.add("inputOk");
        }
        idSeleccionado = id;
        $eliminar.classList.add("mostrar");
        $modificar.classList.add("mostrar");
    }
});
$eliminar.addEventListener("click",(e)=>{
    if(idSeleccionado!=null)
    {
        console.log(idSeleccionado);
        limpiarHijos();
        Anuncio_mascota.deleteIdServer(idSeleccionado,()=>$divTabla.appendChild(spinner("./imagenes/spinner.gif")));
        $eliminar.classList.remove("mostrar");
        $modificar.classList.remove("mostrar");
        //actualizar();
    }
});

$modificar.addEventListener("submit",(e)=>{
    if(idSeleccionado!=null)
    {
        //console.log(e);
        //const {titulo,animal,descripccion,precio,raza,edad,vacunado} = e.target;
    
       // const mascota = new Anuncio_mascota(idSeleccionado,titulo.value,animal.value,descripccion.value,precio.value,raza.value,edad.value,vacunado.value);
       // limpiarCampos($form.children);
       // mascota.updateIdServer();
        //const {titulo,transaccion,descripccion,precio,cantBaños,cantAutos,cantDormitorios} = $form.children;
        //const propiedad = new Propiedad(idSeleccionado,titulo.value,transaccion.value,descripccion.value,precio.value,cantBaños.value,cantAutos.value,cantDormitorios.value);
    
        
        //actualizar();
    }
});
