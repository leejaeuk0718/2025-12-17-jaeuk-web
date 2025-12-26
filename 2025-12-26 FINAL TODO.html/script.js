const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('taskList');

let todoData = JSON.parse(localStorage.getItem('myTodos')) || [];


//2025-12-26 작업

//순서1
//데이터 저장할 저장소 배열 만들기.
// let todoData = [];

//순서2
//그리기 함수 정의 - 함수명은 보통 소문자 시작.
function render(dataArray) {

//항상 기본, 데이터를 모두 삭제하고 시작한다.
// 기존 내용을 다 지우고,
listContainer.innerHTML = "";

  if (dataArray.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center text-gray-400 py-10">
                할 일이 없습니다. 작성해보세요! 📝
            </div>`;
        return;
    }


// 새로 요소를 그릴 예정. 새로고침 효과.
// 기반이 데이터를 중심으로 한다. 그 데이터는 배열에 들어있다.
// 배열과, 반복문을 같이 사용하는 함수 소개. forEach(function(){}), 이 기법사용.
dataArray.forEach(function(todo) {
        listContainer.innerHTML += `
            <li class="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                <span class="text-gray-700 font-medium">${todo.text}</span>
                
                <div class="flex gap-2">
                    <button onclick="updateTodo(${todo.id})" 
                        class="text-sm bg-green-100 text-green-600 px-3 py-1.5 rounded-md hover:bg-green-200 transition font-bold">
                        수정
                    </button>
                    <button onclick="deleteTodo(${todo.id})" 
                        class="text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-200 transition font-bold">
                        삭제
                    </button>
                </div>
            </li>
        `;
    });
}

function addTodo() {
    //할일이 입력창에 문자열이 없는경우 경고창 
    if(input.value === ""){
        alert("할 일을 입력해주세요!");
        return;
    }

    //입력창에 문자열이 있는경우
    const newTodo = {
        id: Date.now(), //고유한 아이디값 생성
        text: input.value //입력창에 있는 문자열
    }

    //배열에 새 객체 추가
    todoData.push(newTodo);
    render(todoData); //화면 다시 그리기
    input.value = ""; //입력창 초기화
}

//추가 기능 이벤트 연결
addBtn.addEventListener('click', addTodo);

//삭제 기능 함수 정의
function deleteTodo(id) {

    if(confirm("정말 삭제하시겠습니까?")) {
        //배열에서 해당 id를 가진 객체를 제외한 새로운 배열 생성
        todoData = todoData.filter(item => item.id !== id);
        render(todoData); //화면 다시 그리기
    }
}

//데이터 저장
function save(){
    localStorage.setItem('myTodos', JSON.stringify(todoData));
}

function addTodo(){
    todoData.push(newTodo)
    save();
    render(todoData);
}   

function deleteTodo(id){
    todoData = todoData.filter(item => item.id !== id);
    save();
    render(todoData);
}   

function updateTodo(id){
    const item= todoData.find(item => item.id === id);
    const newText = prompt("수정할 내용을 입력하세요:", item.text);
    if(newText !== null && newText.trim() !== ""){
        item.text = newText;
        save();
        render(todoData);
    }
}

const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keyup', function(){
    const lkeyword = searchBox.value;
    const filteredData = todoData.filter(item => item.text.includes(lkeyword));
    render(filteredData);
});

//초기 렌더링
render(todoData);