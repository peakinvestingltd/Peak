import React, { useState } from "react";
import { views, texts, images, buttons } from "../css/styles.js";
import { Transitioning, Transition } from "react-native-reanimated";
import {
  getBalance,
  getSignUpProgress,
  getISAAccount,
  getPeakAccount,
} from "../utils/functions";
import {
  Button,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  Dimensions,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as Progress from "react-native-progress";
import * as firebase from "firebase";
import "firebase/database";
export let userBalance = "Wallet";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Change />
    <Transition.Out type="fade" duration={400} />
  </Transition.Together>
);

export default function Header(props) {
  const ref = React.useRef();
  const [headerStyle, setHeaderStyle] = useState(views.header);
  const [expanded, setExpanded] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("practice");
  const [selectedBox, setSelectedBox] = useState("one");
  const [selectedFunds, setSelectedFunds] = useState("0");
  const [practiceFunds, setPracticeFunds] = useState(null);
  const [account, setAccount] = useState("practice account");
  const [signUp, setSignUp] = useState(null);
  const [isaCalled, setIsaCalled] = useState(false);

  const [isaActive, setIsaActive] = useState(false);
  const [peakActive, setPeakActive] = useState(false);

  function setStyle(box, selected, unselected) {
    if (box == selectedBox) {
      return selected;
    } else {
      return unselected;
    }
  }
  function getProgress() {
    firebase.auth().onAuthStateChanged((user) => {
      getSignUpProgress(user.uid).then((res) => {
        setSignUp(res);
      });
    });
  }
  if (!signUp) {
    firebase.auth().onAuthStateChanged((user) => {
      getSignUpProgress(user.uid).then((res) => {
        setSignUp(res);
      });
    });
  }
  function triggerGetBalance() {
    if (selectedBox == "one") {
      firebase.auth().onAuthStateChanged((user) => {
        getBalance(user).then((bal) => {
          setSelectedFunds(bal.toFixed(2));
          setPracticeFunds(
            `£${bal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
          );
        });
      });
    }
  }
  function setCardBalance(account) {
    return practiceFunds;
  }
  function setFunds() {
    if (selectedFunds == "loading...") {
      triggerGetBalance();
      return selectedFunds;
    }

    return `£${selectedFunds.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  }
  function text() {
    return "10";
  }
  function signUpProgress() {
    if (signUp && signUp != "compleat") {
      (signUp - 1) / 5;
      return (
        <TouchableOpacity
          onPress={() => {
            setHeaderStyle(views.header);
            setExpanded(false);
            props.navigation.navigate(`Register${signUp}`);
          }}
        >
          <View style={{ margin: 10 }}>
            <View style={views.rowCenter}>
              <Progress.Circle
                progress={(signUp - 1) / 5}
                size={50}
                showsText={true}
                color={"#ff7f00"}
                borderWidth={1}
                formatText={() => `${(signUp - 1) * 20}%`}
              />
            </View>
            <View style={views.rowCenter}>
              <Text style={texts.white15}>Continue sign up!</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
  const portfolio = () => {
    const profile = (
      <View>
        <View style={images.peakLogo}>
          <Image
            source={require("../assets/newLogo.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View style={images.peakLogo}>
          <Text style={texts.white30}>Peak Wallet</Text>
        </View>

        {signUpProgress()}

        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setAccount("practice account");
                setSelectedBox("one");
              }}
            >
              <View
                style={setStyle("one", views.GIACard, views.GIACardUnselected)}
              >
                <View style={views.hight50}>
                  <View style={views.transparentBlack} />
                  <Image
                    source={require("../assets/wallet.png")}
                    style={images.smallCircle}
                  />
                </View>

                <View style={views.accountCard}>
                  <View>
                    <Text style={texts.white25}>
                      {setCardBalance("practice")}
                    </Text>
                    <Text style={texts.white20}>Practice account</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isaActive) {
                  setAccount("ISA account");
                  setSelectedBox("two");
                } else {
                  console.log("you need to activete your isa account");
                  props.navigation.navigate("ISA");
                }
              }}
            >
              <View
                style={setStyle("two", views.ISACard, views.ISACardUnselected)}
              >
                <View style={views.hight50}>
                  <View style={views.transparentBlack} />
                  <Image
                    source={require("../assets/wallet.png")}
                    style={images.smallCircle}
                  />
                </View>
                <View style={views.accountCard}>
                  <View>
                    <Text style={texts.white30}>Open Account</Text>
                    <Text style={texts.white20}>ISA account</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (peakActive) {
                  setAccount("peak account");
                  setSelectedBox("three");
                } else {
                  console.log("you need to activete your peak account");
                  props.navigation.navigate("Peak");
                }
              }}
            >
              <View
                style={setStyle(
                  "three",
                  views.practiceCard,
                  views.practiceCardUnselected
                )}
              >
                <View style={views.hight50}>
                  <View style={views.transparentBlack} />
                  <Image
                    source={require("../assets/wallet.png")}
                    style={images.smallCircle}
                  />
                </View>
                <View style={views.accountCard}>
                  <View>
                    <Text style={texts.white30}>Coming soon!</Text>
                    <Text style={texts.white20}>Peak account</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={views.twoButtons}>
          <Button
            onPress={() => {
              console.log("deposit");
            }}
            style={buttons.orangeFill}
            mode="contained"
          >
            Deposit
          </Button>
          <Button
            marginLeft={10}
            color={"#ff7f00"}
            style={buttons.noFill}
            onPress={() => {
              console.log("withdraw");
            }}
          >
            Withdraw
          </Button>
        </View>
      </View>
    );
    if (expanded == true) {
      return profile;
    }
  };

  return (
    <Transitioning.View ref={ref} transition={transition} style={headerStyle}>
      {/* <Title style={styles.titleText}>Portfolio balance</Title> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 70,
        }}
      >
        <IconButton
          onPress={() => Linking.openURL("https://www.peakinvesting.co.uk")}
          icon="chat-outline"
          color={"#ff7f00"}
          size={22}
        />
        <View>
          <Button
            mode="outlined"
            style={{ backgroundColor: "orange" }}
            color={"#ffffff"}
            onPress={() => {
              if (!isaCalled) {
                firebase.auth().onAuthStateChanged((user) => {
                  setIsaCalled(true);
                  getISAAccount(user).then((res) => {
                    console.log(res);
                    if (res.isActive) {
                      console.log("there is an ISA account");
                      setIsaActive(true);
                    } else {
                      console.log("there is no ISA account");
                      setIsaActive(false);
                    }
                  });
                  getSignUpProgress(user.uid).then((res) => {
                    setSignUp(res);
                  });
                  getPeakAccount(user).then((res) => {
                    console.log(res);
                    if (res.isActive) {
                      console.log("there is an peak account");
                      setPeakActive(true);
                    } else {
                      console.log("there is no peak account");
                      setPeakActive(false);
                    }
                  });
                  getSignUpProgress(user.uid).then((res) => {
                    setSignUp(res);
                  });
                });
              }
              // getProgress();
              triggerGetBalance();
              ref.current.animateNextTransition();
              if (headerStyle == views.header) {
                setHeaderStyle(views.headerExpanded);
                setExpanded(true);
              } else {
                setHeaderStyle(views.header);
                setExpanded(false);
              }
            }}
          >
            {account}
          </Button>
        </View>
        <IconButton icon="bell-outline" color={"#ff7f00"} size={22} />
      </View>
      {portfolio()}
    </Transitioning.View>
  );
}
