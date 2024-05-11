package oslometwebpro.wp_oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    // Lagrer inputverdinene inni tabellen
    public void saveTicket (Ticket ticket) {
        String sql = "INSERT INTO Ticket (movie, quantity, firstname, lastname, email, phonenumber) VALUES (?,?,?,?,?,?)";
        db.update(sql, ticket.getMovie(),
                ticket.getQuantity(),
                ticket.getFirstName(),
                ticket.getLastName(),
                ticket.getEmail(),
                ticket.getPhonenumber());
    }

    // Legger til en SQL-kommando der brukeren henter alle billetter
    public List<Ticket> hentAlleBilletter() {
        String sql = "SELECT * FROM Ticket";
        List<Ticket> allTickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class));
        return allTickets;
    }

    // Legger til en SQL-kommando der brukeren sletter alle billetter
    public void deleteAllTickets() {
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }
}
