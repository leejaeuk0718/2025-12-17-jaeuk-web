const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

btn.addEventListener('click', function() {
    const todo = input.value;
    if (todo === ""){
        alert("할 일을 입력해주세요!");
        return;
    }
    // list.innerHTML += `<li> ${todo} </li>`

    const li = document.createElement('li');
    li.textContent = todo;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    
    deleteBtn.addEventListener('click', function() {
        this.parentElement.remove();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = "";
})