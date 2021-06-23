// import React, { useState } from "react";
// import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
// import { CheckBox, Text, LinearProgress } from "react-native-elements";
// import DropDownPicker from "react-native-dropdown-picker";
// import { Field } from "formik";

// // Stylesheets
// import { Sizes } from "../../../styles/sizes";

// // Components
// import SafeViewCentered from "../../../components/SafeViewCentered";
// import Form from "../../../components/Forms/Form";
// import FormField from "../../../components/Forms/FormField";
// import ActionButton from "../../../components/refined/Forms/ActionButton";
// import FormErrorMessage from "../../../components/Forms/FormErrorMessage";

// // Images
// import Logo from "../../../assets/PeakAppLogo.svg";

// import { IconButton, Colors, Button } from "react-native-paper";
// import { styles } from "../css/styles.js";
// //-------------firebase-------------
// import * as firebase from "firebase";
// import "firebase/database";
// const db = firebase.firestore();
// //-------------firebase-------------

// export default function RegisterScreen2({ navigation }) {

//   const [title, setTitle] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");

  // const [open, setOpen] = useState(false);
  // const [registerError, setRegisterError] = useState("");
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Mr", value: "Mr" },
  //   { label: "Ms", value: "Ms" },
  //   { label: "Mrs", value: "Mrs" },
  //   { label: "Dr", value: "Dr" },
  // ]);

//   function nextButtonPressed() {
//     if (value && firstName && lastName) {
//       firebase.auth().onAuthStateChanged((user) => {
//         db.collection("users")
//           .doc(user.uid)
//           .collection("userInfo")
//           .doc("signUp")
//           .set({
//             title: title,
//             firstName: firstName,
//             middleName: middleName,
//             lastName: lastName,
//             signUp: 3,
//           });
//       });
//       props.navigation.navigate("Register3");
//     }
//   }

//   return (
//     <SafeViewCentered style={{ backgroundColor: "#172040" }}>
      // <View style={internal_styles.imageContainer}>
      //   <Logo />
      // </View>
//       <LinearProgress
//         color="#FF8001"
//         value={0.4}
//         variant={"determinate"}
//         trackColor="#787D92"
//         style={{ width: "80%", alignSelf: "center", marginTop: "5%" }}
//       />
//       <View style={internal_styles.formContainer}>
//         <Text style={{ marginBottom: "5%" }}>
//           <Text h3 style={internal_styles.screenTitle}>
//             {" "}
//             Sign Up
//           </Text>
//           <Text style={{ color: "white", fontSize: 30 }}> | Step 2 of 5</Text>
//         </Text>
//         <Form
//           initialValues={{
//             firstName: "",
//             middleName: "",
//             lastName: "",
//           }}
//         >
          // <DropDownPicker
          //   open={open}
          //   value={value}
          //   items={items}
          //   setValue={setValue}
          //   setItems={setItems}
          //   setOpen={setOpen}
          // />

//           <FormField
//             name="firstName"
//             autoCapitalize="none"
//             placeholder="First Name"
//             autoFocus={true}
//             style={{ color: "white", height: 15 }}
//           />

//           <FormField
//             name="middleName"
//             autoCapitalize="none"
//             placeholder="Middle Names"
//             autoFocus={true}
//             style={{ color: "white", height: 15 }}
//           />

//           <FormField
//             name="lastName"
//             autoCapitalize="none"
//             placeholder="Last Name"
//             autoFocus={true}
//             style={{ color: "white", height: 15 }}
//           />

//           <Text style={{ color: "white" }}>
//             {" "}
//             <Text style={{ color: "#FF8001" }}>*</Text> These fields are
//             mandatory.
//           </Text>

//           <ActionButton
//             buttonStyles={internal_styles.actionButton}
//             textStyles={internal_styles.actionButtonText}
//             title={"Next"}
//             onPress={() => navigation.navigate("Register3")}
//           />
//           {<FormErrorMessage error={registerError} visible={true} />}
//         </Form>
//         <Text
//           style={{ color: "white", textAlign: "center", marginVertical: "5%" }}
//         >
//           Already have an account?
//           <Text
//             style={internal_styles.hyperlinkText}
//             onPress={() => navigation.navigate("Login")}
//           >
//             {" "}
//             Sign In
//           </Text>
//         </Text>
//       </View>
//     </SafeViewCentered>
//   );
// }

// const internal_styles = StyleSheet.create({
  // imageContainer: {
  //   flex: 1,
  //   height: "30%",
  //   alignItems: "center",
  //   marginBottom: "2%",
  // },
//   formContainer: {
//     flex: 1,
//     marginTop: "5%",
//     marginHorizontal: "3%",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: "2%",
//     backgroundColor: "#1B2754",
//   },
//   screenTitle: {
//     color: "white",
//     paddingLeft: "1%",
//   },
//   hyperlinkText: {
//     color: "#FF8001",
//     fontWeight: "bold",
//   },
//   actionButton: {
//     ...Sizes.medium,
//     height: 50,
//     borderRadius: 10,
//     marginHorizontal: "25%",
//     marginTop: "5%",
//     backgroundColor: "#FF8001",
//   },
//   actionButtonText: {
//     color: "white",
//   },
// });

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, TextInput, Text } from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "../assets/Peak-App-Logo.svg";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen2(props) {
  // const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [open, setOpen] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Dr", value: "Dr" },
  ]);

  const [firstStyle, setFirstStyle] = useState(styles.noWarning);
  const [lastStyle, setLastStyle] = useState(styles.noWarning);
  const [titleStyle, setTitleStyle] = useState(styles.noWarning);


function nextButtonPressed() {
  if (value && firstName && lastName) {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("users")
        .doc(user.uid)
        .collection("userInfo")
        .doc("signUp")
        .set({
          title: value,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          signUp: 3,
        });
    });
    props.navigation.navigate("Register3");
  }else{
    if(!value){
      setTitleStyle(styles.warning)
    }
    if(!firstName){
      setFirstStyle(styles.warning)
    }
    if(!lastName){
      setLastStyle(styles.warning)
    }
  }
}

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.imageContainer}>
        <Logo/>
      </View>
      <View style={styles.loadBar}>
        <View style={styles.loadBar2Compleated}></View>
      </View>
      <View style={styles.signupCard}>
        <Text style={styles.head1}>
          Sign Up <Text style={styles.head2}>| Step 2 of 5</Text>
        </Text>

        {/* <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(val) => setTitle(val)}
        ></TextInput> */}
                  <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
        
            style={styles.input}
            placeholder={'Select Your Title'}
          />
           <Text style={titleStyle}>please select your title</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name*"
          onChangeText={(val) => setFirstName(val)}
        ></TextInput>
           <Text style={firstStyle}>please fill in your first name</Text>
        <TextInput
          style={styles.input}
          placeholder="Middle Name (optional)"
          onChangeText={(val) => setMiddleName(val)}
        ></TextInput>
           <Text style={styles.warning}></Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name*"
          onChangeText={(val) => setLastName(val)}
        ></TextInput>
           <Text style={lastStyle}>please fill in your surname</Text>
        <Button
          style={styles.buttonReg}
          title="Next"
          onPress={() => {
            nextButtonPressed();
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Button>
        <View style={{justifyContent:'center',flexDirection:'row'}}>
                  <Text style={styles.bottomSubText}>Already hane an account? <Text style={{color:"#ff7f00"}}>Sign In</Text></Text>

        </View>

      </View>
    </SafeAreaView>
  );
}
