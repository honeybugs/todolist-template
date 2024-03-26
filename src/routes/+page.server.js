import supabase from '$lib/server/db.js';

export async function load({ }) {
	// supabase의 todo 테이블에서 할 일 모두 가져오기
	const {data, error } = await supabase.from("todo").select("");
	return {todos : data ?? []} // 만약 table에 가져올 컬럼이 없다면 null이 data에 오게 되는데 이럴 경우 빈 배열로 리턴
}
