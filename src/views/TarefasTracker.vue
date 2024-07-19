<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import ListaDeTarefas from '@/components/ListaDeTarefas.vue';
import BoxTarefa from '@/components/BoxTarefa.vue';
import { OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';

export default defineComponent({
    name: 'TarefasTracker',
    components: {
        FormularioTarefa,
        ListaDeTarefas,
        BoxTarefa
    },
    computed: {
         listaEstaVazia(): boolean {
             return this.tarefas.length === 0
         }
    },
    methods: {
        // salvarTarefa(tarefa: ITarefa) {
        //     this.tarefas.push(tarefa)
        // }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)

        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>

<template>
    <FormularioTarefa @aoSalvarTarefa="" />
    <div class="lista">
        <BoxTarefa v-if="listaEstaVazia">
            Você não está muito produtivo hoje
        </BoxTarefa>
        <ListaDeTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>