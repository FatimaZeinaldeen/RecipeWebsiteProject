import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import profile from "../../assets/photos/feedback&reviewsuserPhoto.jpg";
import styles from "./user.module.css";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userid = localStorage.getItem("userId");
  const [name, setName] = useState("");
  // const [country,setCountry]=useState("");
  const [biography, setBiography] = useState("");
  // const [countrySrc,setCountrySrc]=useState("");
  const [recipeArray, setRecipeArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Edit");
  const textAreaRef = useRef(null);
  // const countryContext = require.context(
  //   "../../assets/Images/",
  //   false,
  //   /\.(png)$/ // Specify the file extension you want to include
  // );
  // const countryArray=countryContext.keys();

  // const countryImg = countryArray.filter(item => item.includes(country));
  // const countryPath="../../assets/Images/"+countryImg[0].split("/")[1];
  useEffect(() => {
    getUser();
    getRecipes();
  });
  const handleLogout=async()=>{
    try{
      await axios.post(`http://localhost:3000/User/Logout/${id}`);
      localStorage.removeItem("userId");
      window.location.reload();
    }catch(error){
      console.log(error)
    }
    
  }
  const getUser = async () => {
    const user = await axios.get(`http://localhost:3000/User/profile/${id}`);
    setBiography(user.data.biography);
    // setCountry(user.data.country);
    setName(user.data.fullName);
    //  if (countryPath) {
    //   setCountrySrc(countryContext(countryPath));
  };
  const getRecipes = async () => {
    const response = await axios.get(`http://localhost:3000/Recipe/user/${id}`);
    setRecipeArray(response.data);
  };
  const handleEdit = () => {
    if (text === "Edit") {
      setText("Save");
      setIsEditing(true);
    } else {
      setText("Edit");
      setIsEditing(false);
    }
    if (setIsEditing) {
      updateBio();
    }
  };
  const updateBio = async () => {
    const data = {
      biography: biography,
    };
    const response = await axios.put(
      `http://localhost:3000/User/profile/update-profile/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setBiography(response.data.biography);
  };
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.profile} alt="profile" src={profile} />
        <div className={styles.rowDisplay2}>
          <p className={styles.name}>{name}</p>
          {userid === id.toString() && (
          <button className={styles.button } onClick={handleLogout}>
            <p>Logout</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-width="2"
              >
                <path
                  stroke-dasharray="32"
                  stroke-dashoffset="32"
                  d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="32;0"
                  />
                </path>
                <path
                  stroke-dasharray="12"
                  stroke-dashoffset="12"
                  d="M9 12h11.5"
                  opacity="0"
                >
                  <set attributeName="opacity" begin="0.5s" to="1" />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.2s"
                    values="12;0"
                  />
                </path>
                <path
                  stroke-dasharray="6"
                  stroke-dashoffset="6"
                  d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
                  opacity="0"
                >
                  <set attributeName="opacity" begin="0.7s" to="1" />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.7s"
                    dur="0.2s"
                    values="6;0"
                  />
                </path>
              </g>
            </svg>
          </button>
           )}
        </div>
      </div>
      <div className={styles.biography}>
        <div className={styles.rowDisplay}>
          <p className={styles.name}>Biography:</p>
          {userid === id.toString() && (
            <Button text={text} onClick={handleEdit} />
          )}
        </div>
        <input
          ref={textAreaRef}
          type="textarea"
          value={biography}
          disabled={!isEditing}
          className={styles.textarea}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>
      <div className={styles.recipeDisplay}>
        <div className={styles.rowDisplay}>
          <p className={styles.specialName}>Recipes Shared:</p>
          {userid === id.toString() && (
            <Button
              text="Add Recipe!"
              onClick={() => {
                navigate(`/add-recipe/${id}`);
              }}
              id="add"
            />
          )}
        </div>
        <div className={styles.recipes}>
          {recipeArray.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
