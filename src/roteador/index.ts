import TarefasTracker from "@/views/TarefasTracker.vue";
import ProjetosTracker from "@/views/ProjetosTracker.vue";
import FormularioProjeto from "@/views/Projetos/FormularioProjeto.vue"
import ListaProjeto from "@/views/Projetos/ListaProjeto.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const rotas: RouteRecordRaw[] = [
        {
            path: '/',
            name: 'Tarefas',
            component: TarefasTracker
        },
        {
            path: '/projetos',
            component: ProjetosTracker,
            children: [
                {
                    path: '',
                    name: 'Projetos',
                    component: ListaProjeto
                },
                {
                    path: 'novo',
                    name: 'Novo projeto',
                    component: FormularioProjeto
                },
                {
                    path: ':id',
                    name: 'Editar projeto',
                    component: FormularioProjeto,
                    props: true
                }
            ]
        }
    ]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;