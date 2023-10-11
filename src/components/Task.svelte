<script lang="ts">
    import { taskApi } from "../hooks/taskApi";
	import type { TaskGetApiDto } from "../dto/TaskGetApiDto";
	import { UuidDto } from "../dto/uuidDto";

    export let task: TaskGetApiDto;
    export let newNotify: Function;
    export let tasks: TaskGetApiDto[];
    export let taskEditing: boolean;

    const api = taskApi();
    let element: HTMLElement;
    let buttonComplete: HTMLInputElement;

    function activeEdit() {
        if (!taskEditing) {
            task.editing = true;
            taskEditing = true;
        } else {
            newNotify("error", "Uma tarafa já está sendo editada")
        }
    }

    async function completeTask() {
        let id = new UuidDto(task.id);
        let res = await api.deleteTask(id);
        if (res) {
            element.classList.add('line-through');
            buttonComplete.disabled = true;
            setTimeout(async () => {
                element.classList.remove('line-through');
                buttonComplete.disabled = false;
                buttonComplete.checked = false;
                tasks = tasks.filter((element) => { return element.id != id.uuid });
                newNotify("success", "A tarefa foi concluída.");
            }, 500);
        }
    }

</script>


<div class="max-w-lg bg-zinc-50 px-7 py-2 border border-slate-200 shadow-md rounded-md mb-3">
    <h1 bind:this={element}  class="text-lg font-medium">{task.title}</h1>
    <ul class="list-disc px-10">
        {#each task.subtasks as item}
            <li>{item.description}</li>
        {/each}
    </ul>
    <div class="w-full mt-2 flex justify-between border-t-2 border-slate-200 pt-2">
        <div>
            <input on:click={async () => {  completeTask() }} bind:this={buttonComplete} name="check" type="checkbox" class="cursor-pointer">
            <label for="check" class="ms-5">Concluir tarefa</label>
        </div>
        <button on:click={activeEdit} class="underline">Editar</button>
    </div>
</div>