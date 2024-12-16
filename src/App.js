import { useState } from 'react';
import './App.css';
import contacts from './contacts.json';

// Table component to display individual contact details
const Table = ({ pictureUrl, name, popularity, wonOscar, wonEmmy, onDelete }) => {
  return (
    <tr>
      <td><img src={pictureUrl} alt={name} /></td>
      <td>{name}</td>
      <td>{popularity}</td>
      <td>{wonOscar ? <span>&#127942;</span> : " "}</td>
      <td>{wonEmmy ? <span>&#127942;</span> : " "}</td>
      <td><button onClick={onDelete}>Delete</button></td>
    </tr>
  );
}

function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5));
  
  // Function to add a random contact
  const addRandomContact = () => {
    const remainingContacts = contacts.filter(contact => !contactsList.includes(contact));
    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    setContactsList(prevContacts => [...prevContacts, randomContact]);
  };

  // Function to delete a contact
  const deleteContact = (id) => {
    setContactsList(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  // Function to sort contacts by name
  const sortByName = () => {
    const sortedContacts = [...contactsList].sort((a, b) => a.name.localeCompare(b.name));
    setContactsList(sortedContacts);
  };

  // Function to sort contacts by popularity
  const sortByPopularity = () => {
    const sortedContacts = [...contactsList].sort((a, b) => b.popularity - a.popularity);
    setContactsList(sortedContacts);
  };

  return (
    <div className="App">
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map(contact => (
            <Table 
              key={contact.id} 
              {...contact} 
              onDelete={() => deleteContact(contact.id)} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
