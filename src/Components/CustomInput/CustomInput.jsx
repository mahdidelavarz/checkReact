import React, { useState } from "react";
import icEye from "../Images/ic_eye.png"; // Import images directly
import icOffEye from "../Images/ic_off_eye.png";

// import CustomText from "../../../../../Components/CustomText/CustomText";

function CustomInput({
  style,
  placeholder,
  event,
  keyboardType,
  mode,
  autoCapitalize,
  onRef,
  onSubmitEditing,
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const inputRef = React.useRef(null);

  // Handle ref callback if provided
  React.useEffect(() => {
    if (onRef) {
      onRef({
        focus: () => inputRef.current.focus(),
      });
    }
  }, [onRef]);

  const onPressIsVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleSubmitEditing = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
    }
  };

  // Map keyboardType to HTML input types where applicable
  const inputType = mode === "password"
    ? "password"
    : keyboardType === "email-address"
    ? "email"
    : "text";

  return (
    <div className="relative">
      {mode === "password" && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          onClick={onPressIsVisiblePassword}
        >
          <img
            className="w-5 h-5 object-cover"
            src={isVisiblePassword ? icOffEye : icEye}
            alt={isVisiblePassword ? "Hide Password" : "Show Password"}
          />
        </button>
      )}
      <input
        ref={inputRef}
        className={`w-full h-8 rounded-full text-sm text-left p-2 bg-white border border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${style}`}
        placeholder={placeholder}
        onChange={(e) => event(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmitEditing()}
        type={mode === "password" && !isVisiblePassword ? "password" : inputType}
        autoCapitalize={autoCapitalize === "none" ? "off" : "on"}
      />
    </div>
  );
}

export default CustomInput;