import { StyleSheet, Dimensions } from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { Colors } from "react-native-paper";
import Constants from "expo-constants";
import { or } from "react-native-reanimated";

const darkBlue = "#172041";
const cardBlue = "#1b2855";
const orange = "#ff7f00";
const gray = "#8d93a3";

const screenWidth = Dimensions.get("window").width;
// const primaryColor = "#151D3E";
// const secondaryColor = "#1E2456";
const primaryColor = darkBlue;
const secondaryColor = cardBlue;
const fontColor = "whitesmoke";
const font = "normal";
const fontSizeTitle = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    marginTop: Constants.statusBarHeight,
  },
  pageButton: {
    alignSelf: "flex-start",
  },
  pageButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textTransform: "none",
  },
  //-------------------navbar---------------------
  navBar: {
    backgroundColor: secondaryColor,
    width: screenWidth,
    height: 70,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    shadowColor: secondaryColor,
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 20,
  },
  navButton: {
    width: "20%",
    height: "100%",
    margin: 0,
    // backgroundColor:'white'
  },
  footer: {
    width: screenWidth,
    height: 70,
  },
  //-----------------------------------------------------------
  accordionHeader: {
    backgroundColor: secondaryColor,
    height: 50,
    width: screenWidth,
  },
  chartInterval: {
    color: "white",
    fontSize: 15,
    fontFamily: font,
    padding: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "ghostwhite",
    backgroundColor: "#222948",
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    width: "45%",
    height: 45,
    backgroundColor: orange,
    borderRadius: 14,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: "80%",
    alignSelf: "center",
  },
  //---------header-----------------------------
  topCard: {
    zIndex: 5,
    padding: 10,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: secondaryColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: secondaryColor,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerBall: {
    backgroundColor: orange,
    borderRadius: 20,
    color: "white",
  },
  catagory: {
    position: "absolute",
    right: 20,
    bottom: 10,
    fontFamily: font,
    fontSize: 20,
    backgroundColor: "transparent",
  },
  card: {
    backgroundColor: secondaryColor,
    height: 120,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    borderRadius: 10,
    padding: 0,
    shadowColor: secondaryColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  newsCard: {
    backgroundColor: secondaryColor,
    margin: 10,
    padding: 20,
  },
  stockNameView: {
    position: "absolute",
    top: 20,
    left: 65,
  },
  stockName: {
    fontSize: 14,
    fontFamily: font,
    fontWeight: "bold",
    color: "teal",
  },
  stockTicker: {
    color: fontColor,
    fontFamily: font,
    letterSpacing: 2,
    fontWeight: "normal",
    textTransform: "uppercase",
    fontSize: 10,
    margin: 0,
  },
  priceView: {
    height: "50px",
    width: "50px",
    borderColor: "whitesmoke",
    borderWidth: 2,
    position: "absolute",
    top: 5,
    right: 10,
  },
  price: {
    fontSize: 20,
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 10,
    color: fontColor,
    fontFamily: font,
  },
  percentage: {
    fontSize: 12,
    fontFamily: font,
  },
  green: {
    fontSize: 12,
    position: "absolute",
    top: 35,
    right: 10,
    color: "#95ff95",
    fontWeight: "bold",
  },
  red: {
    fontSize: 12,
    position: "absolute",
    top: 35,
    right: 10,
    color: "deeppink",
    fontWeight: "bold",
  },
  text: {
    fontSize: fontSizeTitle,
    fontFamily: font,
    color: fontColor,
    margin: 4,
  },
  textCenter: {
    fontSize: fontSizeTitle,
    fontFamily: font,
    color: fontColor,
    margin: 4,
    textAlign: "center",
  },
  centeredText: {
    fontSize: fontSizeTitle,
    fontFamily: font,
    color: fontColor,
  },
  titleText: {
    color: fontColor,
    fontFamily: font,
    letterSpacing: 3,
    fontWeight: "900",

    fontSize: fontSizeTitle,
    margin: 4,
  },
  newsTitle: {
    color: fontColor,
    fontFamily: font,
    fontWeight: "700",

    fontSize: fontSizeTitle,
    margin: 4,
  },
  image: {
    borderRadius: 25,
    borderColor: "gainsboro",
    resizeMode: "contain",
    height: 40,
    width: 40,
    margin: 10,
    // backgroundColor: "white",
  },
  detailsImage: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 40,
    resizeMode: "contain",
    justifyContent: "center",
    alignSelf: "center",
    height: 80,
    width: 80,
    // backgroundColor: "white",
  },
  avatarSmall: {
    margin: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: "contain",
  },
  footerText: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    color: fontColor,
  },
  rowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  //------------------------registration------------
  signupCard: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: secondaryColor,
    height: "62%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
  },
  topView: {
    width: screenWidth,
    height: 50,
    backgroundColor: "red",
  },
  input: {
    width: screenWidth - 80,
    height: 35,
    backgroundColor: "whitesmoke",
    marginTop: 8,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    padding: 7,
    borderRadius: 10,
  },
  buttonReg: {
    width: screenWidth / 2,
    height: 40,
    backgroundColor: orange,

    marginTop: "20%",
    marginRight: screenWidth / 4 - 20,
    marginLeft: screenWidth / 4 - 20,
    borderRadius: 13,
    // position: "absolute",
    // bottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  head1: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  head2: {
    color: "white",
    fontWeight: "100",
  },
  loadBar: {
    height: 4,
    width: screenWidth - 80,
    backgroundColor: "#8d93a3",
    marginLeft: 40,
    borderRadius: 50,
    marginBottom: 10,
  },
  loadBar2Compleated: {
    backgroundColor: orange,
    height: 4,
    width: (screenWidth - 80) / 4,
    borderRadius: 50,
  },
  loadBar3Compleated: {
    backgroundColor: orange,
    height: 4,
    width: ((screenWidth - 80) / 4) * 2,
    borderRadius: 50,
  },
  loadBar4Compleated: {
    backgroundColor: orange,
    height: 4,
    width: ((screenWidth - 80) / 4) * 3,
    borderRadius: 50,
  },
  loadBar5Compleated: {
    backgroundColor: orange,
    height: 4,
    width: screenWidth - 80,
    borderRadius: 50,
  },
  warning: {
    color: "red",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 20,
    fontSize: 14,
  },
  noWarning: {
    opacity: 0,
  },
  imageContainer: {
    // flex: 1,
    height: "28%",
    alignItems: "center",
    marginBottom: "2%",
    marginTop: 50,
  },
  bottomSubText: {
    color: "white",
    marginTop: 8,
    fontSize: 15,
  },
  hyperlinkText: {
    color: "#FF8001",
    fontWeight: "bold",
  },
  //--------------------menuscreen--------------------
  avatar: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: "cover",
    marginTop: 20,
  },
  menuName: {
    fontSize: 16,
    fontFamily: font,
    color: fontColor,
    marginTop: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  menuEmail: {
    fontSize: 14,
    fontFamily: font,
    color: "gray",
    textAlign: "center",
    fontWeight: "100",
    marginBottom: 10,
  },
  settingsButton: {
    width: "100%",
    height: 50,
    backgroundColor: secondaryColor,
    marginBottom: 2,
    paddingTop: 6,
  },
  settingsButtonTop: {
    width: "100%",
    height: 50,
    backgroundColor: secondaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 2,
    padding: 5,
    alignSelf: "flex-start",
  },
  settingsButtonBottom: {
    width: "100%",
    height: 50,
    backgroundColor: secondaryColor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    paddingTop: 6,
  },
  settingsCard: {
    marginLeft: 20,
    borderRadius: 10,
    marginRight: 20,
    marginTop: 20,
  },
  buttonTextSettings: {
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: orange,
  },
  logout: {
    alignSelf: "center",
    justifyContent: "center",
    width: "45%",
    height: 45,
    borderColor: orange,
    borderWidth: 2,
    borderRadius: 14,
    marginTop: 10,
  },
  logoutText: {
    color: orange,
    fontWeight: "bold",
  },
  //--------history---------
  cardHeader: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    color: gray,
  },
  cardDevider: {
    width: "100%",
    height: 2,
    backgroundColor: primaryColor,
  },
  cardHistory: {
    backgroundColor: secondaryColor,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 10,
    borderRadius: 10,
    padding: 0,
    shadowColor: secondaryColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  historyName: {
    fontSize: 19,
    color: "white",
  },
  historyAction: {
    fontSize: 10,
    color: "white",
    fontWeight: "100",
    color: gray,
  },
  historyValueBox: {
    position: "absolute",
    right: 10,
    height: "100%",

    justifyContent: "center",
  },
  historyValue: {
    fontWeight: "100",
    fontSize: 22,
    color: "white",
  },
});

const button = StyleSheet.create({
  default: {
    backgroundColor: "#151D3E",
  },
});

export { styles, button };
