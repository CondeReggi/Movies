const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`;

const IMGPATH = `https://image.tmdb.org/t/p/w1280`;
const BUSCARAPI = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`

const contenedor = document.querySelector(".contenedor");
const formulario = document.getElementById("formulario");
const input = document.getElementById("search");
const logo_inicio = document.getElementById("logo_inicio");

async function obtenerPeliculas(URL){
    const resp = await fetch(URL);
    const respData = await resp.json();

    console.log(respData);

    mostrar_peliculas(respData.results);
}

function mostrar_peliculas(pelicula){
    contenedor.innerHTML = "";

    pelicula.forEach((movie) => {

        const {poster_path, title, vote_average, overview, release_date} = movie;

        if (poster_path != null){
            const elemento_pelicula = document.createElement("div");
            elemento_pelicula.classList.add("pelicula");
    
            elemento_pelicula.innerHTML = `
                <img src="${IMGPATH + poster_path} " alt="${title}">
                <div class="pelicula_info">
                    <div>
                        <h3>${title}</h3>
                        <p>${release_date}</p>
                    </div>
                    <span class="${segun_calificacion(vote_average)}"> ${vote_average} </span>
                </div>
                <div class="descripcion">
                    ${overview}
                </div>
            `;  
    
            contenedor.appendChild(elemento_pelicula);
        }
    });
}

function segun_calificacion(calificacion){
    if (calificacion > 8){
        return 'green';
    }else if (calificacion >= 5){
        return 'organe';
    }else{
        return 'red';
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const Buscador = input.value;

    if ( Buscador ){
        obtenerPeliculas(BUSCARAPI + Buscador);
        input.value = "";
    }
});

logo_inicio.addEventListener("click", () => {
    location.reload();
})

obtenerPeliculas(APIURL);