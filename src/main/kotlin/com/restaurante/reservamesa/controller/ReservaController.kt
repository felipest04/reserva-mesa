import com.restaurante.reservamesa.model.Reserva
import com.restaurante.reservamesa.service.ReservaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reservas")
class ReservaController(private val service: ReservaService) {

    @GetMapping
    fun listar(): ResponseEntity<List<Reserva>> =
        ResponseEntity.ok(service.listar())

    @PostMapping
    fun salvar(@RequestBody reserva: Reserva): ResponseEntity<Reserva> =
        ResponseEntity.ok(service.salvar(reserva))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
