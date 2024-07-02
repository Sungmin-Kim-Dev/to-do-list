// 할 일 앱 로직
// 사용자가 할 일 이름 입력
// + 버튼 클릭하면 할 일 추가 / enter를 쳐도 추가
// delete 버튼 누르면 할 일 삭제
// check 버튼을 누르면 취소선, 배경색 변경
// All, In Progress, Done 탭을 누르면 언더바 이동
// Done 탭에는 완료된 항목
// In Progress 탭에는 진행 중인 항목만 표시
// All에는 모두 표시

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];
addButton.addEventListener('click', addTask);

function addTask() {
  let taskItem = taskInput.value;
  taskList.push(taskItem);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task-row row mx-0">
      <p class="col p-3 h5 ms-2">${taskList[i]}</p>
      <div class="task-button col-auto align-content-center">
      <button class="check-btn btn btn-success">check</button>
      <button class="delete-btn ms-2 btn btn-danger">delete</button>
      </div>
      </div>`;
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}
