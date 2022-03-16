window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  const task_el2 = document.createElement("div");
  //스토리지 값 불러오기//
  let task = "";
  for (let i = 0; i < localStorage.length; i++) {
      task = localStorage.getItem(i);
      add2();
  }

  // 제출 형식
  function add2() {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    // task_content_el.innerText = task;

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", true);

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    //Done 버튼 만들기
    const task_done_el = document.createElement("button");
    task_done_el.classList.add("done");
    task_done_el.innerText = "Done";

    //버튼 집어넣기
    task_actions_el.appendChild(task_done_el);
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    input.value = "";

    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() === "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", true);
        task_edit_el.innerText = "Edit";
      }
    });

    task_delete_el.addEventListener("click", () => {
      list_el.removeChild(task_el);
    });

    //Done 버튼 토글화 버튼눌으면 발생이벤트
    // let toggle = true;
    // const toggle_state = document.createElement("p");
    // toggle_state.classList.add("toggle");
    // toggle_state.setAttribute("display", "none");
    // toggle_state.innerText = toggle;
    // task_input_el.appendChild(toggle_state);

    //밑줄긋기
    task_done_el.addEventListener("click", () => {
      if (toggle) {
        task_input_el.setAttribute("style", "text-decoration : line-through");
        // toggle = false;
      } else {
        task_input_el.removeAttribute("style");
        // toggle = true;
      }

      // const toggle_state = document.createElement('p')
      // toggle_state.classList.add('toggle')
      // toggle_state.setAttribute('display', 'none');
      // toggle_state.innerText = toggle;
    //   toggle_state.innerText = toggle;

    //   const task_done_toggle = document.querySelector(".toggle");
    //   console.log(toggle);
    //   console.log(task_done_toggle);
    });
  }

  // 값이 있어야 add2 실행
  function add() {
    task = input.value;
    if (!task || !task.trim()) {
      alert("Please fill out the task");
      return;
    }
    add2();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    add();
  });
});

window.addEventListener("beforeunload", (e) => {
  localStorage.clear();
  //스토리지에 등록하기
  const task_content_All = document.querySelectorAll(".text");
  const task_done_toggle = document.querySelectorAll(".toggle");
  for (let i = 0; i < task_content_All.length; i++) {
    localStorage.setItem(i, task_content_All[i].value);
    // localStorage.setItem(i + 100, task_done_toggle[i].innerText);
  }
});

// window.onunload = () => {
// alert('하이');
// };
