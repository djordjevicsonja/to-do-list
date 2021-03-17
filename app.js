const Model = (function () {
  let toDoList = [];
  return {
    addtoToDoList: function (newToDo) {
      toDoList.push(newToDo);
      return newToDo;
    },

    deleteFromToDoList: function (taskToDel) {
      let notDone = toDoList.filter(function(task, index){
          if(taskToDel.indexOf(index)==-1)
          return task;
      });
      toDoList = notDone;
      console.log(taskToDel);
      return taskToDel;
    },

    showArr: function () {
      console.log("taskovi: " + toDoList + ",");
    },
  };
})();

const View = (function () {
  const DOMStrings = {
    inputField: "#userInput",
    addBtn: "#button1",
    toDoUL: "#myList",
    deleteBtn: "#button2",
    checkbox: ".chk",
  };
  return {
    getInput: function () {    
            return document.querySelector(DOMStrings.inputField).value;
    
    },

    showListTask: function (listItem) {
      const list = document.createElement("li");
      list.innerHTML = `
            <input type="checkbox" class="chk">
            <span>${listItem}<span>`;
      document.querySelector(DOMStrings.toDoUL).appendChild(list);
    },

    clearFields: function () {
      document.querySelector(DOMStrings.inputField).value = "";
      document.querySelector(DOMStrings.inputField).focus();
    },

    deleteListTask: function (taskToDel) {
      const chk = document.querySelectorAll(DOMStrings.checkbox);
      const list = document.querySelector(DOMStrings.toDoUL);
   
      taskToDel.filter((e) => list.removeChild(chk[e].parentElement));
    },

    checkForChecked: function () {
      checkedTasks = [];
      const chk = document.querySelectorAll(DOMStrings.checkbox);
      for (let i = 0; i < chk.length; i++) {
        if (chk[i].checked === true) {
          checkedTasks.push(i);
        }
      }
      return checkedTasks;
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

const Controller = (function (dataStorage, userInterface) {
  const setListeners = ()=>{
    const DOM = userInterface.getDOMStrings();

    document.querySelector(DOM.inputField).addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        ctrlAddTask();
      }
    });
    document.querySelector(DOM.addBtn).addEventListener("click", ctrlAddTask);
    document
      .querySelector(DOM.deleteBtn)
      .addEventListener("click", ctrlDeleteTask);
  };

  const ctrlAddTask = function () {
    const input = userInterface.getInput();
    let newToDo;
    newToDo = dataStorage.addtoToDoList(input);
    userInterface.showListTask(newToDo);
    userInterface.clearFields();
    dataStorage.showArr();
  };

  const ctrlDeleteTask = function () {
    const checked = userInterface.checkForChecked();
    const delFromArr = dataStorage.deleteFromToDoList(checked);
    userInterface.deleteListTask(delFromArr);
    dataStorage.showArr();
  };

  return {
    init: function () {
      setListeners();
    },
  };
})(Model, View);

Controller.init();
