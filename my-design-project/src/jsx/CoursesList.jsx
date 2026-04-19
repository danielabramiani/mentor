import React from 'react';
import { Gavel, Briefcase, ShieldAlert, ChevronRight } from 'lucide-react';
import '../css/Course.css';

const CoursesList = () => {
  const courses = [
    { 
      id: 1, 
      title: "სამოქალაქო სამართალი", 
      desc: "კერძო სამართლებრივი ურთიერთობების რეგულირება და პრაქტიკული მაგალითები.",
      icon: <Gavel size={32} />
    },
    { 
      id: 2, 
      title: "ბიზნეს სამართალი", 
      desc: "კორპორაციული სამართალი, ხელშეკრულებები და ბიზნესის სამართლებრივი მხარე.",
      icon: <Briefcase size={32} />
    },
    { 
      id: 3, 
      title: "სისხლის სამართალი", 
      desc: "დანაშაული და სასჯელი - თეორიული ცოდნა და საპროცესო დეტალების განხილვა.",
      icon: <ShieldAlert size={32} />
    }
  ];

  return (
    <section className="courses-section" id="courses">
      <h2 className="section-title">პოპულარული კურსები</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card-simple">
            <div className="course-icon-wrapper">
              {course.icon}
            </div>
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <button className="more-btn">
              ვრცლად <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesList;