import React, { useEffect } from "react";

const Modal = ({ show, onClose, message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Close modal after 2 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [show, onClose]);

  return (
    <>
      {show && <div className="modal-overlay"></div>} {/* Dim Background */}
      <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
        <div
          class="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div class="flex items-start justify-between">
              <h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">Modal Title</h2>

              <button
                type="button"
                class="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-4">
              <p class="text-pretty text-gray-700"><h1 className="modal-title text-center fs-5 mb-3">{message}</h1>
                <img src="/tickImage.png" alt="Success" width={50} className="img-fluid" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
