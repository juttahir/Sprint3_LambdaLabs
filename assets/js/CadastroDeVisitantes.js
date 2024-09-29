function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document
    .querySelector("#botao-cadastrar")
    .addEventListener("click", (event) => {
        event.preventDefault()

        const form = document.querySelector("form")

        const visitante = {
            id: uuidv4(),
            nome: form.nome.value,
            sobrenome: form.sobrenome.value,
            empresa: form.empresa.value,
            reserva: form.reserva.value,
            dataReserva: form.dataReserva.value
        }

        console.log(form.nome.value)

        if(visitante.nome && 
            visitante.sobrenome &&
            visitante.empresa &&
            visitante.reserva &&
            visitante.dataReserva
        ){
            console.log("Funcionou")
            salvar(visitante)
        }
    })

function salvar(visitante){
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || []
    visitantes.push(visitante)
    localStorage.setItem("visitantes", JSON.stringify(visitantes))

    window.location = "Consulta.html"
}