import React from 'react';
import { Gavel, Briefcase, ShieldAlert } from 'lucide-react';
import '../css/Course.css';

const CoursesList = () => {
  const courses = [
    { 
      id: "01", 
      title: "სამოქალაქო სამართალი", 
      subtitle: "კერძო ურთიერთობების მართვა",
      desc: "სანივთო, ვალდებულებითი და საოჯახო სამართლის სიღრმისეული ანალიზი. ისწავლეთ დავების გადაჭრის პრაქტიკული მეთოდები და სახელშეკრულებო სისტემების აგება.",
      image: "https://iuristi.com/uploads/posts/2022-12/ruleoflaw.jpg"
    },
    { 
      id: "02", 
      title: "ბიზნეს სამართალი", 
      subtitle: "კორპორაციული სტრატეგია",
      desc: "ბიზნესის სამართლებრივი მხარდაჭერა: კომპანიების დაფუძნებიდან რთულ კომერციულ გარიგებებამდე. კურსი მოიცავს საგადასახადო და სამეწარმეო სამართლის ასპექტებს.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"
    },
    { 
      id: "03", 
      title: "სისხლის სამართალი", 
      subtitle: "დაცვისა და ბრალდების ხელოვნება",
      desc: "დანაშაულის კვალიფიკაცია და საპროცესო გარანტიები. ჩვენი პროგრამა ორიენტირებულია სასამართლო უნარ-ჩვევების განვითარებასა და პრაქტიკული ქეისების განხილვაზე.",
      image: "https://beitrishvili.ge/wp-content/uploads/2024/07/%E1%83%A1%E1%83%98%E1%83%A1%E1%83%AE%E1%83%9A%E1%83%98%E1%83%A1-%E1%83%A1%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%97%E1%83%9A%E1%83%98%E1%83%A1-%E1%83%93%E1%83%90%E1%83%95%E1%83%94%E1%83%91%E1%83%98.jpg"
    }
  ];

  return (
    <section className="courses-premium-section" id="courses">
      <div className="section-header">
        <span className="section-badge">აკადემიური პროგრამები</span>
        <h2 className="premium-title">პოპულარული კურსები</h2>
      </div>
      
      <div className="courses-wrapper">
        {courses.map((course, index) => (
          <div key={index} className="premium-course-row">
            <div className="premium-text-side">
              <span className="course-number">{course.id}</span>
              <span className="premium-subtitle">{course.subtitle}</span>
              <h3 className="premium-course-title">{course.title}</h3>
              <div className="title-underline"></div>
              <p className="premium-desc">{course.desc}</p>
            </div>

            <div className="premium-image-side">
              <div className="image-frame">
                <img src={course.image} alt={course.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesList;