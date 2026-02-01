import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (!res.ok) throw new Error("API Failed");

        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);


  const totalPages = Math.ceil(employees.length / rowsPerPage);


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentEmployees = employees.slice(indexOfFirstRow, indexOfLastRow);


  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>

        <span className="page-number">{currentPage}</span>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
