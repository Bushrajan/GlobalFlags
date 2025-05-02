import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeSelector from "./ThemeSelector";

const NationFlags = () => {
  const [countries, setCountries] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(country => ({
          name: country.name?.common || "Unknown",
          flag: country.flags?.svg || "",
          code: country.cca2 || "XX"
        }));
        setCountries(formattedData);
        setSelectedFlag(formattedData[0]); // Default flag
      })
      .catch(error => console.error("Error fetching flags:", error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Har page per 10 flags
  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCountries = countries.slice(startIndex, startIndex + itemsPerPage);



  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Search ke result se first match selectedFlag banta hai
    const foundCountry = countries.find(country =>
      country.name.toLowerCase().includes(term)
    );

    if (foundCountry) {
      setSelectedFlag(foundCountry);
    }
  };
  const handleFlagClick = (country) => {
    setSelectedFlag(country);
  };

  return (
    <>
      <div className="container my-5">
        <ThemeSelector />
      </div>
      <div className=" mt-5 pt-5  text-center mx-auto p-1">

        <h1 className="display-1  text-center fw-bold h1"  >Welcome to &nbsp;
          <img src="/hero2.png" alt="img" className="img-fluid heroimage rounded-circle" /> Global Flags
        </h1>
      </div>

      <div className="row   py-lg-5  glow-effect px-lg-2 p-1 rounded-3 mb-5 mx-auto mt-5 pt-5 justify-content-center align-items-center">

        {/* Selected Flag (col-4) */}
        <div className="col-lg-4 pt-lg-5   big-image-container">
          {selectedFlag && (
            <>
              <h3 className="mt-3 display-3 " style={{ fontStyle: "oblique" }}>{selectedFlag.name}</h3>
              <img src={selectedFlag.flag} className="img-fluid mt-lg-3 mb-3" alt="Selected Flag" />
              <button className="btn btn-primary button2 p-3 mt-3"
                onClick={() => navigate(`/NationFlags-Detail/${selectedFlag.code}`)}
              >
                Explore More
              </button>

            </>
          )}
        </div>

        {/* Flag Grid & Sorting (col-8) */}
        <div className="col-lg-8 mx-auto text-center mt-5 mt-lg-0">
          <p className="display-6 fw-semibold">Find what you want ... 🕵</p>
          <div className="d-flex mb-5 gap-3">

            <input
              type="text"
              className="form-control input mt-lg-0 m-lg-3"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleSearch}
            />

          </div>

          <div className="d-flex flex-wrap">
            {currentCountries.map(country => (
              <div key={country.code} className="flag-bubble"
                data-name={country.name}
                onClick={() => handleFlagClick(country)}>
                <img src={country.flag} alt={`${country.name} flag`} />
              </div>
            ))}
          </div>


          <div className="pagination-container mt-4 mb-3 text-center">
            {/* Previous button */}
            <button
              className="btn btn-secondary mx-2 mb-3"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {/* Page number buttons (only previous, current, and next) */}
            {Array.from({ length: totalPages }, (_, index) => {
              if (
                index + 1 === currentPage ||
                index + 1 === currentPage - 1 ||
                index + 1 === currentPage + 1
              ) {
                return (
                  <button
                    key={index + 1}
                    className={`btn mx-1 mb-3 button3 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}

            {/* Next button */}
            <button
              className="btn btn-secondary mx-2 mb-3"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>


        </div>
      </div>




      <div className="container">
        <p className="text-center"> Made by Buhsra jan with love ✨ 💗 </p>
      </div>



    </>
  );
};

export default NationFlags;

