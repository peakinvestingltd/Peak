import { StyleSheet, Dimensions } from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { Colors } from "react-native-paper";

const darkBlue = "#172041";
const cardBlue = "#1b2855";
const orange = "#ff7f00";

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
    // justifyContent: "center",
  },
  navBar:{
backgroundColor:'red',
width:screenWidth,
height:70,
position:'absolute',
bottom:0,
borderTopLeftRadius:20,
borderTopRightRadius:20,
justifyContent:'space-evenly',
flexDirection:'row',
  },
  navButton:{
    width:'20%',
    height:'100%',
    borderWidth:1,
    borderColor:'blue',
    margin:0
    // backgroundColor:'white'
  },
  footer:{
    width:screenWidth,
    height:100,
  },
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
    padding: 10,
    backgroundColor: "gainsboro",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: "80%",
    alignSelf: "center",
  },
  topCard: {
    zIndex: 2,
    padding: 10,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: secondaryColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: secondaryColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
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
    padding: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
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
    textTransform: "uppercase",
    fontSize: fontSizeTitle,
    margin: 4,
  },
  newsTitle: {
    color: fontColor,
    fontFamily: font,
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: fontSizeTitle,
    margin: 4,
  },
  image: {
    borderRadius: 20,
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
  logout: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    width: "40%",
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.orange500,
    color: Colors.orange500,
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: "cover",
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
    height: '62%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position:'absolute',
    bottom:0,
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

    marginTop:'20%',
    marginRight: screenWidth / 4 - 20,
    marginLeft: screenWidth / 4 - 20,
    borderRadius: 13,
    // position: "absolute",
    // bottom: 20,
  },
  buttonText: {
    color: "white",
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
    marginBottom:10
  },
  loadBar2Compleated: {
    backgroundColor: orange,
    height: 4,
    width: ((screenWidth - 80) / 4),
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
    fontSize:14
  },
  noWarning:{
    opacity:0
  },
  imageContainer: {
    // flex: 1,
    height: "28%",
    alignItems: "center",
    marginBottom: "2%",
    marginTop:50
  },
  bottomSubText:{
    color:'white',
    marginTop:8,
    fontSize:15

  },
  hyperlinkText: {
    color: "#FF8001",
    fontWeight: "bold",
  },

});

const button = StyleSheet.create({
  default: {
    backgroundColor: "#151D3E",
  },
});

export { styles, button };
