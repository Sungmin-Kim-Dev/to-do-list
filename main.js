// 할 일 앱 로직
// 사용자가 할 일 이름 입력
// + 버튼 클릭하면 할 일 추가 / enter를 쳐도 추가
// delete 버튼 누르면 할 일 삭제
// check 버튼을 누르면 취소선, 배경색 변경
// 1. check 버튼을 누르면 true, false
// 2. true면 취소선 표시
// 3. false면 그대로

// All, In Progress, Done 탭을 누르면 언더바 이동
// Done 탭에는 완료된 항목
// In Progress 탭에는 진행 중인 항목만 표시
// All에는 모두 표시

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.tabs div');
let taskList = [];
let mode = 'all';
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

addButton.addEventListener('click', addTask);

// Enter 키로 입력
taskInput.addEventListener('keydown', function (event) {
  // .keycode is deprecated.
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  if (taskInput.value == false) {
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskName: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
  // 입력창 내용은 지우기
  taskInput.value = '';
}

function render() {
  let resultHTML = '';
  let listName = [];
  if (mode === 'all') {
    listName = taskList;
  } else if (mode === 'in-progress' || mode === 'done') {
    listName = filterList;
  }
  for (let i = 0; i < listName.length; i++) {
    if (listName[i].isComplete == true) {
      resultHTML += `
      <div class="task-row row mx-0">
        <p class="col m-0 p-3 h5 text-decoration-line-through bg-dark-subtle">${listName[i].taskName}</p>
        <div class="task-button col-auto align-content-center">
          <button onclick="toggleComplete('${listName[i].id}')" class="check-btn">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button onclick="deleteTask('${listName[i].id}')" class="delete-btn ms-2">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    } else {
      resultHTML += `
      <div class="task-row row mx-0">
        <p class="col m-0 p-3 h5">${listName[i].taskName}</p>
        <div class="task-button col-auto align-content-center">
          <button onclick="toggleComplete('${listName[i].id}')" class="check-btn">
            <i class="fa-solid fa-check"></i>
          </button>
          <button onclick="deleteTask('${listName[i].id}')" class="delete-btn ms-2">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    }
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i in taskList) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === 'all') {
    // 전체 리스트 표시
    render();
  } else if (mode === 'in-progress') {
    // 진행 중만 표시
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
        console.log(taskList[i]);
      }
    }
    render();
  } else if (mode === 'done') {
    // 완료된 항목 표시
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function deleteTask(id) {
  for (let i in taskList) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  // 맨 앞에 _ -> 숫자 랜덤 생성
  // 36진수로 표현한 문자열 변환
  // 36진수는 0~9, a~z까지 사용
  // 발생한 숫자는 0.xxx이므로 0과 소수점을 지우고 7자리만 표시
  return '_' + Math.random().toString(36).substring(2, 9);
}
