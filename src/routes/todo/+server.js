import supabase from '$lib/server/db.js';

/*
    /todo 로 POST 요청 시 바디에서 title 가져와서 todo 테이블에 
    할 일 추가 하는 로직
*/
export async function POST({ request }) {
    const {title} = await request.json();
    if (title) {
        const { data, error } = await supabase
            .from('todo')
            .insert({ title })
            .select()
            .single()
        if (error) 
            return new Response(JSON.stringify({erorr : true, error_msg : error}));
        else 
            return new Response(JSON.stringify(data))    
    }
    return new Response(JSON.stringify({erorr : true, error_msg : "title is missing"}));	
}

/*
    /todo 로 DELETE 요청 시 바디에서 할일 id 로 todo 테이블에서
    제거 하는 로직
*/
export async function DELETE({ request }) {
    const {id} = await request.json();
    if (id) {
        const { error } = await supabase
            .from('todo')
            .delete()
            .eq('id', id)
        if (error) 
            return new Response(JSON.stringify({erorr : true, error_msg : error}));
        else 
            return new Response(JSON.stringify({}))    
    }
    return new Response(JSON.stringify({erorr : true, error_msg : "id is missing"}));	
}