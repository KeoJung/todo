let todos = [];

// GET: 전체 할 일 목록 조회
export async function GET() {
  return Response.json(todos);
}

// POST: 새로운 할 일 추가
export async function POST(request) {
  const body = await request.json();
  const newTodo = { id: Date.now(), text: body.text };
  todos.push(newTodo);
  return Response.json({ message: "추가 완료", todos });
}

// DELETE: 특정 할 일 삭제
export async function DELETE(request) {
  const body = await request.json();
  todos = todos.filter((t) => t.id !== body.id);
  return Response.json({ message: "삭제 완료", todos });
}
// PUT: 특정 할 일 수정
export async function PUT(request) {
  const body = await request.json();
  todos = todos.map((t) => (t.id === body.id ? { ...t, text: body.text } : t));
  return Response.json({ message: "수정 완료", todos });
}
