const URL ="http://localhost:3000/mascotas";

class Anuncio {
    constructor(id, titulo, animal, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.animal = animal;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_mascota extends Anuncio {

    constructor(id, titulo, animal, descripcion, precio, raza, edad, vacunado) {
        super(id, titulo, animal, descripcion, precio);
        this.raza = raza;
        this.edad = edad;
        this.vacunado = vacunado;
    }

    articulo(imgRaza, imgFeha, imgVacuna) {
        const articulo = document.createElement("article")

        const titulo = document.createElement("h3");
        const descripcion = document.createElement("p");
        const precio = document.createElement("p");

        const divEspecificacion = document.createElement("div");

        const imagenRaza = document.createElement("img");
        const spanRaza = document.createElement("span");
        const imagenFeha = document.createElement("img");
        const spanFeha = document.createElement("span");
        const imagenVacuna = document.createElement("img");
        const spanVacuna = document.createElement("span");

        const boton = document.createElement("button");

        articulo.setAttribute("data-id", this.id);

        articulo.classList.add("articulo-mascota");
        boton.classList.add("boton-mascota");
        divEspecificacion.classList.add("especificaciones");
        precio.classList.add("precio-venta");

        titulo.textContent = this.titulo;
        descripcion.textContent = this.descripcion;
        precio.textContent = "$" + this.precio;

        imagenRaza.setAttribute("src", imgRaza)
        imagenFeha.setAttribute("src", imgFeha)
        imagenVacuna.setAttribute("src", imgVacuna)
        spanRaza.textContent = this.raza;
        spanFeha.textContent = this.edad;
        spanVacuna.textContent = this.vacunado;

        boton.textContent = "Ver Mascota";

        divEspecificacion.appendChild(imagenRaza);
        divEspecificacion.appendChild(spanRaza);
        divEspecificacion.appendChild(imagenFeha);
        divEspecificacion.appendChild(spanFeha);
        divEspecificacion.appendChild(imagenVacuna);
        divEspecificacion.appendChild(spanVacuna);

        articulo.appendChild(titulo);
        articulo.appendChild(descripcion);
        articulo.appendChild(precio);
        articulo.appendChild(divEspecificacion);
        articulo.appendChild(boton);

        return articulo;
    }

    pushLS() {
        let data = JSON.parse(localStorage.getItem("mascotas"));

        if (data == null) {
            data = [];
        }
        data.push(this);
        localStorage.setItem("mascotas", JSON.stringify(data))
    }

    async pushServer(respuesta, espera) {
        const xhr = new XMLHttpRequest();
        envioPeticion(xhr, respuesta, espera);
        xhr.open("POST", URL);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(this));
    }

    async pushServer2(respuesta, espera) {
        const xhr = new XMLHttpRequest();
        envioPeticion(xhr, respuesta, espera);
        xhr.open("POST", URL);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(this));
    }

    static LeerLS() {
        return JSON.parse(localStorage.getItem("mascotas"));
    }

    static async getServer(respuesta, espera,limpiar) {
        try
        {
            limpiar();
            espera();
            const res = await fetch(URL);
            if(!res.ok)
            {
                throw new Error("codio de error " + res.status + ": " + res.statusText);
            }
            const data = await res.json();
            limpiar();
            respuesta(data);
        }
        catch(err)
        {
            alert(err.message);
        }
    }

    static async deleteIdServer(id,espera,limpiar,respuesta){
        try
        {
            limpiar();
            espera();
            const metodo ={
                method:"DELETE",
            };
            const res = await fetch(URL+"/"+id,metodo);
            if(!res.ok)
            {
                throw new Error("codio de error " + res.status + ": " + res.statusText);
            }
            const data = await res.json();
            limpiar();
            respuesta(data);
        }
        catch(err)
        {
            alert(err.message);
        }
        
    }

    updateIdServer(espera,respuesta){
        const xhr = new XMLHttpRequest();
        envioPeticion(xhr, respuesta, espera);
        xhr.open("PUT", URL+"/"+this.id);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(this));
    }
}

function envioPeticion(xhr, respuesta, espera) 
{
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            (xhr.status >= 200 && xhr.status < 300) ?
                respuesta(JSON.parse(xhr.responseText)) : 
                alert("codio de error " + xhr.status + ": " + xhr.statusText);
        }
        else {
            espera();
        }
    });
}
