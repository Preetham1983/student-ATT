// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css"; // Import CSS file

// const App = () => {
//     const [attendanceData, setAttendanceData] = useState(null);

//     useEffect(() => {
//         axios.get("https://attback.vercel.app/fetch-attendance")
//             .then((response) => {
//                 setAttendanceData(response.data.attendance);
//             })
//             .catch((error) => {
//                 console.error("Error fetching attendance data:", error);
//             });
//     }, []);

//     return (
//         <div className="container">
//             <h1 className="title">📊 Attendance Dashboard</h1>

//             {attendanceData ? (
//                 <>
//                     {/* Total Attendance Performance */}
//                     <div className="total-attendance" style={{ borderColor: attendanceData.overallattperformance.colorcode }}>
//                         <h2>Total Attendance: {attendanceData.overallattperformance.totalpercentage}%</h2>
//                     </div>

//                     {/* Subject-wise Attendance */}
//                     <div className="subjects-container">
//                         <h2>📚 Subject-wise Attendance</h2>
//                         <div className="subjects">
//                             {attendanceData.overallattperformance.overall.map((subject, index) => (
//                                 <div className="subject-card" key={index} style={{ borderLeft: `5px solid ${subject.colorcode1 || subject.colorcode2 || "#000"}` }}>
//                                     <h3>{subject.subjectname}</h3>
//                                     <p>📈 Percentage: {subject.percentage !== "--" ? `${subject.percentage}%` : "N/A"}</p>
//                                     <p>🛠 Practical: {subject.practical !== "--" ? `${subject.practical}%` : "N/A"}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Daily Attendance */}
//                     <div className="daily-attendance">
//                         <h2>📅 Daily Attendance</h2>
//                         {attendanceData.attandance.dayobjects.map((day, index) => (
//                             <div key={index} className="day-card">
//                                 <h3>{day.date} {day.day === "Today" ? "🔥" : ""}</h3>
//                                 <p>Updated on: {day.updatedon || "N/A"}</p>
//                                 <div className="sessions">
//                                     {Object.entries(day.sessions).map(([session, value]) => (
//                                        <span 
//                                        key={session} 
//                                        className={`session 
//                                            ${value === "0" ? "absent" : value === "2" ? "no-session" : "present"}`}
//                                    >
//                                        {session.toUpperCase()}: {value}
//                                    </span>

//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             ) : (
//                 <p className="loading">Loading attendance data...</p>
//             )}
//         </div>
//     );
// };

// export default App;

// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//     const [mobilenumber, setMobileNumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [attendance, setAttendance] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         setAttendance(null);

//         try {
//             const response = await axios.post("https://attback.vercel.app/fetch-attendance", {
//                 mobilenumber,
//                 password,
//             });

//             setAttendance(response.data.attendance);
//         } catch (err) {
//             setError(err.response?.data?.error || "Failed to fetch attendance");
//         }

//         setLoading(false);
//     };

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.heading}>📚 Student Attendance Portal</h2>
//             <form onSubmit={handleSubmit} style={styles.form}>
//                 <input
//                     type="text"
//                     placeholder="📱 Enter Mobile Number"
//                     value={mobilenumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     required
//                     style={styles.input}
//                 />
//                 <input
//                     type="password"
//                     placeholder="🔑 Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     style={styles.input}
//                 />
//                 <button type="submit" style={styles.button} disabled={loading}>
//                     {loading ? "⏳ Fetching..." : "📊 Get Attendance"}
//                 </button>
//             </form>

//             {error && <p style={styles.error}>❌ {error}</p>}

//             {attendance && (
//                 <div style={styles.resultCard}>
//                     <h3 style={styles.resultHeading}>✅ Attendance Data</h3>
//                     <pre style={styles.resultText}>{JSON.stringify(attendance, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// const styles = {
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//         color: "#fff",
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//         padding: "20px",
//     },
//     heading: {
//         fontSize: "24px",
//         marginBottom: "20px",
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "15px",
//         background: "#fff",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//         width: "100%",
//         maxWidth: "350px",
//     },
//     input: {
//         padding: "12px",
//         fontSize: "16px",
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//         outline: "none",
//         width: "100%",
//     },
//     button: {
//         padding: "12px",
//         fontSize: "18px",
//         background: "#ff9800",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         transition: "background 0.3s",
//     },
//     buttonHover: {
//         background: "#e68900",
//     },
//     error: {
//         color: "#ff4d4d",
//         marginTop: "10px",
//     },
//     resultCard: {
//         marginTop: "20px",
//         padding: "20px",
//         background: "#fff",
//         color: "#333",
//         borderRadius: "10px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//         maxWidth: "400px",
//         textAlign: "left",
//     },
//     resultHeading: {
//         fontSize: "20px",
//         marginBottom: "10px",
//     },
//     resultText: {
//         background: "#f5f5f5",
//         padding: "10px",
//         borderRadius: "5px",
//         overflowX: "auto",
//         fontSize: "14px",
//     },
// };

