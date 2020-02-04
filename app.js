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

  


})();

// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  }

  return {
    getInput: function() {
        return { // т.к. нам надо передать эти данные в удобной форме, легче это сделать объектом, чем отдельными переменными. И т.к. эта информация не чувствительная, то она не была подвязана ни к каким внутренним методам.
        type: document.querySelector(DOMstrings.inputType).value, //WIll be iether inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },

    getDOMstrings: function() {
      return DOMstrings; //делаем объект со стилями публичным
    }
  };

})();


// GLOBAL APP CONTROLLER
var controller = (function(budgerCtrl, UICtrl)  { //так будут называться объекты переданные ниже внутри модуля

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

  var ctrlAddItem = function() {
       // 1. Get the field input data
      var input = UIController.getInput();
    // 2. Add the new item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
    
  };

  return {
    init: function() { //запустит приложение и даст доступ к замыканиям благодаря возвращенным ф-циям
      console.log('Application has started');
      setupEventListeners(); 
    }
  };

})(budgetController, UIController); //тут передаются сами объекты, о существовании которых должен знать контроллер

controller.init();