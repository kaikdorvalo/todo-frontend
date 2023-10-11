<script lang="ts">
    import Task from '../components/Task.svelte';
    import TaskEditable from '../components/TaskEditable.svelte'
    import "../app.css"
	import TaskAdd from '../components/taskAdd.svelte';
    import { taskApi } from '../hooks/taskApi';
	import type { TaskGetApiDto } from '../dto/TaskGetApiDto';
	import { onMount } from 'svelte';
	import Notify from '../components/notify/Notify.svelte';

    const api = taskApi();
    var tasks: TaskGetApiDto[];
    var haveTasks = true;
    var addingTask = false;
    let loading = true;
    let textLoadingStatus = "Carregando tarefas";
    let elementNotify = "opacity: 0;"
    let elementNotifyProgress = "width: 0%;";
    let elementNotifyProgressColor = "none";
    let textNotify = "";
    let count = 100;
    let showingNotify = false;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let taskEditing = false;

    let newNotify = (type: string, msg: string) => {
        if (showingNotify) {
            cancelNotify();
        }

        elementNotifyProgressColor = "background: none;";
        showingNotify = true;

        let color = "none";
        console.log('aa')

        if (type === "success") {
            color = "#4ade80";
        }

        if (type === "error") {
            color = "#f87171";
        }

        elementNotifyProgressColor = "background: " + color + ";";
        textNotify = msg;
        elementNotify = "opacity: " + 1 + ";";
        interval = setInterval(() => { 
            elementNotifyProgress = "width: " + count + "%;";
            count--;
        }, 30);

        timeout = setTimeout(() => { cancelNotify() }, 3000);
    }

    function cancelNotify() {
        elementNotify = "opacity: " + 0 + ";";
        clearInterval(interval);
        clearTimeout(timeout);
        count = 100;
        showingNotify = false;
    }

    async function getTasksApi() {
        try {
            const array = await api.getTasks();
            tasks = array.reverse();

            console.log(tasks);

            if (tasks.length > 0) {
                haveTasks = true
            } else {
                haveTasks = false;
            }

            loading = false;
        } catch (error) {
            console.log("Erro: ", error);
            newNotify("error", "Erro ao carregar as tarefas.");
            textLoadingStatus = "Não foi possível carregar as tarefas.";
        }
    }


    function addNewTask() {
        addingTask = true;
    }


    onMount(getTasksApi);

</script>

<div class="bg-zinc-100 h-screen pb-20 overflow-auto">
    <div class="max-w-lg mx-auto">
        <h1 class="text-2xl max-w-lg mx-auto pt-8 pb-3 text-center">To-Do List</h1>
        
            <Notify bind:elementNotify bind:elementNotifyProgress bind:elementNotifyProgressColor bind:textNotify />    

            <form>
                <button on:click={addNewTask} class="bg-purple-600 py-2 text-white active:bg-purple-700 select-none mb-5 block px-10 w-full">Adicionar Tarefa</button>
            </form>

            <div class="h-96 overflow-auto h-full">
                {#if addingTask}
                    <TaskAdd bind:addingTask bind:newNotify bind:tasks/>
                {/if}
                {#if loading}
                    <p class="text-center">{textLoadingStatus}</p>
                {:else}
                    {#if haveTasks}
                        {#each tasks as task} <!-- possivel erro de falta de itens -->
                            {#if task.editing}
                                <TaskEditable bind:task bind:newNotify bind:taskEditing/>
                            {:else}
                                <Task bind:task bind:newNotify bind:tasks bind:taskEditing/>
                            {/if}
                        {/each}
                    {:else}
                        <p class="text-center">Nenhuma tarefa na lista.</p>
                    {/if}
                {/if}
            </div>     
        </div>
</div>
