const formAuth = document.querySelector('.form-auth');
const inputAuth = document.querySelectorAll('.input-auth');
const knopAuth = document.querySelector('.knop-send-auth');

formAuth.addEventListener('submit', function(e) {
    e.preventDefault();
    let dataFormAuth = new FormData(formAuth);
    let dataAuth = Object.fromEntries(dataFormAuth.entries());
    sendAuth(dataAuth);
});

async function sendAuth(data) {
    let response = await fetch('https://reg-log-in.herokuapp.com/router/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
    let resAuth = await response.json();
    let user = resAuth[1].user;
    let token = resAuth[0].token;
    const errorAuth = document.querySelector('.error-auth');
    const errorAuthT = document.querySelector('.text-error-auth');
    if (resAuth[1].message2 == 'Не существует') {
        errorAuth.classList.remove('hidden-error');
        errorAuthT.textContent = resAuth[0].message;
        return;
    };
    if (resAuth[1].message2 == 'Неверный пароль') {
        errorAuth.classList.remove('hidden-error');
        errorAuthT.textContent = resAuth[0].message;
        return;
    };
    if (token) {
        const divLogin = document.querySelector('#container-login');
        const personalKabinet = document.querySelector('#kabinet-auth');
        const usernameK = document.querySelector('#username-k-login');
        const roleUser = document.querySelector('#role');
        divLogin.classList.add('hidden-container');
        personalKabinet.classList.remove('hidden-container');
        usernameK.textContent = user.username;
        if (user.roles[0] == 'ADMIN') {
            roleUser.textContent = 'Администратор';
        } else if (user.roles[0] == 'User') {
            roleUser.textContent = 'Пользователь';
        };
        getDann();
        async function getDann() {
            let response1 = await fetch('https://reg-log-in.herokuapp.com/router/users', {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + token,
                },
            });
            let otvet = await response1.json();
            if (otvet.message == 'Пользователь не был авторизован') {
                return;
            };
            if (otvet.message == 'У вас нет доступа') {
                return;
            };
            if (otvet.message == 'Пользователь не был авторизован') {
                return;
            };
            const superKnop = document.createElement('button');
            superKnop.textContent = 'Список пользователей';
            superKnop.classList.add('superKnop');
            personalKabinet.append(superKnop);
            const spisok = document.createElement('ol');
            spisok.classList.add('hidden-spisok');
            personalKabinet.append(spisok);
            otvet.forEach(function(chel) {
                const li = document.createElement('li');
                li.classList.add('spisok');
                spisok.append(li);
                const pName = document.createElement('p');
                pName.textContent = chel.username;
                pName.classList.add('style-chel-spisok');
                const pRole = document.createElement('p');
                pRole.textContent = chel.roles[0];
                pRole.classList.add('style-chel-spisok');
                const tire = document.createElement('p');
                tire.textContent = ' - ';
                tire.classList.add('style-chel-spisok');
                li.append(pName);
                li.append(tire);
                li.append(pRole);
            });
            superKnop.addEventListener('click', function(e) {
                e.preventDefault();
                spisok.classList.toggle('hidden-spisok');
            });
        };
    
    };
};

