import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { styles } from "../css/styles.js";
import AppButton from "../components/AppButton";
import Colors from "../utils/colors";
import useStatusBar from "../hooks/useStatusBar";

export default function WelcomeScreen({ navigation }) {
  useStatusBar("light-content");

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <AppButton
          style={styles.buttonText}
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Text style={styles.footerText}>Peak ltd. ™ - 2021</Text>
    </View>
  );
}

// import React, { useState } from "react";
// import { View, StyleSheet, Text, Image, TextInput } from "react-native";
// import { Button } from "react-native-paper";
// import { styles } from "../css/styles.js";
// import AppButton from "../components/AppButton";
// import Colors from "../utils/colors";
// import useStatusBar from "../hooks/useStatusBar";
// import { getUserId } from "../utils/functions";
// import { ScreenWidth } from "react-native-elements/dist/helpers";
// import { loginWithEmail } from "../components/Firebase/firebase";
// import * as firebase from "firebase";
// import "firebase/database";

// const db = firebase.firestore();

// export default function WelcomeScreen({ navigation }) {
//   const [phone, setPhone] = useState(" ");

//   const [errorStyle, setErrorStyle] = useState(styles.noWarning);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(
//     "email or password is invalid"
//   );
//   const [user, setUser] = useState();

//   useStatusBar("light-content");

//   // const userValid = () => {
//   //   getUserId().then((user) => {
//   //     if (user) {
//   //       setUser(true);
//   //     } else {
//   //       setUser(false);
//   //     }
//   //   });
//   // };
//   // userValid();

//   async function logginTapped() {
//     console.log(email);
//     if (email && password) {
//       try {
//         await loginWithEmail(email, password);
//       } catch (error) {
//         console.log(error.message);
//         setErrorStyle(styles.warning);
//       }
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View>
//         <View>
//           <Image
//             style={{
//               height: ScreenWidth / 3,
//               width: "33%",
//               marginTop: 40,
//               alignSelf: "center",
//               resizeMode: "contain",
//             }}
//             source={require("../assets/newLogo.png")}
//           />
//           <Image
//             style={{
//               height: ScreenWidth / 3,
//               width: "50%",

//               marginBottom: 0,
//               alignSelf: "center",
//               resizeMode: "contain",
//             }}
//             source={require("../assets/Logotext.png")}
//           />
//         </View>
//       </View>

//       <View>
//         <View style={styles.signupCard}>
//           <Text style={styles.head1}>Sign In</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             keyboardType="email-address"
//             onChangeText={(val) => setEmail(val)}
//           ></TextInput>

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry={true}
//             onChangeText={(val) => setPassword(val)}
//           ></TextInput>

//           <Text style={errorStyle}>{errorMessage}</Text>
//           <View
//             style={{
//               width: "80%",
//               alignSelf: "center",
//               paddingBottom: 20,
//             }}
//           >
//             <Button
//               title="Login"
//               style={{
//                 alignSelf: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                   textTransform: "none",
//                 }}
//               >
//                 Forgotten Password?
//               </Text>
//             </Button>
//             <Button
//               title="Login"
//               style={{
//                 width: "100%",
//                 height: 42,
//                 backgroundColor: "#ff7f00",
//                 alignSelf: "center",
//                 borderRadius: 15,
//                 justifyContent: "center",
//                 marginBottom: 10,
//               }}
//               onPress={() => logginTapped()}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                   textTransform: "none",
//                 }}
//               >
//                 Login
//               </Text>
//             </Button>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignSelf: "center",
//               }}
//             >
//               <View
//                 style={{ flexDirection: "column", justifyContent: "center" }}
//               >
//                 <Text style={{ color: "white" }}>Dont have an account?</Text>
//               </View>

//               <Button
//                 title="Login"
//                 style={{
//                   alignSelf: "center",
//                   justifyContent: "center",
//                   height: 25,
//                 }}
//                 onPress={() => navigation.navigate("Register")}
//               >
//                 <Text
//                   style={{
//                     color: "#ff7f00",
//                     textTransform: "none",
//                   }}
//                 >
//                   Sign Up
//                 </Text>
//               </Button>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }
