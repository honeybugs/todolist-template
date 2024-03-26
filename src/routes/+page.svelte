<script>
	export let data;

	let { todos } = data;

	let title_for_add;
    
	async function add_todo(title) {

        // /todo 에 POST 요청으로 할 일 추가 로직 서버에 실행
		const response = await fetch('/todo', {
			method: 'POST',
			body: JSON.stringify({ title })
		}).then((res) => res.json());
        
		if (response.error) alert('오류! \n ' + response.error_msg);
        // todos 초기화로 svelte에 todos에 대한 뷰 업데이트 요청
		else todos = [...todos, response];
	}

	async function remove_todo(id) {
		
        // /todo 에 DELETE 요청으로 할 일 제거 로직 서버에 요청
		const response = await fetch('/todo', {
			method: 'DELETE',
			body: JSON.stringify({ id })
		}).then((res) => res.json());


		if (response.error) alert('오류! \n ' + response.error_msg);
        // todos 초기화로 svelte에 todos에 대한 뷰 업데이트 요청
		else todos = todos.filter((x) => x.id != id);
	}
</script>

<div class="w-full min-h-screen bg-slate-100 flex flex-col items-center">
	<p class="text-3xl font-bold mt-8">투두 리스트</p>

	<p class="text-2xl text-bold">할일 목록</p>
	<div class="flex flex-col w-48">
        <!-- svelte each as 문법으로 반복문으로 할일 목록 원소 생성 -->
		{#each todos as todo, index}
			<div class="flex justify-between py-1">
				<p class="text-2xl font-bold">
					{todo.title}
				</p>
				<button
					class="text-2xl px-2 py-1 rounded-sm bg-red-200 text-red-400"
					on:click={() => remove_todo(todo.id)}>삭제</button
				>
			</div>
		{/each}
	</div>
	<div class="flex space-x-2">
        <!-- svelte의 bind:value 로 title_for_add 변수에 input 값 연결 -->
		<input bind:value={title_for_add} type="text" palceholder="할 일 적기" />
		<button
			on:click={() => add_todo(title_for_add)}
			class="px-2 py-1 rounded-sm bg-blue-200 text-blue-400 text-xl font-medium"
		>
			추가
		</button>
	</div>
</div>
