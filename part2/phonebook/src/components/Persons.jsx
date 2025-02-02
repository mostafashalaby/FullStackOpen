import Note from './Note'

const Persons = ({ personsToShow}) => {
    return (
        <ul>
        {personsToShow.map(person =>
          <Note key={person.name} note={person} />
        )}
      </ul>
    );
  };
  
  export default Persons