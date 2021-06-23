import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Text, LinearProgress } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import { registerWithEmail } from "../components/Firebase/firebase";

// Stylesheets
import { Sizes } from "../css/size";

// Components
import SafeViewCentered from "../components/SafeViewCentered";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import ActionButton from "../components/Forms/ActionButton";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import FormButton from "../components/Forms/FormButton";

// Images
import Logo from "../assets/Peak-App-Logo.svg";

export default function RegisterScreen({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [registerError, setRegisterError] = useState("");

  async function handleSubmit(vaules) {
    const { email, password } = vaules;
    try {
      await registerWithEmail(email, password).then(() => {
        props.navigation.navigate("Register2");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeViewCentered style={{ backgroundColor: "#172040" }}>
      <View style={internal_styles.imageContainer}>
        <Logo />
      </View>
      <LinearProgress
        color="#FF8001"
        value={0.2}
        variant={"determinate"}
        trackColor="#787D92"
        style={{ width: "80%", alignSelf: "center", marginTop: "5%" }}
      />
      <View style={internal_styles.formContainer}>
        <Text h3 style={internal_styles.screenTitle}>
          Sign Up
        </Text>
        <Form
          initialValues={{
            username: "",
            email: "",
            contact: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <FormField
            name="username"
            autoCapitalize="none"
            placeholder="Username"
            autoFocus={true}
            style={{ color: "white", height: 15 }}
          />

          <FormField
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={{ color: "white", height: 15 }}
          />

          <FormField
            name="contact"
            placeholder="Phone Number"
            style={{ color: "white", height: 15 }}
          />

          <FormField
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            style={{ color: "white", height: 15 }}
          />

          <FormField
            name="confirmPassword"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            style={{ color: "white", height: 15 }}
          />

          <CheckBox
            Component={TouchableWithoutFeedback}
            containerStyle={{
              backgroundColor: "#1B2754",
              borderColor: "#1B2754",
            }}
            checked={checked}
            checkedColor={"#FF8001"}
            uncheckedColor={"#FF8001"}
            title={
              <Text
                style={{
                  backgroundColor: "#1B2754",
                  color: "white",
                  width: "94%",
                  marginVertical: "2%",
                }}
              >
                By signing up you accept the
                <Text style={internal_styles.hyperlinkText}>
                  {" "}
                  Terms of Service
                </Text>{" "}
                and
                <Text style={internal_styles.hyperlinkText}>
                  {" "}
                  Privacy Policy
                </Text>
              </Text>
            }
            onIconPress={() => {
              setChecked(!checked);
            }}
          />

          <FormButton
            buttonStyles={internal_styles.actionButton}
            textStyles={internal_styles.actionButtonText}
            title={"Sign Up"}
            // onPress={() => {
            //   navigation.navigate("Register2");
            // }}
          />
          {<FormErrorMessage error={registerError} visible={true} />}
        </Form>
        <Text
          style={{ color: "white", textAlign: "center", marginVertical: "5%" }}
        >
          Already have an account?
          <Text
            style={internal_styles.hyperlinkText}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Sign In
          </Text>
        </Text>
      </View>
    </SafeViewCentered>
  );
}

const internal_styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: "30%",
    alignItems: "center",
    marginBottom: "2%",
  },
  formContainer: {
    flex: 1,
    marginTop: "5%",
    marginHorizontal: "3%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: "2%",
    backgroundColor: "#1B2754",
  },
  screenTitle: {
    color: "white",
    paddingLeft: "1%",
  },
  hyperlinkText: {
    color: "#FF8001",
    fontWeight: "bold",
  },
  actionButton: {
    ...Sizes.medium,
    height: 50,
    borderRadius: 10,
    marginHorizontal: "25%",
    marginTop: "5%",
    backgroundColor: "#FF8001",
  },
  actionButtonText: {
    color: "white",
  },
});

// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   TextInput,
//   Button,
//   Text,
// } from "react-native";
// import { IconButton, Colors } from "react-native-paper";
// import * as Yup from "yup";

// import { styles } from "../css/styles.js";
// import SafeView from "../components/SafeView";
// import Form from "../components/Forms/Form";
// import FormField from "../components/Forms/FormField";
// import FormButton from "../components/Forms/FormButton";
// import FormErrorMessage from "../components/Forms/FormErrorMessage";
// import { registerWithEmail } from "../components/Firebase/firebase";
// import useStatusBar from "../hooks/useStatusBar";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import {
//   launchCamera,
//   launchImageLibrary,
//   ImagePicker,
// } from "react-native-image-picker";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required().label("Name"),
//   email: Yup.string()
//     .required("Please enter a valid email")
//     .email()
//     .label("Email"),
//   password: Yup.string()
//     .required()
//     .min(6, "Password must have at least 6 characters")
//     .label("Password"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Confirm Password must match Password")
//     .required("Confirm Password is required"),
// });

// export default function RegisterScreen({ navigation }) {
//   useStatusBar("light-content");
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };
//   const [passwordVisibility, setPasswordVisibility] = useState(true);
//   const [rightIcon, setRightIcon] = useState("eye");
//   const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("eye");
//   const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
//     useState(true);
//   const [registerError, setRegisterError] = useState("");

//   function handlePasswordVisibility() {
//     if (rightIcon === "eye") {
//       setRightIcon("eye-off");
//       setPasswordVisibility(!passwordVisibility);
//     } else if (rightIcon === "eye-off") {
//       setRightIcon("eye");
//       setPasswordVisibility(!passwordVisibility);
//     }
//   }

//   function selectFile() {
//     var options = {
//       title: "Select Image",
//       customButtons: [
//         {
//           name: "customOptionKey",
//           title: "Choose file from Custom Option",
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };

//     ImagePicker.showImagePicker(options, (res) => {
//       console.log("Response = ", res);

//       if (res.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (res.error) {
//         console.log("ImagePicker Error: ", res.error);
//       } else if (res.customButton) {
//         console.log("User tapped custom button: ", res.customButton);
//         alert(res.customButton);
//       } else {
//         let source = res;
//         this.setState({
//           resourcePath: source,
//         });
//       }
//     });
//   }

//   function handleConfirmPasswordVisibility() {
//     if (confirmPasswordIcon === "eye") {
//       setConfirmPasswordIcon("eye-off");
//       setConfirmPasswordVisibility(!confirmPasswordVisibility);
//     } else if (confirmPasswordIcon === "eye-off") {
//       setConfirmPasswordIcon("eye");
//       setConfirmPasswordVisibility(!confirmPasswordVisibility);
//     }
//   }

//   async function handleOnSignUp(values, actions) {
//     const { email, password } = values;
//     try {
//       await registerWithEmail(email, password).then(() => {
//         props.navigation.navigate("Register2");
//       });
//     } catch (error) {
//       setRegisterError(error.message);
//     }
//   }

//   return (
//     <SafeView style={styles.container}>
//       <Form
//         initialValues={{
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => handleOnSignUp(values)}
//       >
//         <FormField
//           style={{ fontFamily: "Futura", width: "80%" }}
//           name="name"
//           leftIcon="account"
//           placeholder="Enter username"
//           autoFocus={false}
//         />
//         <FormField
//           style={{ fontFamily: "Futura", width: "80%" }}
//           name="email"
//           leftIcon="email"
//           placeholder="Enter email"
//           autoCapitalize="none"
//           keyboardType="email-address"
//           textContentType="emailAddress"
//         />
//         <FormField
//           style={{ fontFamily: "Futura", width: "80%" }}
//           name="password"
//           leftIcon="lock"
//           placeholder="Enter password"
//           autoCapitalize="none"
//           autoCorrect={false}
//           secureTextEntry={passwordVisibility}
//           textContentType="password"
//           rightIcon={rightIcon}
//           handlePasswordVisibility={handlePasswordVisibility}
//         />
//         <FormField
//           style={{ fontFamily: "Futura", width: "80%" }}
//           name="confirmPassword"
//           leftIcon="lock"
//           placeholder="Confirm password"
//           autoCapitalize="none"
//           autoCorrect={false}
//           secureTextEntry={confirmPasswordVisibility}
//           textContentType="password"
//           rightIcon={confirmPasswordIcon}
//           handlePasswordVisibility={handleConfirmPasswordVisibility}
//         />

//         <FormButton title={"Register"} />
//         {<FormErrorMessage error={registerError} visible={true} />}
//       </Form>

//       <IconButton
//         style={styles.backButton}
//         icon="keyboard-backspace"
//         color={Colors.white}
//         size={30}
//         onPress={() => navigation.goBack()}
//       />
//     </SafeView>
//   );
// }
