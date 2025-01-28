const Header = ({name}) => {
  console.log("Header:", name)
  return (
    <h1>{name}</h1>
  )
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Total = ({parts}) => {
  return (
    <>
      <b>
        Total of {parts.reduce((sum, part) =>
          sum + part.exercises, 0)} exercises.
      </b>
    </>
  )
}

const Course = ({course}) => {
  console.log("Course:", course)

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 69,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
