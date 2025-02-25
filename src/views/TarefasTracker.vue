<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import ListaDeTarefas from '@/components/ListaDeTarefas.vue';
import BoxTarefa from '@/components/BoxTarefa.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';
import { watchEffect } from 'vue';
import ModalTracker from '@/components/ModalTracker.vue';

export default defineComponent({
    name: 'TarefasTracker',
    components: {
        FormularioTarefa,
        ListaDeTarefas,
        BoxTarefa,
        ModalTracker
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        const filtro = ref("")

        // const tarefas = computed(() => 
        //     store.state.tarefa.tarefas.filter(
        //         (t) => !filtro.value || t.descricao.includes(filtro.value)
        //     )
        // )

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
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

        <div class="field">
            <p class="control has-icons-left">
                <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <ListaDeTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
            @aoTarefaClicada="selecionarTarefa" />

        <ModalTracker :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label"> Descrição</label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                </div>
            </template>
            <template v-slot:rodape>
                <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </template>
        </ModalTracker>
    </div>
</template>