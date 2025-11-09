package com.restaurante.reservamesa.service

import com.restaurante.reservamesa.model.Restaurante
import com.restaurante.reservamesa.repository.RestauranteRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class RestauranteService(
    private val repository: RestauranteRepository
) {

    // Lê a chave da API do Google do application.properties
    @Value("\${google.api.key}")
    private lateinit var apiKey: String

    fun listarTodos() = repository.findAll()

    fun buscarPorId(id: Long) = repository.findById(id).orElseThrow {
        RuntimeException("Restaurante não encontrado com ID $id")
    }

    fun buscarPorNome(nome: String) = repository.findByNomeContainingIgnoreCase(nome)

    fun listarDisponiveis() = repository.findByDisponivelTrue()

    fun salvar(restaurante: Restaurante): Restaurante {
        // Se o restaurante não tem coordenadas, busca via Google API
        if (restaurante.latitude == null || restaurante.longitude == null) {
            val (lat, lng) = buscarCoordenadas(restaurante.endereco)
            restaurante.latitude = lat
            restaurante.longitude = lng
        }
        return repository.save(restaurante)
    }

    fun atualizar(id: Long, novo: Restaurante): Restaurante {
        val existente = buscarPorId(id)
        val atualizado = existente.copy(
            nome = novo.nome,
            endereco = novo.endereco,
            latitude = novo.latitude,
            longitude = novo.longitude,
            disponivel = novo.disponivel
        )
        return repository.save(atualizado)
    }

    fun excluir(id: Long) = repository.deleteById(id)

    // --- MÉTODO PRIVADO PARA CHAMAR A API DO GOOGLE ---
    private fun buscarCoordenadas(endereco: String): Pair<Double, Double> {
        val url = "https://maps.googleapis.com/maps/api/geocode/json?address=${endereco.replace(" ", "+")}&key=$apiKey"
        val restTemplate = RestTemplate()
        val response = restTemplate.getForObject(url, Map::class.java)

        val results = response?.get("results") as? List<*>
        if (results.isNullOrEmpty()) throw RuntimeException("Endereço não encontrado na API do Google")

        val geometry = (results[0] as Map<*, *>)["geometry"] as Map<*, *>
        val location = geometry["location"] as Map<*, *>

        val lat = location["lat"] as Double
        val lng = location["lng"] as Double

        return Pair(lat, lng)
    }
}
