const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('taskList');

const searchBox = document.getElementById('searchBox');

let todoData = JSON.parse(localStorage.getItem('myTodos')) || [];

render(todoData); //초기 렌더링

//2025-12-26 작업

function render(dataArray) {
listContainer.innerHTML = "";
dataArray.forEach(function(todo) {
listContainer.innerHTML += `
<li>
<span>${todo.text}</span>
<div>
<button onclick="updateTodo(${todo.id})">수정</button>
<button onclick="deleteTodo(${todo.id})">삭제</button>
</div>
</li>
`;
});
}

function save(){
    localStorage.setItem('myTodos', JSON.stringify(todoData));
}

function addTodo(){
    if(input.value === ""){
        alert("할 일을 입력해주세요!");
        return;
    }


const newTodo = {
    id: Date.now(),
    text: input.value
};



todoData.push(newTodo);
render(todoData);
input.value = "";
save();
}

function deleteTodo(id) {
    todoData = todoData.filter(item => item.id !== id);
    alert("삭제되었습니다.");
    render(todoData);
    save();
}

addBtn.addEventListener('click', addTodo);

function updateTodo(id) {
    const item = todoData.find(item => item.id === id);

    const newText = prompt("수정할 내용을 입력하세요:", item.text); 
    if (newText !== null && newText.trim() !== "") {
        item.text = newText.trim();
        render(todoData);
        save();
    }
}

searchBox.addEventListener('keyup', function() {
        const keyword = searchBox.value;
        const filteredTodos = todoData.filter(item => item.text.includes(keyword));
        render(filteredTodos);
    });