/*Se toman los datos de la Api Fetch*/

const obtenerDatosUsuarios = (url = "https://reqres.in/api/users?delay=3") => {
let caducidadFecha = localStorage.getItem("fecha-termino");
    if (Object.is(null, caducidadFecha) || (new Date().getTime() > caducidadFecha)) {

        fetch(url)
            .then(response => { return response.json() })
            .then(users => {
                localStorage.setItem("savedUsers", JSON.stringify(users.data));
                localStorage.setItem("fecha-termino", (new Date().getTime()) + 60000);
                imprimirDatos();
            })

            .catch(error => {
                console.log(error);
            })
    }
    else {
        imprimirDatos();
    }
}

function imprimirDatos() {    /*Para los datos */
    const carousel = document.getElementById("carousel");
    const datos = JSON.parse(localStorage.getItem("savedUsers"));
    carousel.innerHTML="";
    for (let index = 0; index < datos.length; index++) {
        if (index == 0) {
            carousel.innerHTML += /* Se extrae y se le da posicionamiento al avatar y a los datos*/
                `   <div class="carousel-item active"> 
                        <div class="row ">
                            <div class="responsive text-center">
                            <img src="${datos[index].avatar}" class="img-fluid" alt="pixels">           
                            </div>
                            <div class="container-fluid">
                                    <dl>
                                    <dt>ID: ${datos[index].id}</dt>
                                    <dt>E-mail: ${datos[index].email}</dt>
                                    <dt>Nombre: ${datos[index].first_name}</dt>
                                    <dt>Apellido: ${datos[index].last_name}</dt>
                                    </dl>
                            </div>
                        </div>
                    </div>`;
        }
        else {
            carousel.innerHTML +=
                `   <div class="carousel-item">
                               <div class="row ">
                                   <div class="container-fluid text-center">
                                   <img src="${datos[index].avatar}" class="img-fluid" alt="pixels">           
                                   </div>
                                   <div class="container-fluid">
                                           <dl>
                                           <dt>ID: ${datos[index].id}</dt>
                                           <dt>E-mail: ${datos[index].email}</dt>
                                           <dt>Nombre: ${datos[index].first_name}</dt>
                                           <dt>Apellido: ${datos[index].last_name}</dt>
                                           </dl>
                                   </div>
                               </div>
                           </div>`;
        }
    }
}