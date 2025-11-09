package com.restaurante.reservamesa.controller

import com.restaurante.reservamesa.model.HorarioFuncionamento
import com.restaurante.reservamesa.service.HorarioFuncionamentoService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.DayOfWeek

@RestController
@RequestMapping("/api/horarios")
class HorarioFuncionamentoController(private val service: HorarioFuncionamentoService) {

    @GetMapping
    fun listarTodos() = ResponseEntity.ok(service.listarTodos())

    @GetMapping("/restaurante/{restauranteId}")
    fun listarPorRestaurante(@PathVariable restauranteId: Long) =
        ResponseEntity.ok(service.listarPorRestaurante(restauranteId))

    @GetMapping("/restaurante/{restauranteId}/dia")
    fun buscarPorDia(
        @PathVariable restauranteId: Long,
        @RequestParam diaSemana: DayOfWeek
    ) = ResponseEntity.ok(service.buscarPorDia(restauranteId, diaSemana))

    @PostMapping
    fun salvar(@RequestBody horario: HorarioFuncionamento) = ResponseEntity.ok(service.salvar(horario))

    @DeleteMapping("/{id}")
    fun excluir(@PathVariable id: Long): ResponseEntity<Void> {
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }
}
