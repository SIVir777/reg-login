const formReg = document.querySelector('.form-reg');
const inputsReg = document.querySelectorAll('.input-reg');

formReg.addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(formReg);
    inputsReg.forEach(function(input) {
        input.value = '';
    });
    const object = Object.fromEntries(formData.entries());
    send(object);
});

async function send(data) {
    let response = await fetch('https://reg-log-in.herokuapp.com/router/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
    let res = await response.json();
    let user = res[0];
    const errorMessage = document.querySelector('.error-reg');
    const textError = document.querySelector('.text-error');
    if (res.message == "Ошбика при регистрации; валидация") {
        textError.textContent = 'Пароль должен быть не менее 3 символов и не более 10, имя пользователя не должно оставаться пустым.';
        errorMessage.classList.remove('hidden-error');
        return;
    };
    if (res.message == 'Пользователь с таким логином уже существует!') {
        textError.textContent = 'Пользователь с таким логином уже существует!';
        errorMessage.classList.remove('hidden-error');
        return;
    };
    if (res.message == 'Registration error') {
        textError.textContent = 'Registration error';
        errorMessage.classList.remove('hidden-error');
        return;
    };
    if (res[1].message == 'Пользователь был успешно зарегистрирован!') {
        const containerReg = document.querySelector('#container-reg');
        const kabinetReg = document.querySelector('#kabinet-reg');
        const kabinetName = document.querySelector('#username-k-reg');
        containerReg.classList.add('hidden-container');
        kabinetReg.classList.remove('hidden-container');
        kabinetName.textContent = user.username;
    };
};