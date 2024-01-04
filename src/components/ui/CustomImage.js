import React from "react";

const CustomImage = ({ src, alt, cssClass }) => {
  return <img src={src} alt={alt} height={70} width={70} />;
};

export default CustomImage;
