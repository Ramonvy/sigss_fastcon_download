//Script pra download da lista em 'Agendamento de Consulta'

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page, dt_inicial, dt_final){
    //                                      /sigss/consultaRapida/lista?searchFieldBusca=agco.entfNomeMae&searchStringBusca=&searchStringBuscaUsuServico=&filtro%5B0%5D=isFiltrarData%3Atrue&filtro%5B1%5D=dataInicial%3A01%2F01%2F1000&filtro%5B2%5D=dataFinal%3A31%2F12%2F2999&filtro%5B3%5D=isFiltrarIdade%3Afalse&filtro%5B4%5D=idadeInicial%3A&filtro%5B5%5D=idadeFinal%3A&filtro%5B6%5D=isFiltrarDataNasc%3Afalse&filtro%5B7%5D=dataNascInicial%3A&filtro%5B8%5D=dataNascFinal%3A&filtro%5B9%5D=isFiltrarTipoConsulta%3Afalse&filtro%5B10%5D=tipoConsulta%3A&filtro%5B11%5D=isFiltrarTipoTurno%3Afalse&filtro%5B12%5D=tipoTurno%3A&filtro%5B13%5D=isAgendamentoNovo%3Atrue&_search=false&nd=1692372661952&rows=15&page=1&sidx=agco.agcoData&sord=desc

    let data_inicial = dt_inicial.split('/');
    let data_final = dt_final.split('/');

    var theUrl = window.location.origin + '/sigss/consultaRapida/lista?searchFieldBusca=agco.entfNomeMae&searchStringBusca=&searchStringBuscaUsuServico=&filtro%5B0%5D=isFiltrarData%3Atrue&filtro%5B1%5D=dataInicial%3A' + data_inicial[0] + '%2F' + data_inicial[1] + '%2F' + data_inicial[2] + '&filtro%5B2%5D=dataFinal%3A' + data_final[0] + '%2F' + data_final[1] + '%2F' + data_final[2] + '&filtro%5B3%5D=isFiltrarIdade%3Afalse&filtro%5B4%5D=idadeInicial%3A&filtro%5B5%5D=idadeFinal%3A&filtro%5B6%5D=isFiltrarDataNasc%3Afalse&filtro%5B7%5D=dataNascInicial%3A&filtro%5B8%5D=dataNascFinal%3A&filtro%5B9%5D=isFiltrarTipoConsulta%3Afalse&filtro%5B10%5D=tipoConsulta%3A&filtro%5B11%5D=isFiltrarTipoTurno%3Afalse&filtro%5B12%5D=tipoTurno%3A&filtro%5B13%5D=isAgendamentoNovo%3Atrue&_search=false&nd=1692372661952&rows=5000&page=' + page + '&sidx=agco.agcoData&sord=desc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os agendamentos feitos pra todas as datas entre 01/01/1000 e 31/12/2999
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){

        var page = getPage(i, '01/01/1000', '31/12/2999');
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();