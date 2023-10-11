<script lang="ts">
	import InputSubTask from "./InputSubTask.svelte";
    import { TaskGetApiDto } from "../dto/TaskGetApiDto";
	import type { SubTaskGetApiDto } from "../dto/SubTaskGetApiDto";
    import { taskApi } from "../hooks/taskApi";
	import { UpdateTitleDto } from "../dto/UpdateTitleDto";
	import { AddSubTaskDto } from "../dto/AddSubTaskDto";

    export let task: TaskGetApiDto;
    export let newNotify: Function;
    export let taskEditing: boolean;


    const api = taskApi();
    let subtasksNotReference = new Array<SubTaskGetApiDto>();
    copySubtasks();
    var taskEdit = new TaskGetApiDto(task.id, task.title, task.completed, task.editing, subtasksNotReference);
    var addingSubTask = false;
    var inputValueSubTask = "";
    var removedSubTasks = new Array<String>();

    function copySubtasks() {
        for (var sub of task.subtasks) {
            subtasksNotReference.push(Object.assign({}, sub));
        }
    }

    function cancelEditingTask() {
        task.editing = false;
        taskEditing = false;
        inputValueSubTask = "";
    }

    function addSubTask() {
        addingSubTask = true;
    }

    function cancelEditingSubTask() {
        addingSubTask = false;
    }

    async function confirmEdit() {
        let changed = false;
        if (taskEdit.title != task.title) {
            let taskUpdateTitle = new UpdateTitleDto(taskEdit.title, taskEdit.id)
            let res = await api.updateTitle(taskUpdateTitle);
            if (res) {
                task.title = taskEdit.title;
            }
            changed = true;
        }

        if (removedSubTasks.length > 0) {
            let res = await api.deleteSubTasks(removedSubTasks);
            if (res) {
                for (var i = 0; i < removedSubTasks.length; i++) {
                    task.subtasks = task.subtasks.filter((element) => { return element.id != removedSubTasks[i] });
                }
            }
            changed = true;
        }

        let newSubTasksFilter = taskEdit.subtasks.filter((element) => { return element.id === 'null' })

        if (newSubTasksFilter.length > 0) {
            let arrayNewSubTasks = new Array<AddSubTaskDto>();
            for (var i = 0; i < newSubTasksFilter.length; i++) {
                arrayNewSubTasks.push(new AddSubTaskDto(taskEdit.id, newSubTasksFilter[i].description));
            }

            const res =  await api.addSubTasks(arrayNewSubTasks);
            if (res.length > 0) {
                console.log(res);
                task.subtasks = task.subtasks.concat(res);
            }
            changed = true;
        }
        
        if (changed) {
            newNotify("success", "Tarefa alterada com sucesso!");
        }
        task.editing = false;
        taskEditing = false;
    }

    function newSubTask() {
        if (inputValueSubTask.length > 0) {
            let newSub = { id: "null", taskId: "null", description: inputValueSubTask };
            taskEdit.subtasks.push(newSub);
            taskEdit.subtasks = taskEdit.subtasks;
            inputValueSubTask = "";
        }
    }

    function removeSubTask(index: number) {
        if (taskEdit.subtasks[index].id == "null") {
            taskEdit.subtasks.splice(index, 1);
            taskEdit.subtasks = taskEdit.subtasks;
        } else {
            removedSubTasks.push(taskEdit.subtasks[index].id);
            console.log(removedSubTasks);
            taskEdit.subtasks.splice(index, 1);
            taskEdit.subtasks = taskEdit.subtasks;
        }
    }
</script>

<div class="max-w-lg bg-zinc-50 px-7 py-4 border border-slate-200 shadow-md rounded-md mb-3">
    <label for="titulo" class="font-bold">Título</label>
    <input  bind:value={taskEdit.title} name="titulo" placeholder="Título da tarefa" class="text-lg font-medium border border-slate-400 px-3 py-1 rounded-sm outline-none w-full bg-zinc-50">
    
    <p class="font-semibold my-2">Sub Tarefas</p>
    <ul class="max-h-40 overflow-y-auto">
        {#each taskEdit.subtasks as sub, index}
            <li class="flex w-full mb-2">
                <button on:click={() => {removeSubTask(index)}} class="px-2 border-2 border-red-400 me-2 text-red-400 w-7 h-7 hover:bg-red-400 hover:text-white">X</button>
                <div>{sub.description}</div>
            </li>
        {/each}
    </ul>
    {#if addingSubTask}
        <div>
            <InputSubTask bind:inputValueSubTask />
            <div class="w-1/2">
                <button on:click={cancelEditingSubTask} class="border-2 border-red-400 text-red-400 mt-2 py-1 px-2 hover:bg-red-400 hover:text-white">Voltar</button>
                <button on:click={newSubTask} class="text-indigo-600 mt-2 ms-2 py-1 px-2 hover:bg-indigo-600 hover:text-white border-2 border-indigo-600">Adicionar</button>
            </div>
        </div>
    {:else}
        <button on:click={addSubTask} class="border-2 border-indigo-600 text-indigo-600 mt-2 py-1 px-2 hover:bg-indigo-600 hover:text-white block">+ Adiconar sub tarefa</button>
    {/if}
    <div class="flex justify-end">
        <button on:click={cancelEditingTask} class="border-2 border-red-400 mt-2 text-red-400 px-2 py-1 hover:bg-red-400 hover:text-white">Cancelar</button>
        <button on:click={async () => {await confirmEdit()}} class="border-2 border-indigo-600 mt-2 bg-indigo-600 text-white px-2 py-1 ms-5">Concluir</button>
    </div>
</div>