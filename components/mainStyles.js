import { StyleSheet } from "react-native";
import { theme } from "../assets/theme";

const styles = StyleSheet.create({
  productCard: {
    height: 470,
    width: 343,
    backgroundColor: "coral",
    borderRadius: 12,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  productCardTop: {
    minHeight: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingVertical: 10,
    flex: 1,
    marginBottom: 20,
  },
  colorContainer: {
    width: "45%",
    marginLeft: 3,
    alignItems: "flex-end",
    height: 300,
  },
  colors: {
    width: "80%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  colorList: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },

  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginBottom: 10,
  },
  chosenColorCircle: {
    borderWidth: 2,
    borderColor: "#999696",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 9,
  },
  colorPickerContainer: {
    flex: 1,
    position: "absolute",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#D4D0D0",
    width: 180,
    right: 50,
    zIndex: 1000,
  },
  colorPicker: {
    flex: 1,
    position: "absolute",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#D4D0D0",
  },
  chosenColor: {
    width: "100%",
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
    marginLeft: 25,
    marginTop: 25,
    backgroundColor: "#F8F7FAF1",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 168,
    height: 172,
    resizeMode: "contain",
    borderRadius: 8,
  },

  text: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.dark,
    paddingBottom: 19,
    flex: 1,
  },

  addImageButton: {
    position: "absolute",
    width: 27,
    height: 27,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: theme.colors.light,
    alignItems: "center",
    justifyContent: "center",
    bottom: 8,
    left: 15,
    zIndex: 1000,
  },
  addColorButton: {
    width: 30,
    height: 30,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },

  productCardBottom: {
    backgroundColor: theme.colors.gray,
    borderRadius: 12,
    flex: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },

  cardFooter: {
    flexDirection: "row",
  },
  cardFooterRight: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
  },
  cardFooterLeft: {
    flex: 1,

    paddingRight: 40,
    alignItems: "flex-end",
    paddingLeft: 40,
  },
  price: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  priceText: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  discount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  dropdownItem: {
    width: 90,
    height: 35,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dropdown: {
    marginRight: 6,
    width: 80,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 22,
    paddingLeft: 10,
  },

  addDropDown: {
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
    paddingVertical: 3,
    paddingHorizontal: 20,
    width: 75,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    borderRadius: 6,
    marginBottom: 22,
  },
  optionsContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    zIndex: 999,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "400",
  },
  item: {
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
    fontSize: 18,
  },
  priceIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    // fontSize: 18,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default styles;