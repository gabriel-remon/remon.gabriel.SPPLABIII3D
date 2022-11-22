function CrearCabecera(item)
{
    const cabecera = document.createElement("thead");
    const tr = document.createElement("tr");
    for(const key in item)
    {
        if(key ==="id") continue;
        const th = document.createElement("th");
        th.textContent =key;
        tr.appendChild(th);
    }
    cabecera.appendChild(tr);
    cabecera.classList.add("cabecera");
    return cabecera;
}

function crearCuerpo(array)
{
    const cuerpo = document.createElement("tbody");

    array.forEach(element => {
        const fila = document.createElement("tr");
        for(const key in element)
        {
            if(key ==="id") {
                fila.setAttribute("data-id",element[key]);
                continue;
            }
            const td = document.createElement("td");
            td.textContent =element[key];
            fila.appendChild(td);
        }
        fila.classList.add("fila");
        cuerpo.appendChild(fila);
    });
    
    return cuerpo
}

export function CrearTabla(array)
{
    const tabla = document.createElement("table");
    tabla.appendChild(CrearCabecera(array[0]));
    tabla.appendChild(crearCuerpo(array));

    tabla.classList.add("tabla");

    return tabla;
}

export function spinner(imgane)
{
    const spinner = document.createElement("img");
    spinner.setAttribute("src",imgane);
    spinner.classList.add("spinner");
    return spinner;
}