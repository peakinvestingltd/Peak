import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import User from "./screens/RegisterScreen";

const steps = [
  { id: "User" },
];


export default function MultiStepForm ({ navigation }{
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

    return(
        switch (id) {
        case "names":
            return <User {...props} />;
    )
};