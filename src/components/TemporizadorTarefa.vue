<script lang="ts">
import { defineComponent } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import BotaoTemporizador from './BotaoTemporizador.vue'

export default defineComponent({
    name: 'TemporizadorTarefa',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroTarefa,
        BotaoTemporizador
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = !this.cronometroRodando
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = !this.cronometroRodando
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})
</script>

<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />
        <BotaoTemporizador @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <BotaoTemporizador @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </div>
</template>