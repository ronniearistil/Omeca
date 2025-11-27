import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackHomeButton = ({ label = "Go Back Home", ...props }) => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "text.primary",
                "&:hover": { color: "primary.main" }
            }}
            {...props}
        >
            {label}
        </Button>
    );
};

export default BackHomeButton;
