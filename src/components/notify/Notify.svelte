<script lang="ts">


export let elementNotify: string;
export let elementNotifyProgress: string;
export let elementNotifyProgressColor: string;
export let textNotify: string;


</script>

<div class="mb-3" style="{elementNotify} transition: all 0.5s">
    <div class="h-8 bg-white text-center flex items-center justify-center px-2">
        {textNotify}
    </div>
    <div class="h-full bg-slate-300">
        <div class="py-0.5" style="{elementNotifyProgress} {elementNotifyProgressColor}"></div>
    </div>
</div>