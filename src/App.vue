<script setup>
import { ref, computed, watch } from 'vue'
import Header from './components/Header.vue'
import Button from './components/Button.vue'
import { calcularTotalPagar } from './helpers/index.js'

const cantidad = ref(10000) // a este se le puede pasar cualquier valor primitivo
const meses = ref(6)

const total = ref(0)

const MIN = 0
const MAX = 20000
const STEP = 100
// const state = reactive({
//   // solo se le pasan objetos
//   cantidad: 0,
// })

const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(valor)
}

const cantidadMeses = computed(() => {
  return total.value / meses.value
})

// funciona para actualizar el state teniendo referenicas (estilo useffect)
watch([cantidad, meses], () => {
  total.value = calcularTotalPagar(cantidad.value, meses.value)
})

const handleDecremento = () => {
  const valor = cantidad.value - STEP

  if (valor < MIN) {
    alert('Cantidad no válida')
    return
  }
  cantidad.value = valor
}

const handleAumento = () => {
  const valor = cantidad.value + STEP

  if (valor > MAX) {
    alert('Cantidad no válida')
    return
  }

  cantidad.value = valor
}
</script>

<template>
  <main class="mt-5 p-10">
    <div
      class="grid grid-cols-1 md:grid-cols-2 items-start gap-5 bg-gray-800 p-5 rounded-md"
    >
      <div>
        <Header />

        <div class="flex items-center justify-between mt-10">
          <Button :operador="'-'" @fn="handleDecremento" />
          <Button :operador="'+'" @fn="handleAumento" />
        </div>

        <div class="my-5">
          <input
            type="range"
            name="range"
            id="range"
            :min="MIN"
            :max="MAX"
            :step="STEP"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            v-model.number="cantidad"
          />
          <p class="text-center text-4xl font-black my-5 text-green-400">
            {{ formatearDinero(cantidad) }}
          </p>

          <div class="bg-slate-700 mt-10 p-2 rounded-md">
            <h2 class="text-xl text-white font-bold text-center">
              Elige
              <span class="text-green-500 font-extrabold">plazo</span> a pagar
            </h2>

            <select
              name="plazos"
              id="plazos"
              class="w-full rounded-md bg-gray-800 p-2 mt-5 shadow-md font-bold"
              :value="meses"
              v-model.number="meses"
            >
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-slate-700 rounded-md">
        <h2 class="text-2xl text-white font-bold text-center uppercase">
          Resumen de
          <span class="text-green-500 font-extrabold">pagos</span>
        </h2>

        <div v-if="total > 0" class="p-5 space-y-2">
          <p class="text-xl text-gray-100 font-bold">{{ meses }} Meses</p>
          <p class="text-xl text-gray-100 font-medium">
            Total a pagar:
            <span class="font-bold text-green-400">{{
              formatearDinero(total)
            }}</span>
          </p>
          <p class="text-xl text-gray-100 font-medium">
            Pago mensual:
            <span class="font-bold text-green-400">{{
              formatearDinero(cantidadMeses)
            }}</span>
          </p>
        </div>

        <div v-else>
          <p class="text-lg font-medium text-center py-2">
            Añade una cantidad y empieza a calcular!
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
