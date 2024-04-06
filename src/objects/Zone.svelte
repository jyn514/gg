<!--
@component
A drop target for direct-manipulation objects.
-->

<script lang="ts">
    import type { Operand } from "../messages/Operand";
    import BinaryMutator, { type DropEffect } from "../mutators/BinaryMutator";
    import { currentEffect, currentSource, currentTarget } from "../stores";
    import Object from "./Object.svelte";

    interface $$Slots {
        default: { target: boolean; hint: string | null };
    }

    export let operand: Operand;
    export let alwaysTarget: boolean = false;

    let dropHint: string | null = null;
    let target = false;
    $: target = match($currentTarget);

    function match(target: Operand | null): boolean {
        return (
            target == operand ||
            (operand.type == "Merge" && target?.type == "Merge" && operand.header.id.commit == target.header.id.commit)
        );
    }

    function onDragOver(event: DragEvent) {
        event.stopPropagation();

        let canDrop = new BinaryMutator($currentSource!, operand).canDrop();
        if (canDrop.type == "yes") {
            event.preventDefault();

            let effect: DropEffect =
                event.shiftKey && globalThis.Object.hasOwn(canDrop.hints, "copy") ? "copy" : "move";
            event.dataTransfer!.dropEffect = effect;
            $currentEffect = effect;

            if (!match($currentTarget)) {
                $currentTarget = operand;
            }
        } else if (canDrop.type == "maybe") {
            event.preventDefault();
            dropHint = canDrop.hint;
            if (alwaysTarget && !match($currentTarget)) {
                $currentTarget = operand;
            }
        }
    }

    function onDragLeave(event: DragEvent) {
        $currentTarget = null;
        dropHint = null;
    }

    function onDrop(event: DragEvent) {
        event.stopPropagation();

        let mutator = new BinaryMutator($currentSource!, operand);
        if (mutator.canDrop().type == "yes") {
            mutator.doDrop($currentEffect);
        }

        $currentSource = null;
        $currentTarget = null;
        dropHint = null;
    }
</script>

<div
    role="presentation"
    class="zone"
    class:hint={dropHint}
    on:dragenter={onDragOver}
    on:dragover={onDragOver}
    on:dragleave={onDragLeave}
    on:drop={onDrop}>
    <slot {target} hint={dropHint} />
</div>

<style>
    .zone {
        width: 100%;
        pointer-events: auto;
    }

    .hint {
        color: var(--ctp-peach);
    }
</style>
