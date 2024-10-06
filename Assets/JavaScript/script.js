let contacts = [];

window.onload = function() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
        renderContacts();
    }
};

function addContact() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (name === '' || phone === '') {
        showPopup('Please enter a name and phone number.', true);
        return;
    }

    contacts.push({ name, phone });
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    saveContacts();
    renderContacts();
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    showPopup('Contact added successfully!', false);
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
    showPopup('Contact deleted successfully!', false);
}

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function searchContact() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchValue) || 
        contact.phone.includes(searchValue)
    );
    
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    
    filteredContacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${contact.name} - ${contact.phone} <button onclick="deleteContact(${index})">delete</button>`;
        contactList.appendChild(li);
    });
}

function renderContacts() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${contact.name} - ${contact.phone} <button onclick="deleteContact(${index})">delete</button>`;
        contactList.appendChild(li);
    });
}

function showPopup(message, isError) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.className = isError ? 'popup error' : 'popup';
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}
