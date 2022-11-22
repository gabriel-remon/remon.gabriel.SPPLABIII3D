export const validarCampoVacio = (e) => {
    const input = e.target;
    input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
  };

  export const validarLongitud = (e) => {
    const input = e.target;
    input.value.trim().length<=25 ? clearError(input) : setError(input, "maximo 25 caracteres");
  };

  export const ValidarPrecio = (e) => {
    const input = e.target;
    input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
    const numero = parseInt(e.target.value);
    if(Number.isInteger(numero) && numero>=0 && numero<=50000)  {clearError(input); e.target.value = parseInt(e.target.value)}else setError(input, "Deve ser un valor entre 0 y 50.000");
  };


const setError = (input, mensaje) => {
    
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || `${input.name} requerido`;
  $small.classList.add("danger");

input.classList.remove("inputOk");
input.classList.add("inputError");
};
const clearError = (input) => {
    
  const $small = input.nextElementSibling;
  $small.textContent = "";
  $small.classList.remove("danger");

  input.classList.remove("inputError");
  input.classList.add("inputOk");
};
