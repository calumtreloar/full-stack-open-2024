const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      <Part course={course.parts} />
    </div>
  );
};

const Part = ({ course }) => {
  const total = course.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {course.map(part => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export { Course, Header, Content, Part };
