document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    const button = document.querySelector('#load-user')
    form.addEventListener('submit', addUserFormSubmitted);
    button.addEventListener('click', loadSpecificUserPost)
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";

    const response = await axios.get(`http://localhost:3000/users`);
    const users = response.data.payload
    // console.log(response.data.payload)
    users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}

const loadSpecificUserPost = async () => {
    const input = document.querySelector('#idInput').value
    const inputNum = parseInt(input)
    const userList = document.querySelector('#usersList')
    userList.innerHTML = ''

    const fetchResponse = await axios.get(`http://localhost:3000/posts/${inputNum}`)
    console.log(fetchResponse.data.payload)

    const user = fetchResponse.data.payload
    user.forEach(elem => {
        const listElem = document.createElement('li')
        listElem.innerText = `${elem.body}`
        userList.appendChild(listElem)
    })
    
}