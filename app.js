// BUDGET CONTROLLER
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // ID = last ID + 1
      // Создаст айдишник для нового айтема отталскиваясь от текущего кол-ва айтемов в аррэе 
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id;
      } else {
        ID = 0;
      }
      

      // Создаст новый айтем по типу inc или exp
      if(type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else {
        newItem = new Income(ID, des, val)
      }

      data.allItems[type].push(newItem); //Позволит разделить входящие объекты по типу и добавить их внутрь inc или exp аррэя внутри allItems
      return newItem; //возвращаем созданный объект, чтобы другие модули имели к нему доступ

    },

    testing: function() {
      console.log(data);
    }
  }


})();

// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function() {
        return { // т.к. нам надо передать эти данные в удобной форме, легче это сделать объектом, чем отдельными переменными. И т.к. эта информация не чувствительная, то она не была подвязана ни к каким внутренним методам.
        type: document.querySelector(DOMstrings.inputType).value, //WIll be iether inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if(type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields); //т.к. querySelectorAll возвращает не эрей, то можно использовать встроенный в объейкт Array метод slice и с помощью call вернуть из list -> array. Дальше сохраняем его в другой переменной. 

      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });
      fieldsArr[0].focus();
    },

    getDOMstrings: function() {
      return DOMstrings; //делаем объект со стилями публичным
    }
  }

})();


// GLOBAL APP CONTROLLER
var controller = (function(budgerCtrl, UICtrl)  { //так будут называться объекты переданные ниже, внутри модуля

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || event.which === 13) {
        ctrlAddItem()
      }
    });
  };

   //передаем объект со стилями контроллеру, чтобы они могли общаться между собой. Не забываем, что это метод и его нужно вызывать. 

  var updateBudget = function() {
    // 1. Calculate the budget

    // 2. return the budget

    // 3. Display the budget on the UI
  }

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input data
    input = UIController.getInput();
    // 2. Add the new item to the budget controller
    newItem = budgerCtrl.addItem(input.type, input.description, input.value); //структура передаваемая из get input
    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type) //передаем модулю UI объект созданный выше
    //3.1 Clear th fields
    UICtrl.clearFields();
    // 5. Calculate and update budget
    updateBudget();
  };

  return {
    init: function() { //запустит приложение и даст доступ к замыканиям благодаря возвращенным ф-циям
      console.log('Application has started');
      setupEventListeners(); 
    }
  };

})(budgetController, UIController); //тут передаются сами объекты, о существовании которых должен знать контроллер

controller.init();