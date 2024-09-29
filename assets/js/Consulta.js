const visitantes = JSON.parse(localStorage.getItem("visitantes")) || []

visitantes.forEach( visitante => card(visitante) )

function card(visitante){

        const content = `
        <td>${visitante.nome}</td>
        <td>${visitante.sobrenome}</td>
        <td>${visitante.empresa}</td>
        <td>${visitante.reserva}</td>
        <td>${visitante.dataReserva}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm editar" data-id="${visitante.id}">Editar</button>
            <button type="button" class="btn btn-danger btn-sm excluir" data-id="${visitante.id}">Excluir</button>
        </td>
        `

        const card = document.createElement("tr")
        card.innerHTML = content

    document
        .querySelector("#listaDevisitantes")
        .appendChild(card);
}


// --------- editar ---------
document.querySelectorAll(".editar").forEach(button => {
    button.addEventListener("click", (event) => {
        const visitanteId = event.target.getAttribute("data-id");

        const visitante = encontrarvisitantePorId(visitanteId);
                
        $('#modalEditar').on('shown.bs.modal', function () {
            document.getElementById('nomeEdit').value = visitante.nome;
            document.getElementById('sobrenomeEdit').value = visitante.sobrenome;
            document.getElementById('empresaEdit').value = visitante.empresa;
            document.getElementById('reservaEdit').value = visitante.reserva;
            document.getElementById('dataReservaEdit').value = visitante.dataReserva;
        });
      
        $('#modalEditar').modal('show');
        console.log("Editar visitante com ID:", visitanteId);
        

        $('#salvarAlteracoes').click(function() {
            visitante.nome = $('#nomeEdit').val();
            visitante.sobrenome = $('#sobrenomeEdit').val();
            visitante.empresa = $('#empresaEdit').val();
            visitante.reserva = $('#reservaEdit').val();
            visitante.dataReserva = $('#dataReservaEdit').val();

            let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];

            visitantes = visitantes.map(p => {
                if (p.id === visitanteId) {
                    return visitante;
                } else {
                    return p;
                }
            });

            localStorage.setItem("visitantes", JSON.stringify(visitantes));

            $('#modalEditar').modal('hide');
            window.location = "Consulta.html"
        });

    });
});



// --------- excluir ---------
function encontrarvisitantePorId(id) {
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    return visitantes.find(visitante => visitante.id === id) || null;
}

document.querySelectorAll(".excluir").forEach(button => {
    button.addEventListener("click", (event) => {
        const visitanteId = event.target.getAttribute("data-id");
        const visitante = encontrarvisitantePorId(visitanteId);
        console.log("Excluir visitante com ID:", visitanteId);

        if (confirm("Tem certeza de que deseja excluir o visitante " + visitante.nome + "?")) {
            const index = visitantes.findIndex(visitante => visitante.id === visitanteId);
            
            if (index !== -1) {
                visitantes.splice(index, 1);
                
                localStorage.setItem("visitantes", JSON.stringify(visitantes));
                
                event.target.closest("tr").remove();
                
                console.log("visitante excluído com sucesso:", visitanteId.nome);
            } else {
                console.error("visitante não encontrado:", visitanteId.nome);
            }
        }
    });
});

$(document).ready(function(){
    $('#searchInput').keyup(function(){
        var searchText = $(this).val().toLowerCase();
        $('#example tbody tr').each(function(){
            var currentRowText = $(this).text().toLowerCase();
            if(currentRowText.indexOf(searchText) !== -1){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});