package oslometwebpro.wp_oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class TicketController {

    @Autowired
    private TicketRepository rep;

    //Lagrer inputene på server
    @PostMapping("/save")
    public void saveTicket(Ticket ticket) {
        rep.saveTicket(ticket);
    }

    //Henter billettene fra server
    @GetMapping("/hentAlle")
    public List<Ticket> henteAlle(){
        return rep.hentAlleBilletter();
    }

    //Sletter billettene fra server
    @GetMapping("/deleteAll")
    public void deleteAll() {
        rep.deleteAllTickets();
    }
}
