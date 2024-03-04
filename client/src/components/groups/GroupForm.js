import { useState } from "react";
import {useFormik} from "formik"
import * as yup from "yup"

const GroupForm = ({ groupId, updateGroup }) => {
  const [errorMessage, setErrorMessage] = useState(null);


  const handleClick = () => {
    if (formik.isValid) {
      fetch("/api/user_groups", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: formik.values.message,
          group_id: groupId,
        }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to join group");
        }
      })
      .then((updatedGroup) => {
        updateGroup(updatedGroup, groupId);
        return fetch('/api/groups')
      })
      .then((res) => res.json())
      .then((newGroups) => {
        updateGroup(newGroups);
      })
      .catch((error) => {
        setErrorMessage("User is already a member of this group.")
      });
    }
  };

  const formSchema = yup.object().shape({
    message: yup.string().max(10, "message must be no longer than 10 characters.")
  })

  const formik = useFormik({
    initialValues:{
      message:""
    },
    validationSchema: formSchema
  })

  return (
    <div>
      {errorMessage && <p style={{ color:"red" }}>{errorMessage}</p>}
      {formik.errors && Object.values(formik.errors).map(error => <p style={{ color:"red" }}>{error}</p>)}
      <button onClick={handleClick}>Join Group</button>
      <div>
        <input
          type="text"
          name="message"
          className="group-form-input"
          value={formik.values.message}
          placeholder="Enter message"
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );
};

export default GroupForm;
