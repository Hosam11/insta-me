import { StyleSheet } from 'react-native';

global.secColor = "#FFCDA3";
global.primaryColor = "#425C5A"
global.heartFillColor = "#FF0404"
global.heartEmptyColor = "#FFFFFF"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        fontFamily: "",
        color: global.secColor,
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white",
    },

    loginBtn: {
        width: "80%",
        backgroundColor: global.secColor,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: global.primaryColor
    },

    a_row: {
        flexDirection: "row",

    }


});

export { styles }   
