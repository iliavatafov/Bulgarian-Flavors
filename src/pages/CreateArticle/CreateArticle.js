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

  const [id, setId] = useState(0);

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleAddNewElement = (type) => {
    if (type === "paragraph") {
      setAddedElementsList((currentList) => {
        const currentId = id;
        const newId = currentId + 1;

        setId(newId);

        return [
          <>
            <label htmlFor={currentId}>Параграф</label>
            <textarea
              className="textarea-autosize"
              name={`paragraph ${currentId}`}
              id={currentId}
              rows="3"
              onChange={adjustTextareaHeight}
            ></textarea>
          </>,
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
          classes="input-containter"
          type="text"
          id="title"
          label="Заглавие"
          name="title"
          require={true}
        ></Input>
        <Input
          classes="input-containter"
          type="text"
          id="author"
          label="Автор"
          name="author"
          require={true}
        ></Input>

        <Input
          classes="input-containter"
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
        {addedElementsList.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </form>
    </div>
  );
};
