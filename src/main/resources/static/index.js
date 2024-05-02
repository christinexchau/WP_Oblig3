
//Funksjon som registrerer billetten
function regBillett () {
    const enBillett = {
        film: $('#film').val(),
        antall: $('#antall').val(),
        fornavn: $('#fornavn').val(),
        etternavn: $('#etternavn').val(),
        epost: $('#epost').val(),
        telefonnr: $('#telefonnr').val()
    };

    //Legger til valideringsinputer
    if(Object.values(enBillett).includes("") || enBillett.film === "Velg film her") {
        if (enBillett.antall === "") {
            $("#antallFeil").html("Du mangler å skrive inn antall");
        } else {
            $("#antallFeil").html("");
        }
        if (enBillett.fornavn === "") {
            $("#fornavnFeil").html("Du mangler fornavn")
        } else {
            $("#fornavnFeil").html("");
        }
        if (enBillett.etternavn === "") {
            $("#etternavnFeil").html("Du mangler etternavn")
        } else {
            $("#etternavnFeil").html("");
        }
        if (enBillett.epost === "" || !gyldigEpost(enBillett.epost)) {
            $("#epostFeil").html("Du må skrive inn en gyldig epost")
        } else {
            $("#epostFeil").html("");
        }
        if (enBillett.telefonnr === "" || enBillett.telefonnr.length !== 8) {
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
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#epost").val("");
        $('#telefonnre').val("");
    }
}
function hentAlle() {
    $.get("/hentAlle", function (billetter) {
        formaterData(billetter);
    });
}

//Viser fram inputene i en tabell
function formaterData(billetter) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Epost</th><th>Telefonnummer</th></tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film
            + "</td><td>" + billett.antall
            + "</td><td>" + billett.fornavn
            + "</td><td>" + billett.etternavn
            + "</td><td>" + billett.epost
            + "</td><td>" + billett.telefonnr
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