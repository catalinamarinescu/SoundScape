import { collection, addDoc } from "firebase/firestore";
import db from "./config/firebase";

const addLocation = async () => {
  try {
    await addDoc(collection(db, "locations"), {
      name: "Abbey Road Studios",
      country: "United Kingdom",
      coordinates: { lat: 51.5321, lng: -0.1773 },
    });
    console.log("Location added!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
