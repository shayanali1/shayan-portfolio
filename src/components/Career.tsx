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
              Building and maintaining full stack web applications end-to-end.
              Working with React, Node.js, Python, and Flask to deliver
              production-ready features and solutions. Collaborating with teams
              to ship quality code.
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
              Studying Computer Science with a
              focus on software engineering, web technologies, and machine
              learning. Building real-world projects alongside academics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
