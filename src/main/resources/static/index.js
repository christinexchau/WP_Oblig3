
//Funksjon som registrerer billetten
function regBillett () {
    const oneTicket = {
        movie: $('#movie').val(),
        quantity: $('#quantity').val(),
        fornavn: $('#fornavn').val(),
        etternavn: $('#etternavn').val(),
        epost: $('#epost').val(),
        telefonnr: $('#telefonnr').val()
    };

    //Legger til valideringsinputer
    if(Object.values(oneTicket).includes("") || oneTicket.movie === "Velg film her") {
        if (oneTicket.quantity === "") {
            $("#antallFeil").html("Du mangler å skrive inn antall");
        } else {
            $("#antallFeil").html("");
        }
        if (oneTicket.fornavn === "") {
            $("#fornavnFeil").html("Du mangler fornavn")
        } else {
            $("#fornavnFeil").html("");
        }
        if (oneTicket.etternavn === "") {
            $("#etternavnFeil").html("Du mangler etternavn")
        } else {
            $("#etternavnFeil").html("");
        }
        if (oneTicket.epost === "" || !gyldigEpost(oneTicket.epost)) {
            $("#epostFeil").html("Du må skrive inn en gyldig epost")
        } else {
            $("#epostFeil").html("");
        }
        if (oneTicket.telefonnr === "" || oneTicket.telefonnr.length !== 8) {
            $("#telefonnrFeil").html("Du må skrive inn et gyldig telefonnummer")
        } else {
            $("#telefonnrFeil").html("");
        }
    } else {

        //Lagrer inputene inni server
        $.post("/lagre", enBillett, function () {
            hentAlle();
        });
        //Tømmer inputene
        $("#movie").val("");
        $("#number").val("");
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $('#phonenumber').val("");
    }
}
function hentAlle() {
    $.get("/hentAlle", function (billetter) {
        formaterData(billetter);
    });
}

//Viser fram inputene i en tabell
function formaterData(tickets) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Epost</th><th>Telefonnummer</th></tr>";
    for (const ticket of tickets) {
        ut += "<tr><td>" + ticket.movie
            + "</td><td>" + ticket.
            + "</td><td>" + ticket.firstName
            + "</td><td>" + ticket.etternavn
            + "</td><td>" + ticket.epost
            + "</td><td>" + ticket.telefonnr
            + "</td></tr>";
    }
    ut += "</table>";
    $("#billettene").html(ut);
}

//Funksjon som sletter alle billetter
function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
}

//Validering for gyldig epost
function gyldigEpost(epost) {
    const epostRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    return epostRegex.test(epost);
}

/*
Validering for gyldig telefonnr

function gyldigTelefon(telefonnr) {
    const telefonRegex = /^(4[0-9]{7}|9[0-9]{7})$/;
    return telefonRegex.test(telefonnr);
}

Denne funksjonen funker merkelig nok ikke, og det samme gjelder if-setningen:
 enBillett.telefonnr.length != 8
 !gyldigTelefon(enBillett.telefonnr)

Jeg har også fått hjelp hos Orakel, og de fikk det heller ikke til.
Ellers funker if-setningen når inputfelten er tom.

 */