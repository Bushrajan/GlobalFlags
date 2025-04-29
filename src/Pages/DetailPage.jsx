import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        const foundCountry = data.find(c => c.cca2 === id);
        if (foundCountry) {
          setCountry({
            name: foundCountry.name?.common || "Unknown",
            officialName: foundCountry.name?.official || "N/A",
            flag: foundCountry.flags?.svg || "",
            region: foundCountry.region || "Unknown",
            subregion: foundCountry.subregion || "Unknown",
            population: foundCountry.population?.toLocaleString() || "Unknown",
            capital: foundCountry.capital?.[0] || "Unknown",
            currencies: Object.values(foundCountry.currencies || {}).map(c => c.name).join(", ") || "Unknown",
            languages: Object.values(foundCountry.languages || {}).join(", ") || "Unknown",
            timezones: foundCountry.timezones?.join(", ") || "Unknown",
            borders: foundCountry.borders?.join(", ") || "None",
            area: foundCountry.area ? `${foundCountry.area} km²` : "Unknown",
          });
        } else {
          setError("Country data not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching country details.");
        setLoading(false);
      });
  }, [id]);



  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("likeCount");
    return savedCount ? Math.max(parseInt(savedCount), 1) : 1;
  });

  useEffect(() => {
    // Jab count update ho, to local storage mein save karein
    localStorage.setItem("likeCount", count);
  }, [count]);

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading Data ...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          <h1 className="text-center fw-bold display-1" style={{ fontStyle: "oblique", fontFamily: "monospace" }}>{country.name}</h1>

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6 pt-1 mb-3  text-center">
              <div className="p-1">
                <img src={country.flag} alt={`${country.name} flag`} className=" mt-5 img-fluid rounded" />
                <div className="container mt-lg-4 mt-5 ">

                  <div>
                    <div>
                      <img src="/like.png" className="me-lg-3 rounded-circle" alt="Like" onClick={() => setCount(count + 1)} />
                      <span className="count">
                        <button className="px-2 m-1 btn">{count}</button>
                      </span>
                      <img
                        src="/dislike.png"
                        width={40}
                        className="me-lg-4 rounded-circle"
                        alt="Dislike"
                        onClick={() => setCount(count > 1 ? count - 1 : 1)} // 1 se neeche nahi jaayega
                      />
                    </div>
                    <img src="/facebook.png" width={40} className="ms-lg-3 m-2 rounded-circle" alt="img" />
                    <img src="/linkedin.png" width={40} className="ms-lg-3 m-2 rounded-circle" alt="img" />
                    <img src="/github.png" width={40} className="ms-lg-3 m-2 rounded-circle" alt="img" />
                    <img src="/whatsap.png" width={40} className="ms-lg-3 m-2 rounded-circle" alt="img" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 pt-1 px-lg-5 px-4 pt-5 mb-3 card mt-4 p-2 py-lg-4">
              <p className="display-6 text-center"><b>Official Name:</b> {country.officialName}</p>
              <p><b>Region:</b> {country.region}</p>
              <p><b>Subregion:</b> {country.subregion}</p>
              <p><b>Population:</b> {country.population}</p>
              <p><b>Capital:</b> {country.capital}</p>
              <p><b>Currency:</b> {country.currencies}</p>
              <p><b>Languages:</b> {country.languages}</p>
              <p><b>Timezones:</b> {country.timezones}</p>
              <p><b>Borders:</b> {country.borders}</p>
              <p><b>Area:</b> {country.area}</p>

            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn button2 p-3 btn-primary" onClick={() => navigate(-1)}>Go Back</button>
          </div>

          <div className="container mt-2 mb-2">
            <p className="text-center"> Made by Buhsra jan with love ✨ 💗 </p>
          </div>

        </>
      )}
    </div>
  );
};

export default DetailPage;