// export default App;
import React, { useState } from "react";
import axios from "axios";
import "./Attendance.css"; // Import CSS for better styling

const Attendance = () => {
    const [mobilenumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [attendance, setAttendance] = useState(null);
    const [error, setError] = useState("");
    const [selectedNumber, setSelectedNumber] = useState('');
    const phoneList = [
        { name: "Preetham", mobile: "9550022113" },
        { name: "Smaran", mobile: "9010300355" },
        { name: "Naveen", mobile:"9949094736" },
        {name:"Akshith",mobile:"9652202171"},
        {name:"Medha",mobile:"8639424389"}
        // Add more as needed
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setAttendance(null);

        try {
            const response = await axios.post("https://attback.vercel.app/fetch-attendance", {
                mobilenumber,
                password,
            });

            setAttendance(response.data.attendance);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch attendance");
        }
    };
    
    const handleNameSelection = (mobile) => {
        setMobileNumber(mobile);  // Auto-fill mobile number
        setPassword('neil@123');  // Set default password
    };

    return (
        <div className="attendance-page">
            <div className="card">
                <h2>📊 Fetch Your Attendance</h2>
                <form onSubmit={handleSubmit} className="form">
            <select
                className="input"
                value={selectedNumber}
                onChange={(e) => {
                    setSelectedNumber(e.target.value);
                    const selectedMobile = e.target.value;
                    handleNameSelection(selectedMobile);
                }}
            >
                <option value="">Select Phone Number</option>
                {phoneList.map((contact, index) => (
                    <option key={index} value={contact.mobile}>
                        {contact.name} ({contact.mobile})
                    </option>
                ))}
            </select>

            {/* Buttons */}
            <button type="submit" className="button">📌 Fetch Attendance</button>
            {/* <button
                type="button"
                className="button"
                onClick={handleSave}
            >
                💾 Save
            </button> */}
        </form>
                {error && <p className="error">{error}</p>}

                {/* Show attendance only after fetching */}
                {attendance && <AttendanceDetails attendance={attendance} />}
            </div>
        </div>
    );
};
const getProgressBarColor = (percentage) => {
    if (percentage > 65) return "green";
    if (percentage > 40) return "orange";
    return "red";
};

const getAttendanceColorClass = (percentage) => {
    if (percentage > 65) return "green-text";
    if (percentage > 40) return "orange-text";
    return "red-text";
};

// **Attendance Details Component**
const AttendanceDetails = ({ attendance }) => {
    if (!attendance) {
        return <p className="loading-text">Loading attendance data...</p>;
    }

    const { dayobjects, twoweeksessions } = attendance.attandance;
    const { overall, totalpercentage, colorcode } = attendance.overallattperformance;

    return (
        <div className="attendance-container">
            {/* Attendance Summary */}
            <div className="summary-card" style={{ borderColor: colorcode }}>
                <h2>Attendance Summary</h2>
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${totalpercentage}%`,
                            backgroundColor: getProgressBarColor(totalpercentage)
                        }}
                    ></div>
                </div>
                <p>
                    <strong>Total Attendance:</strong>
                    <span className={`attendance-number ${getAttendanceColorClass(totalpercentage)}`}>
                        {totalpercentage}%
                    </span>
                </p>
                <p>
                    <strong>Sessions in Last 2 Weeks:</strong> Present: {twoweeksessions.present},
                    Absent: {twoweeksessions.absent}, No Sessions: {twoweeksessions.nosessions}
                </p>
            </div>


            <div className="attendance-card">
                <h2>Attendance History</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                {[...Array(7)].map((_, idx) => (
                                    <th key={idx}>Session {idx + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dayobjects.map((day, index) => (
                                <tr key={index}>
                                    <td>{day.date}</td>
                                    {Object.values(day.sessions).map((session, idx) => (
                                        <td key={idx} className={session === "1" ? "present" : session === "2" ? "late" : "absent"}>
                                            <span className="circle">
                                                {session === "1" ? "✔" : session === "0" ? "✖" : "⭕"}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Subject-wise Attendance */}
            <h2>Subject-wise Attendance</h2>
            <div className="subject-container">
                {overall.map((subject, index) => (
                    <div key={index} className="subject-card" style={{ borderColor: subject.colorcode1 || subject.colorcode2 }}>
                        <h3>{subject.subjectname}</h3>
                        <p><strong>Percentage:</strong> {subject.percentage !== "--" ? `${subject.percentage}%` : "N/A"}</p>
                        <p><strong>Practical:</strong> {subject.practical !== "--" ? `${subject.practical}%` : "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Attendance;
