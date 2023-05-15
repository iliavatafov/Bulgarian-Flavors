import {
  faHeading,
  faImage,
  faParagraph,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Input } from "../../components/Input/Input";

import styles from "./CreateArticle.module.css";

export const CreateArticle = () => {
  const [addedElementsList, setAddedElementsList] = useState([]);

  console.log(addedElementsList);

  const handleAddNewElement = (type) => {
    if (type === "paragraph") {
      setAddedElementsList((currentList) => {
        return [
          <Input
            type="text"
            id="title"
            label="Заглавие"
            name="title"
            require={true}
          ></Input>,
          ...currentList,
        ];
      });
    }
  };

  return (
    <div className={styles["create-article-container"]}>
      <h1 className={styles.title}>Създай нова статия</h1>
      <form>
        <Input
          type="text"
          id="title"
          label="Заглавие"
          name="title"
          require={true}
        ></Input>
        <Input
          type="text"
          id="author"
          label="Автор"
          name="author"
          require={true}
        ></Input>
        <Input
          type="text"
          id="mainImageUrl"
          label="Основна снимка (URL)"
          name="mainImageUrl"
          require={true}
        ></Input>
        <ul className={styles.actions}>
          <li onClick={() => handleAddNewElement("paragraph")}>
            <FontAwesomeIcon icon={faParagraph} />
          </li>
          <li>
            <FontAwesomeIcon icon={faHeading} />
          </li>
          <li>
            <FontAwesomeIcon icon={faImage} />
          </li>
          <li>
            <FontAwesomeIcon icon={faVideo} />
          </li>
        </ul>
      </form>
    </div>
  );
};
