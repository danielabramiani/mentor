import React from 'react';
import { Phone, Mail, Target, CheckCircle, AlertCircle } from 'lucide-react';

// სურათების იმპორტი
import bekaImg from '../assets/image/bf7be65e-70b9-4351-8eb8-e1c646f015e9.jpg'; 
import elgujaImg from '../assets/image/47797363-acd7-4d08-8442-fd27ebfb76de.jpg';
import ninoImg from '../assets/image/IMG_6095.jpg'; 

import '../css/Mentor.css';

const mentors = [
  {
    id: 1,
    name: "ბექა ხუფენია",
    role: "ადვოკატი / ექსპერტი - 33 წლიანი გამოცდილება",
    img: bekaImg,
    phone: "+995 555 12 34 56",
    email: "beka@lawcraft.ge",
    goals: ["პრაქტიკული უნარების განვითარება.", "საკვალიფიკაციო გამოცდებისთვის მომზადება."],
    behavior: ["33 წლიანი სამუშაო გამოცდილება.", "საადვოკატო პრაქტიკა და მასტერკლასები."],
    painPoints: ["თანამედროვე საკანონმდებლო მოთხოვნებთან ადაპტაცია."]
  },
  {
    id: 2,
    name: "ნინო გოგნიაშვილი",
    role: "იურიდიულ მეცნიერებათა დოქტორი / პროფესორი",
    img: ninoImg,
    phone: "+995 577 94 39 36",
    email: "n.gogniashvili@lawcraft.ge",
    goals: ["კრიმინალისტიკური მეთოდოლოგიის დაუფლება.", "სისხლის სამართლის პროცესის ანალიზი."],
    behavior: ["20-ზე მეტი სახელმძღვანელოს ავტორი.", "FBI-სა და აშშ-ს საელჩოს სერტიფიცირებული ტრენერი."],
    painPoints: ["თეორიული ცოდნის პრაქტიკული რეალიზაცია."]
  },
  {
    id: 3,
    name: "ელგუჯა მაკალათია",
    role: "სამართლის დოქტორანტი / ანტიკორუფციული ექსპერტი",
    img: elgujaImg,
    phone: "+995 577 50 10 66",
    email: "e.makalatia@lawcraft.ge",
    goals: ["საჯარო სამსახურის ეთიკის სწავლება.", "ანტიკორუფციული პოლიტიკის დანერგვა."],
    behavior: ["საჯარო სამსახურის ბიუროს ყოფილი ხელმძღვანელი.", "ინტელექტ-კლუბ 'რა? სად? როდის?' გუნდის კაპიტანი."],
    painPoints: ["ინტერესთა შეუთავსებლობის მართვა საჯარო სექტორში."]
  }
];

const MentorCard = () => {
  return (
    <section className="mentors-section" id="mentors" aria-labelledby="mentors-title">
      <h2 id="mentors-title" className="section-title">ჩვენი მენტორები</h2>
      
      <div className="mentors-container">
        {mentors.map((mentor, index) => (
          <article className={`mentor-item mentor-item-${index + 1}`} key={mentor.id}>
            <div className="mentor-card-content">
              <div className="info-side">
                <div className="text-container">
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <p className="mentor-role">{mentor.role}</p>

                  <div className="contact-row">
                    <span>
                      <Phone size={16} color="#c5a059" aria-hidden="true" /> 
                      <a href={`tel:${mentor.phone}`} aria-label={`დაურეკეთ ${mentor.name}-ს`}>{mentor.phone}</a>
                    </span>
                    <span>
                      <Mail size={16} color="#c5a059" aria-hidden="true" /> 
                      <a href={`mailto:${mentor.email}`} aria-label={`მისწერეთ ${mentor.name}-ს`}>{mentor.email}</a>
                    </span>
                  </div>

                  <div className="data-block">
                    <h4 className="data-title"><Target size={18} color="#1b263b" aria-hidden="true" /> მიზნები და მოტივაცია:</h4>
                    <ul>
                      {mentor.goals.map((goal, i) => <li key={i}>{goal}</li>)}
                    </ul>
                  </div>

                  <div className="data-block">
                    <h4 className="data-title"><CheckCircle size={18} color="#1b263b" aria-hidden="true" /> ძირითადი აქტივობები:</h4>
                    <ul>
                      {mentor.behavior.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>

                  <div className="data-block">
                    <h4 className="data-title"><AlertCircle size={18} color="#1b263b" aria-hidden="true" /> ფოკუსი:</h4>
                    <ul>
                      {mentor.painPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="image-side">
                <img 
                  src={mentor.img} 
                  alt={`${mentor.name} - ${mentor.role}`}
                  className="mentor-photo"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="500"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MentorCard;