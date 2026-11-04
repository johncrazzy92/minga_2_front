import { uuidv4 } from "@firebase/util";
import { initializeApp, getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_DEV_MOCK_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "minga-69542.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "minga-69542",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "minga-69542.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "453662409047",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:453662409047:web:dev_mock_id",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const firestorage = getStorage(app);

export async function uploadImg(img, path) {
  try {
    const storageRef = ref(firestorage, `${path}/${uuidv4()}`);
    await uploadBytes(storageRef, img);
    const imgUrl = await getDownloadURL(storageRef);
    return imgUrl;
  } catch (error) {
    console.warn("Firebase upload failed, using fallback placeholder URL:", error.message);
    return `https://placehold.co/600x800?text=${encodeURIComponent(path || "manga")}`;
  }
}
