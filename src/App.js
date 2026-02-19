import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Reading');
  const [darkMode, setDarkMode] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const addSession = (e) => {
    e.preventDefault();
    if (!subject || !hours || !date) return alert("Please fill all fields");
    
    const newSession = {
      id: Date.now(),
      subject,
      hours: parseFloat(hours),
      date,
      type
    };

    setSessions([...sessions, newSession]);
    setSubject(''); setHours(''); setDate('');
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const filteredSessions = sessions.filter(s => 
    s.subject.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);

  const subjectSummary = sessions.reduce((acc, s) => {
    acc[s.subject] = (acc[s.subject] || 0) + s.hours;
    return acc;
  }, {});

  return (
    <div className={`page-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        
        <div className="header-row">
          <h1>Study Time Tracker</h1>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Input Form Area */}
        <form className="input-group" onSubmit={addSession}>
          <input type="text" placeholder="Subject Name" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <input type="number" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Reading">Reading</option>
            <option value="Assignment">Assignment</option>
            <option value="Revision">Revision</option>
            <option value="Exam Prep">Exam Prep</option>
          </select>
          <button type="submit" className="add-btn">Add</button>
        </form>

        <div className="search-row">
          <input 
            type="text" 
            className="search-input" 
            placeholder="🔍 Search by subject..." 
            onChange={(e) => setFilterQuery(e.target.value)} 
          />
        </div>

        <div className="layout-grid">
          {/* Left Column: List */}
          <div className="content-card list-area">
            <h2>Recent Sessions</h2>
            {filteredSessions.length === 0 ? (
              <p className="empty-msg">No sessions added yet.</p>
            ) : (
              <div className="session-list">
                {filteredSessions.map(s => (
                  <div key={s.id} className="session-pill">
                    <div className="session-info">
                      <span className="pill-subject">{s.subject}</span>
                      <span className="pill-type">{s.type}</span>
                      <span className="pill-details">{s.hours} hrs • {s.date}</span>
                    </div>
                    <button className="del-icon" onClick={() => deleteSession(s.id)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Summary Card */}
          <div className="content-card summary-area">
            <h2>Summary</h2>
            <div className="summary-stat">
              <label>Total Study Time:</label>
              <span>{totalHours} hours</span>
            </div>
            <hr />
            <h3>By Subject:</h3>
            <div className="subject-breakdown">
              {Object.entries(subjectSummary).length === 0 ? (
                <p className="empty-msg-small">No data available</p>
              ) : (
                Object.entries(subjectSummary).map(([name, hrs]) => (
                  <div key={name} className="subject-row">
                    <span>{name}</span>
                    <strong>{hrs} hrs</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;