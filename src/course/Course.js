import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourse, addStudent, removeStudent, addSet, removeSet } from './actions';
import Header from '../app/Header';
import { Search } from '../search/Search';
import AddSetToCourse from './AddSetToCourse';
import AddStudent from './AddStudent';

export class Course extends Component {

  componentDidMount() {
    this.getUserClass(this.props.id);
  }

  getUserClass(id) {
    this.props.getCourse(id);
  }

  render() {
    const { history, course, addStudent, addSet } = this.props;
    let content = null;
    if (!course) {
      content = <div>Your class is currently empty.</div>;
    }
    else {
      // This makes it much easier to see what is happening in this
      // render function
      content = <CourseDetail course={course} onAddStudent={addStudent} onAddSet={addSet} />;
    }
    return (
      <div>
        <Header />
        <Search onSearch={(search) => {
          history.push(`/Teacher/search/${search}`);
        }} />
        {content}
      </div>
    );
  }
}

export default connect(
  state => {
    return { course: state.course };
  },
  { getCourse, addStudent, removeStudent, addSet, removeSet
  }
)(Course);

function CourseDetail({ course, onAddStudent, onAddSet }) {
  let sets = course.flashcardSets;
  return (
    <div>
      <div className="userContent">
        <h2>{course.title}</h2>


        <h3>Course Roster</h3>
        <p>Roster:{course.roster}</p>

        <AddStudent onAdd={onAddStudent} />
      </div>

      <div className="userContent">
        <h2>Course Flash Card Sets</h2>
        {sets.map(set => {
          return (
            <div key={set._id}>
              <h3><Link to={`/flashcardSets/${set._id}`}>{set.cardSet ? set.cardSet.name : ''}</Link></h3>
            </div>
          );
        })
        }
        <AddSetToCourse onAdd={(set) => onAddSet(course._id, set)} />
      </div>
    </div>
  );
}