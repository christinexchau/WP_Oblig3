
//Funksjon som registrerer billetten
function regTicket () {
    const oneTicket = {
        movie: $('#movie').val(),
        quantity: $('#quantity').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        phonenumber: $('#phonenumber').val()
    };

    //Legger til valideringsinputer
    if(Object.values(oneTicket).includes("") || oneTicket.movie === "Choose a movie here") {
        if (oneTicket.quantity === "") {
            $("#quantityError").html("You are missing the number of tickets");
        } else {
            $("#quantityError").html("");
        }
        if (oneTicket.firstName === "") {
            $("#firstNameError").html("You are missing your first name")
        } else {
            $("#firstNameError").html("");
        }
        if (oneTicket.lastName === "") {
            $("#etternavnFeil").html("You are missing your last name")
        } else {
            $("#etternavnFeil").html("");
        }
        if (oneTicket.email === "" || !validEmail(oneTicket.email)) {
            $("#emailError").html("You must write a valid email")
        } else {
            $("#emailError").html("");
        }
        if (oneTicket.phonenumber === "" || oneTicket.phonenumber.length !== 8) {
            $("#phonenumberError").html("You must write a valid phonenumber")
        } else {
            $("#phonenumberError").html("");
        }
    } else {

        //Lagrer inputene inni server
        $.post("/storage", oneTicket, function () {
            insertAll();
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
function insertAll() {
    $.get("/hentAlle", function (tickets) {
        formaterData(tickets);
    });
}

//Viser fram inputene i en tabell
function formaterData(tickets) {
    let ut = "<table class='table table-striped'><tr><th>Movie</th><th>Quantity</th><th>FirstName</th>" +
        "<th>LastName</th><th>Email</th><th>Phonenumber</th></tr>";
    for (const ticket of tickets) {
        ut += "<tr><td>" + ticket.movie
            + "</td><td>" + ticket.quantity
            + "</td><td>" + ticket.firstName
            + "</td><td>" + ticket.lastName
            + "</td><td>" + ticket.email
            + "</td><td>" + ticket.phonenumber
            + "</td></tr>";
    }
    ut += "</table>";
    $("#tickets").html(ut);
}

//Funksjon som sletter alle billetter
function deleteAll() {
    $.get("/deleteAll", function () {
        insertAll();
    });
}

//Validering for gyldig epost
function validEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
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