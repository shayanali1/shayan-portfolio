import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Full Stack Developer</h4>
                <h5>1-2 Years Experience</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Working on full stack apps day-to-day — writing React components,
              building APIs with Flask and Node.js, debugging stuff that breaks
              at 5pm on a Friday. It's been a solid learning curve and I'm
              enjoying every bit of it.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BS Computer Science</h4>
                <h5>Iqra University</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              CS undergrad with a focus on software engineering and web tech.
              Picked up Python, data structures, and machine learning along
              the way — but most of what I know came from building things
              outside the classroom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
