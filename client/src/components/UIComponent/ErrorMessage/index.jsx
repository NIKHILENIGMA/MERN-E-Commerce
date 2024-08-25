import React from "react";

export const ErrorMessage = ({ errors = [], className = "" }) => {
  return (
    errors?.length > 0 && (
      <div className={`${className}`}>{errors?.join(", ")}</div>
    )
  );
};
