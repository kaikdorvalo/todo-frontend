
<script lang="ts">
    import InputSubTask from "./InputSubTask.svelte";
	import { SubTaskSendApiDto } from "../dto/SubTaskSendApiDto";
    import { TaskSendApiDto } from "../dto/TaskSendApiDto";
	import { SubTaskAddingApiDto } from "../dto/SubTaskAddingDto";
    import { taskApi } from "../hooks/taskApi";
	import type { TaskGetApiDto } from "../dto/TaskGetApiDto";

    const api = taskApi();

    export let addingTask = false;
    export let newNotify: Function;
    export let tasks: TaskGetApiDto[];

    let title = "";
    let subtasks = new Array<SubTaskSendApiDto>();
    let addingSubTask = false;
    let inputValueSubTask = "";
    let subtaskUpdated = false;

    function addSubTask() {
        addingSubTask = true;
    }

    function removeSubTask(index: number) {
        subtasks.splice(index, 1);
        subtasks = subtasks;
    }

    function cancelCreateNewTask() {
        addingTask = false;
    }

    function cancelAddSubTask() {
        addingSubTask = false;
    }

    function addSubTaskArray() {
        const sub = createSubTask();
        if (sub != undefined) {
            subtasks.push(sub);
            subtasks = subtasks;
            subtaskUpdated = true;
        }
    }

    function createSubTask() {
        let sub;
        if (inputValueSubTask.length > 0) {
            sub = new SubTaskSendApiDto(inputValueSubTask);
            inputValueSubTask = "";
            addingSubTask = false;
        }

        return sub;
    }

    async function createNewTask() {
        let task;
        if (title.length > 0) {
            task = new TaskSendApiDto(title, false, false, subtasks);
            const response = await api.createNewTask(task);
            console.log(response);
            if (response) {
                tasks.unshift(response);
                tasks = tasks;
                addingTask = false;
                newNotify("success", "Tarefa criada com sucesso");
            }
        }
    }
</script>

<div class="max-w-lg bg-zinc-50 px-7 py-4 border border-slate-200 shadow-md rounded-md mb-3">
    <label for="titulo" class="font-bold">Título</label>
    <input  bind:value={title} name="titulo" placeholder="Título da tarefa" class="text-lg font-medium border border-slate-400 px-3 py-1 rounded-sm outline-none w-full bg-zinc-50">
    
    <p class="font-semibold my-2">Sub Tarefas</p>
    <ul class="max-h-40 overflow-y-auto">
            {#each subtasks as sub, index}
                <li class="flex w-full mb-2">
                    <button on:click={() => removeSubTask(index)} class="px-2 border-2 border-red-400 me-2 text-red-400 w-7 h-7 hover:bg-red-400 hover:text-white">X</button>
                    <div>{sub.description}</div>
                </li>
            {/each}
    </ul>
    {#if addingSubTask}
        <div>
            <InputSubTask bind:inputValueSubTask />
            <div class="w-1/2">
                <button on:click={cancelAddSubTask} class="border-2 border-red-400 text-red-400 mt-2 py-1 px-2 hover:bg-red-400 hover:text-white">Voltar</button>
                <button on:click={addSubTaskArray} class="text-indigo-600 mt-2 ms-2 py-1 px-2 hover:bg-indigo-600 hover:text-white border-2 border-indigo-600">Adicionar</button>
            </div>
        </div>
    {:else}
        <button on:click={addSubTask} class="border-2 border-indigo-600 text-indigo-600 mt-2 py-1 px-2 hover:bg-indigo-600 hover:text-white block">+ Adiconar sub tarefa</button>
    {/if}
    <div class="flex justify-end">
        <button on:click={cancelCreateNewTask} class="border-2 border-red-400 mt-2 text-red-400 px-2 py-1 hover:bg-red-400 hover:text-white">Cancelar</button>
        <button on:click={async () => {await createNewTask()}} class="border-2 border-indigo-600 mt-2 bg-indigo-600 text-white px-2 py-1 ms-5">Concluir</button>
    </div>
</div>