import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success');


  const loadPersons = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }

  useEffect(loadPersons, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

  const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const id = existingPerson.id;
        const changedPerson = { ...existingPerson, number: newNumber };

        console.log('updating person', changedPerson);
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')

            setNotificationMessage(`${personObject.name} was added successfully`);
            setNotificationType('success');

            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Update failed', error); // Log the error for debugging
            
            setNotificationMessage(`The person '${personObject.name}' was already deleted from the server`);
            setNotificationType('error');

            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setNotificationMessage(`${personObject.name} was added successfully`);
          setNotificationType('success');

          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .nuke(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));

          setNotificationMessage(`${person.name} was deleted successfully`);
          setNotificationType('success');
        })
        .catch(error => {
          setNotificationMessage(`Failed to delete ${person.name}. It might have already been removed.`);
          setNotificationType('error');
          
          setPersons(persons.filter(p => p.id !== id)); // Update state in case of stale data
        });
    }
  };

  const personsToShow = newFilter === ''
    ? persons  // Show all when filter is empty
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={notificationMessage} type={notificationType} />

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>Add a New Entry</h3>

      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default App;