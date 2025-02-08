import Note from './Note'

const Persons = ({ personsToShow, handleDelete}) => {
    return (
        <ul>
        {personsToShow.map(person =>
          <Note key={person.name} note={person} handleDelete={() => handleDelete(person.id)}/>
        )}
      </ul>
    );
  };
  
  export default Persons