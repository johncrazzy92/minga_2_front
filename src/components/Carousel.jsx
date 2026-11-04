import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import ArrowNext from "./ArrowNext";
import ArrowBack from "./ArrowBack";

const Carousel = () => {
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0);

  async function getCategoriesData() {
    try {
      const { data } = await apiClient.get("/categories");
      const list = data.response || [];
      setCategories(list);

      // Preload images into memory cache immediately to eliminate switching delay
      list.forEach((cat) => {
        if (cat.character_photo) {
          const charImg = new Image();
          charImg.src = cat.character_photo;
        }
        if (cat.cover_photo) {
          const coverImg = new Image();
          coverImg.src = cat.cover_photo;
        }
      });
    } catch (error) {
      console.error("Error fetching categories for carousel:", error);
    }
  }

  useEffect(() => {
    getCategoriesData();
  }, []);

  const next = () =>
    categories.length > 0 && (counter < categories.length - 1 ? setCounter(counter + 1) : setCounter(0));
  const back = () =>
    categories.length > 0 && (counter <= categories.length - 1 && counter > 0
      ? setCounter(counter - 1)
      : setCounter(categories.length - 1));

  const currentCategory = categories[counter] || {};

  return (
    <div className="p-12 flex-col w-full bg-white hidden lg:flex">
      <div
        className="w-100 flex justify-between items-center p-8 transition-colors duration-500 ease-in-out rounded-2xl"
        style={{ backgroundColor: currentCategory.color || "#EF8481" }}
      >
        <ArrowBack onClick={back} />

        <div className="absolute flex gap-14">
          <img
            src={currentCategory.character_photo}
            alt={currentCategory.name || "Character Image"}
            className="relative left-6 h-64"
          />
          <img
            src={currentCategory.cover_photo}
            alt={currentCategory.name || "Manga image"}
            className="h-64 hidden rounded xl:block xl:relative bottom-8 left-10"
          />
        </div>
        <div className="flex w-4/5 flex-row-reverse h-48 items-center">
          <div className="flex w-3/6 flex-col">
            <h2 className="text-left text-lg font-bold inline-flex gap-10 text-white">
              {currentCategory.name}
            </h2>
            <p className="text-left text-white leading-2">
              {currentCategory.description}
            </p>
          </div>
        </div>
        <ArrowNext onClick={next} />
      </div>
    </div>
  );
};

export default Carousel;

