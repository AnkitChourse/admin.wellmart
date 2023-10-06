import React, { useEffect, useState } from "react";
import "./ImagePicker.css";
import PropTypes from "prop-types";
import { Cancel } from "@mui/icons-material";
import { useMaterialUIController } from "context";
// import ArgonTypography from "components/ArgonTypography";
// import CancelIcon from "@mui/icons-material/Cancel";

const ImagePicker = ({
  images,
  setImages,
  name,
  multiple,
  isImageURLs,
  isImageURLsImages,
  ...rest
}) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  useEffect(() => {
    if (images && multiple && images?.length > 0) {
      const newImageURls = [];
      images && images?.forEach((image) => newImageURls.push(URL.createObjectURL(image)));
      setImageURLs(newImageURls);
    } else setImageURLs([]);

    if (images && typeof images === "object" && !multiple) {
      const newImageURLs = [];

      if (images instanceof File || images instanceof Blob) {
        newImageURLs.push(URL.createObjectURL(images));
        setImageURLs(newImageURLs);
      } else if (Array.isArray(images)) {
        images.forEach((image) => {
          if (image instanceof File || image instanceof Blob) {
            newImageURLs.push(URL.createObjectURL(image));
          }
        });

        setImageURLs(newImageURLs);
      }
    }
  }, [images]);

  function onImageChange(e) {
    if (e.target.files && e.target.files.length) {
      const files = Array.from(e.target.files);

      if (multiple) {
        setImages(files);
      } else {
        setImages(files[0]);
      }

      const newImageURLs = files?.map((file) => URL.createObjectURL(file));
      setImageURLs(newImageURLs);
    } else {
      setImages(null);
      setImageURLs([]);
    }
  }

  console.log(imageURLs);
  return (
    <div style={{ width: "100%" }}>
      <input
        type="file"
        id={name || "file"}
        name={name}
        className="custom-file-input"
        multiple={multiple ? true : false}
        accept="image/*"
        onChange={onImageChange}
        {...rest}
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {imageURLs &&
          imageURLs.map((imageSrc, i) => {
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "50px",
                    height: "50px",
                    margin: "0 0.5rem",
                  }}
                >
                  <img
                    className="Image"
                    key={i}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    src={imageSrc}
                  />
                </span>
                <span
                  className="cross"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (multiple) {
                      const temp = [...images];
                      temp.splice(i, 1);
                      setImages([...temp]);
                    } else setImages(null);
                    document.getElementById(name || "file").value = "";
                  }}
                >
                  <Cancel
                    sx={({ palette: { dark, white, info } }) => ({
                      color: darkMode ? white?.main : dark.main,
                    })}
                  />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImagePicker;

ImagePicker.propTypes = {
  setImages: PropTypes.array.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  multiple: PropTypes.string,
  images: PropTypes.any,
  isImageURLs: PropTypes.any,
  isImageURLsImages: PropTypes.any,
};

// : (isImageURLs &&
//   Object.entries(isImageURLs).map(([key, value], i) => {
//     // console.log(value, "value");
//     return (
//       <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
//         <span
//           style={{
//             display: "inline-block",
//             width: "50px",
//             height: "50px",
//             margin: "0 0.5rem",
//           }}
//         >
//           <img
//             className="Image"
//             key={i}
//             style={{ width: "100%", height: "100%" }}
//             src={`${process.env.REACT_APP_URI}/${value}`}
//           />
//         </span>
//       </div>
//     );
//   })) ||
// (isImageURLsImages &&
//   Object.entries(isImageURLsImages).map(([key, value], i) => {
//     // console.log(value, "value");
//     return (
//       value &&
//       value.map((isValue, index) => (
//         <div key={index} style={{ display: "flex", alignItems: "flex-start" }}>
//           <span
//             style={{
//               display: "inline-block",
//               width: "50px",
//               height: "50px",
//               margin: "0 0.5rem",
//             }}
//           >
//             <img
//               className="Image"
//               key={i}
//               style={{ width: "100%", height: "100%" }}
//               src={`${process.env.REACT_APP_URI}/${isValue}`}
//             />
//           </span>
//         </div>
//       ))
//     );
//   }))
