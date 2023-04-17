class Validator {
  constructor() {
    this.validations = [
      'data-required',
      'data-min-length',
      'data-max-length',
      'data-email-validate',
      'data-only-latters',
      'data-equal',
      'data-password-validade'

    ]
  }

  validate(form) {

    let currentValidations = document.querySelectorAll(' form .error-validation');

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations)
    }

    let inputs = form.getElementsByTagName('input')

    let inputsArray = [...inputs]

    inputsArray.forEach(function (input) {
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          let method = this.validations[i].replace('data-', '').replace('-', '');

          let value = input.getAttribute(this.validations[i]);

          this[method](input, value)
        }
      }
    }, this)
  }


  required(input) {
    let inputValue = input.value;

    if (inputValue === '') {
      let errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage)
    }
  }
  minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `o campo precisa ter pelo menos ${minValue} caracteres`;

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage)
    }
  }

  maxlength(input, maxValue) {
    let inputLength = input.value.length;
    let errorMessage = `o campo precisa ter pelo mais que ${maxValue} caracteres`;

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage)
    }
  }

  emailvalidate(input){
    let re = /\S+@\S+\.\S+/;
    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão email@email.com`;

    if(!re.test(email)) {
      this.printMessage(input, errorMessage)
    }
  }

  onlylatters(input) {
    let re = /^[A-za-z]+$/;;
    let inputValue = input.value;
    
    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if(!re.test(inputValue)) {
      this.printMessage(input, errorMessage)
    }
  }

  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];
    let errorMessage = `Este campo precisa ser igual ao ${inputName}`;

    if(input.value != inputToCompare.value){
      this.printMessage(input, errorMessage)
    }
  }

  passwordvalidade(input) {
    let charArr = input.value.split("");
    let uppercases = 0;
    let numbers = 0;

    for(let i = 0; charArr.length > i; i++){
      if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if(uppercases === 0 || numbers === 0  ){
      let errorMessage =  	`A senha precisa de um caractere maiúsculo e um número`

      this.printMessage(input, errorMessage)
    }
  }

  printMessage(input, msg) {
    let errorsQty = input.parentNode.querySelector('.error-validation');

    if (errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;

      let inputParent = input.parentNode;

      template.classList.remove('template');

      inputParent.appendChild(template);
    }
  }

  cleanValidations(validations) {
    validations.forEach(el => el.remove())
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();
submit.addEventListener('click', function (e) {

  e.preventDefault();
  validator.validate(form)
});

