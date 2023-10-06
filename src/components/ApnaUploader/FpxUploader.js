import React, { useEffect, useState } from "react";
import "./ImagePicker.css";
import PropTypes from "prop-types";
import ArgonTypography from "components/ArgonTypography";

const FpxUploader = ({ images, setImages, name, multiple }) => {
  // const [imageURLs, setImageURLs] = useState([]);

  // useEffect(() => {
  //     if (multiple && images.length > 0) {
  //         const newImageURls = [];
  //         images.forEach((image) => newImageURls.push(URL.createObjectURL(image)));
  //         setImageURLs(newImageURls);
  //     }

  //     if (typeof images == "object" && !multiple) {
  //         const newImageURls = [];
  //         newImageURls.push(URL.createObjectURL(images));
  //         setImageURLs(newImageURls);
  //     }
  // }, [images]);

  function onImageChange(e) {
    multiple ? setImages([...e.target.files]) : setImages(e.target.files[0]);
  }

  // console.log(imageURLs);
  return (
    <div>
      <input
        type="file"
        name={name}
        className="custom-file-input"
        multiple={multiple ? true : false}
        accept=".obj"
        onChange={onImageChange}
      />
      {/* {imageURLs.map((imageSrc, i) => {
                return (
                    <>
                        <img className="Image" key={i} src={imageSrc} />
                    </>
                );
            })} */}
    </div>
  );
};

export default FpxUploader;

FpxUploader.propTypes = {
  setImage: PropTypes.array.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  multiple: PropTypes.string,
};
