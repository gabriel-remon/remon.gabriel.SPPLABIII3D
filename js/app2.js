import { Anuncio_mascota } from "./mascotas.js";
import { CrearTabla,spinner } from "./dibujos.js";


const $divTabla = document.getElementById("tabla"); 
const $divChecks = document.querySelectorAll("main div")[0]
const $checks = document.querySelectorAll("input");
const $lista =[];
let $listaFiltrada =[];
const $inputPromedio = document.getElementById("promedio");
const $select = document.getElementById("tipo");

function actualizar(){
    limpiarHijos();
    Anuncio_mascota.getServer((data)=>{
        data.forEach(element => {
            $lista.push(element);
        });
        $divTabla.appendChild(CrearTabla(data));
        $inputPromedio.value = promedio();
    },()=>{
        $divTabla.appendChild(spinner("./imagenes/spinner.gif"));
    },limpiarHijos)
}

actualizar();

function limpiarHijos()
{
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstChild);
    }
}
$checks.forEach(e=>e.addEventListener("change",actualizar2));

function actualizar2(){
    $listaFiltrada = $lista.map((elemento,i)=>
    {
        console.log($checks[1]);
        let item = {id:elemento.id}
        if($checks[1].checked) item.titulo=elemento.titulo;
        if($checks[2].checked) item.animal=elemento.animal;
        if($checks[3].checked) item.descripcion=elemento.descripcion;
        if($checks[4].checked) item.precio=elemento.precio;
        if($checks[5].checked) item.raza=elemento.raza;
        if($checks[6].checked) item.edad=elemento.edad;
        if($checks[7].checked) item.vacunado=elemento.vacunado;
        return item;
    })
    limpiarHijos();

    $divTabla.appendChild(CrearTabla($listaFiltrada));
}

function promedio(condicion){
    let total;
    if(condicion== null ||condicion=="todo" )
    {
       total= $lista.reduce((acum,element)=>acum+parseFloat(element.precio),0);
       return total / $lista.length;
    }
    else
    {
        total= $lista.reduce((acum,element)=>element.animal==condicion?acum+parseFloat(element.precio):acum,0);
        return total / $lista.reduce((acum,element)=>element.animal==condicion?acum+1:acum,0)
    }
}

$select.addEventListener("change",()=>
{
    $inputPromedio.value= promedio($select.value);
})
