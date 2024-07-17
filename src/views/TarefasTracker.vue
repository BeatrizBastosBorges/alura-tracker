<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import ListaDeTarefas from '@/components/ListaDeTarefas.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxTarefa from '@/components/BoxTarefa.vue';

export default defineComponent({
    name: 'TarefasTracker',
    components: {
        FormularioTarefa,
        ListaDeTarefas,
        BoxTarefa
    },
    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>

<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <BoxTarefa v-if="listaEstaVazia">
            Você não está muito produtivo hoje
        </BoxTarefa>
        <ListaDeTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>