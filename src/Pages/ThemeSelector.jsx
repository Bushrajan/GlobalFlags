import React, { useState, useEffect } from "react";

const ThemeSelector = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.body.style.background = themes[theme].background;
        document.body.style.color = themes[theme].textColor;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const themes = {
        dark:   { background: "#1E1E1E", textColor: "#FFFFFF" },
        light:  { background: "#F5F5F5", textColor: "#000000" },
        blue:   { background: "#007BFF", textColor: "#FFFFFF" },
        green:  { background: "#28A745", textColor: "#FFFFFF" },
        red:    { background: "#DC3545", textColor: "#FFFFFF" },
        yellow: { background: "#FFC107", textColor: "#000000" },
        orange: { background: "#FF5722", textColor: "#FFFFFF" },
        purple: { background: "#6A1B9A", textColor: "#FFFFFF" },
        teal:   { background: "#00897B", textColor: "#FFFFFF" },
        pink:   { background: "#E91E63", textColor: "#FFFFFF" },
        cyan:   { background: "#00BCD4", textColor: "#000000" },
        indigo: { background: "#3F51B5", textColor: "#FFFFFF" },
        lime:   { background: "#CDDC39", textColor: "#000000" },
        brown:  { background: "#795548", textColor: "#FFFFFF" },
        black:  { background: "#000000", textColor: "#FFFFFF" },
        gold:   { background: "#FFD700", textColor: "#000000" },
        silver: { background: "#C0C0C0", textColor: "#000000" },
        navy:   { background: "#001F3F", textColor: "#FFFFFF" },
        beige:  { background: "#F5F5DC", textColor: "#000000" },
        coral:  { background: "#FF7F50", textColor: "#FFFFFF" }
    };
    


    return (
        <>
            {/* Rotating Settings Icon */}
            <div
                className="settings-icon"
                onClick={() => setShowModal(true)}
            >
                ⚙️
            </div>

            {/* Theme Selection Modal */}
            {showModal && (
                <div className="modal show fade" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Theme Color 🤗</h5>
                                <button type="button" className="btn-close input" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    {Object.keys(themes).map((color) => (
                                        <button
                                            key={color}
                                            className="btn"
                                            style={{
                                                backgroundColor: themes[color].background,
                                                color: themes[color].textColor,
                                            }}
                                            onClick={() => setTheme(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};

export default ThemeSelector;
