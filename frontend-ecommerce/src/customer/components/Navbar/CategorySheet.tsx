import { menLevelTwo } from "../../../data/category/LevelTwo/menLevelTwo";
import { menLevelThree } from "../../../data/category/LevelThree/menLevelThree";
import { womenLevelTwo } from "../../../data/category/LevelTwo/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/LevelTwo/electronicsLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/LevelTwo/homeFurnitureLevelTwo";
import { beautyLevelTwo } from "../../../data/category/LevelTwo/beautyLevelTwo";
import { womenLevelThree } from "../../../data/category/LevelThree/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/LevelThree/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/LevelThree/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/LevelThree/beautyLevelThree";
import { Box } from "@mui/material";

// Level 1 all header
// {
//     name: "Men",
//     categoryId: "men",
//     level: 1,
// },

// Level 2 all sub header based on parentCategoryName level1(name) && parentCategoryId - level 1(categoryId)
const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home: homeFurnitureLevelTwo,
  beauty: beautyLevelTwo,
};

// level 3 all category based on the level 2 header fk parentCategoryName level2(name) && parentCategoryId(categoryId)
const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home: homeFurnitureLevelThree,
  beauty: beautyLevelThree,
};

const CategorySheet = ({ selectedCategory }: any) => {
  const filterChildByHeaderCategoryId = (
    category: any,
    parentCategoryId: string
  ) => {
    if (category === null) return [];
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId
    );
  };

  return (
    <Box className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
      <div className="flex text-sm flex-wrap">
        {categoryTwo[selectedCategory].map((headerCategory, index) => (
          <div
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            {/* Main Category */}
            <p className="text-primary-color mb-5 font-semibold">
              {headerCategory.name}
            </p>
            <ul className="space-y-3">
              {
                // Categoriess
                filterChildByHeaderCategoryId(
                  categoryThree[selectedCategory],
                  headerCategory.categoryId
                ).map((category: any) => (
                  <div>
                    <li
                      key={category.name}
                      className="hover:text-primary-color cursor-pointer"
                    >
                      {category.name}
                    </li>
                  </div>
                ))
              }
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
