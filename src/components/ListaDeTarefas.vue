<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxTarefa from './BoxTarefa.vue';

export default defineComponent({
    name: 'ListaDeTarefas',
    components: {
        CronometroTarefa,
        BoxTarefa
    },
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true }
    }
})
</script>

<template>
    <BoxTarefa>
        <div class="columns">
            <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column">
                <CronometroTarefa :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTarefa>
</template>

<style scoped>

</style>