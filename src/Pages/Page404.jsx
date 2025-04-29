import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Page404 = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  }, []);

  return (
    <div className={` fullscreen-container ${showModal ? "blurred" : ""}`}>


      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop ">
          <div className="modal-box ">
            <div className="text-white text-center">
              <h2 className="display-1 fw-bold">Oops! Page Not Found</h2>
              <p className="title">Would you like to go back home?</p>
            </div>
            <div className=" d-flex mt-5 mb-5 align-items-center justify-content-center text-center mx-auto gap-3 ">
              <button
                className="btn button2 btn-primary mt-2"
                onClick={() => navigate("/")}
              >
                Yes, Take Me Home
              </button>
              <button
                className="btn button2 btn-primary mt-2"
                onClick={() => navigate("#")}
              >
                No, I don't wanna
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page404;
