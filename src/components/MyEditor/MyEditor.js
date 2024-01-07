import { useEffect, useRef, useState } from "react";

import {
  AtomicBlockUtils,
  CompositeDecorator,
  Editor,
  EditorState,
  convertToRaw,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faHeading,
  faImage,
  faItalic,
  faLink,
  faList,
  faListOl,
  faTrash,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import { isValidURL, validateStrMinLength } from "../../utils/validations";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./MyEditor.module.css";

const Link = ({ contentState, entityKey, children }) => {
  /* eslint-disable react/prop-types */
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a
      className={styles.link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
  /* eslint-enable react/prop-types */
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export const MyEditor = () => {
  const [textAlignment, setTextAlignment] = useState("left");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [errorData, setErrorData] = useState({
    title: {
      isValid: true,
      errorMessage: "Заглавието трябва да бъде минимум 5 символа",
    },
    author: {
      isValid: true,
      errorMessage: "Името на автора трябва да бъде минимум 5 символа",
    },
    date: {
      isValid: true,
      errorMessage: "Моля въведете дата",
    },
    url: {
      isValid: true,
      errorMessage: "Моля въведете правилен формат на URL",
    },
    content: {
      isValid: true,
      errorMessage: "Съдържанието трябва да бъде минимум 2 реда",
    },
  });

  const titleRef = useRef();
  const authorRef = useRef();
  const dateRef = useRef();
  const imageURLRef = useRef();
  const sectionRef = useRef();

  const editor = useRef(null);

  useEffect(() => {
    if (editor) {
      editor.current.focus();
    }
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const onBoldClick = () => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, "ITALIC"));
  };

  const onUnderlineClick = () => {
    setEditorState((state) => RichUtils.toggleInlineStyle(state, "UNDERLINE"));
  };

  const onHeadingClick = () => {
    setEditorState((state) => RichUtils.toggleBlockType(state, "header-one"));
  };

  const onUnorderedListClick = () => {
    setEditorState((state) =>
      RichUtils.toggleBlockType(state, "unordered-list-item")
    );
  };

  const onOrderedListClick = () => {
    setEditorState((state) =>
      RichUtils.toggleBlockType(state, "ordered-list-item")
    );
  };

  const onAlignClick = (alignment) => {
    setTextAlignment(alignment);
  };

  const onLinkClick = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    let url = "";
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
    }

    let newUrl = prompt("Enter the URL:", url);
    if (newUrl) {
      newUrl = newUrl.trim();

      if (isValidURL(newUrl)) {
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url: newUrl }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newEditorState = EditorState.set(
          editorState,
          { currentContent: contentStateWithEntity },
          "create-entity"
        );

        setEditorState(
          RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          )
        );
      } else {
        alert("Invalid URL");
      }
    }
  };

  const onImageClick = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      if (isValidURL(url)) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "IMAGE",
          "IMMUTABLE",
          { src: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          " "
        );

        setEditorState(newEditorState);
      } else {
        alert("Invalid URL");
      }
    }
  };

  const ImageComponent = ({ block, contentState, blockProps }) => {
    /* eslint-disable react/prop-types */
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const { editorState, setEditorState } = blockProps;

    const handleDeleteImage = (block) => {
      const blockKey = block.getKey();
      const contentState = editorState.getCurrentContent();
      const blockMap = contentState.getBlockMap();
      const entityKey = block.getEntityAt(0);

      if (entityKey) {
        const newBlockMap = blockMap.delete(blockKey).map((contentBlock) => {
          const updatedCharacterList = contentBlock
            .getCharacterList()
            .filter((character) => character.getEntity() !== entityKey);
          return contentBlock.set("characterList", updatedCharacterList);
        });

        const newContentState = contentState.merge({
          blockMap: newBlockMap,
          selectionAfter: contentState.getSelectionAfter().merge({
            anchorKey: blockKey,
            focusKey: blockKey,
            anchorOffset: 0,
            focusOffset: 0,
            isBackward: false,
          }),
        });
        /* eslint-enable react/prop-types */

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );

        setEditorState(newEditorState);
      }
    };

    return (
      <div className={styles["image-wrapper"]}>
        <div className={styles["image-controls"]}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDeleteImage(block)}
          />
        </div>
        <img src={src} alt="DraftJS" className={styles.image} />
      </div>
    );
  };

  const blockRendererFn = (block) => {
    const type = block.getType();
    if (type === "atomic") {
      return {
        component: ImageComponent,
        editable: false,
        props: {
          editorState,
          setEditorState,
        },
      };
    }
    return null;
  };

  const createArticle = () => {
    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const date = dateRef.current.value;
    const URL = imageURLRef.current.value;
    const section = sectionRef.current.value;

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    validateInput(title, author, URL, rawContentState, date);
  };

  const validateInput = (title, author, URL, rawContentState, date) => {
    const fieldsToValidate = {
      title: {
        value: title,
        validator: (value) => validateStrMinLength(value, 5),
        errorMessage: "Заглавието трябва да бъде минимум 5 символа",
      },
      author: {
        value: author,
        validator: (value) => validateStrMinLength(value, 5),
        errorMessage: "Името на автора трябва да бъде минимум 5 символа",
      },
      date: {
        value: date,
        validator: (value) => validateStrMinLength(value, 1),
        errorMessage: "Моля въведете дата",
      },
      url: {
        value: URL,
        validator: isValidURL,
        errorMessage: "Моля въведете правилен формат на URL",
      },
      content: {
        value: rawContentState.blocks,
        validator: (value) => value.length > 1,
        errorMessage: "Съдържанието трябва да бъде минимум 2 реда",
      },
    };

    const updatedErrorData = {};

    for (const fieldKey in fieldsToValidate) {
      if (Object.prototype.hasOwnProperty.call(fieldsToValidate, fieldKey)) {
        const field = fieldsToValidate[fieldKey];
        const isValid = field.validator(field.value);
        updatedErrorData[fieldKey] = {
          isValid,
          errorMessage: isValid ? "" : field.errorMessage,
        };
      }
    }

    setErrorData(updatedErrorData);
  };

  const actions = [
    {
      id: "1",
      icon: (
        <FontAwesomeIcon
          className={styles.icon}
          icon={faBold}
          onClick={onBoldClick}
        />
      ),
    },
    {
      id: "2",
      icon: (
        <FontAwesomeIcon
          className={styles.icon}
          onClick={onItalicClick}
          icon={faItalic}
        />
      ),
    },
    {
      id: "3",
      icon: (
        <FontAwesomeIcon
          className={styles.icon}
          onClick={onUnderlineClick}
          icon={faUnderline}
        />
      ),
    },
    {
      id: "4",
      icon: (
        <FontAwesomeIcon
          icon={faHeading}
          className={styles.icon}
          onClick={onHeadingClick}
        />
      ),
    },
    {
      id: "5",
      icon: (
        <FontAwesomeIcon
          icon={faAlignLeft}
          className={styles.icon}
          onClick={() => onAlignClick("left")}
        />
      ),
    },
    {
      id: "6",
      icon: (
        <FontAwesomeIcon
          icon={faAlignCenter}
          className={styles.icon}
          onClick={() => onAlignClick("center")}
        />
      ),
    },
    {
      id: "7",
      icon: (
        <FontAwesomeIcon
          icon={faAlignRight}
          className={styles.icon}
          onClick={() => onAlignClick("right")}
        />
      ),
    },
    {
      id: "8",
      icon: (
        <FontAwesomeIcon
          icon={faList}
          className={styles.icon}
          onClick={onUnorderedListClick}
        />
      ),
    },
    {
      id: "9",
      icon: (
        <FontAwesomeIcon
          icon={faListOl}
          className={styles.icon}
          onClick={onOrderedListClick}
        />
      ),
    },
    {
      id: "10",
      icon: (
        <FontAwesomeIcon
          icon={faLink}
          className={styles.icon}
          onClick={onLinkClick}
        />
      ),
    },
    {
      id: "11",
      icon: (
        <FontAwesomeIcon
          icon={faImage}
          className={styles.icon}
          onClick={onImageClick}
        />
      ),
    },
  ];

  return (
    <div className={styles["editor-wrapper"]}>
      <div className={styles["inputs-container"]}>
        <div className={styles["title"]}>
          <Input
            type="text"
            classes={
              errorData.title.isValid ? "articleTitle" : "articleTitle error"
            }
            name="articleTitle"
            label="Заглавие"
            placeHolder="Въведи заглавие..."
            reference={titleRef}
            require={true}
          />
          {!errorData.title.isValid && (
            <p className={styles["error-message"]}>
              {errorData.title.errorMessage}
            </p>
          )}
        </div>
        <div className={styles["inner-inputs-container"]}>
          <div className={styles["inner-inputs-container-wrapper"]}>
            <Input
              type="text"
              classes={
                errorData.author.isValid ? "inner-input" : "inner-input error"
              }
              name="author"
              label="Автор"
              placeHolder="Въведи автор..."
              reference={authorRef}
              require={true}
            />
            {!errorData.author.isValid && (
              <p className={styles["error-message"]}>
                {errorData.author.errorMessage}
              </p>
            )}
          </div>
          <div className={styles["inner-inputs-container-wrapper"]}>
            <Input
              type="date"
              classes={
                errorData.date.isValid ? "inner-input" : "inner-input error"
              }
              name="date"
              label="Дата"
              placeHolder="Въведи заглавие..."
              reference={dateRef}
              require={true}
            />
            {!errorData.date.isValid && (
              <p className={styles["error-message"]}>
                {errorData.date.errorMessage}
              </p>
            )}
          </div>
        </div>
        <div className={styles["inner-inputs-container"]}>
          <div className={styles["inner-inputs-container-wrapper"]}>
            <Input
              type="text"
              classes={
                errorData.url.isValid ? "inner-input" : "inner-input error"
              }
              name="url"
              label="Основна снимка"
              placeHolder="Въведи URL..."
              reference={imageURLRef}
              require={true}
            />
            {!errorData.url.isValid && (
              <p className={styles["error-message"]}>
                {errorData.url.errorMessage}
              </p>
            )}
          </div>
          <div className={styles["inner-inputs-container-wrapper"]}>
            <select name="section" ref={sectionRef}>
              <option value="wine-and-food">Вино и храна</option>
              <option value="next-destination">Следваща дестинация</option>
              <option value="tourism-initiatives">Инициативи за туризма</option>
            </select>
          </div>
        </div>
      </div>

      <ul className={styles["actions-wrapper"]}>
        {actions.map((action) => (
          <li key={action.id}>{action.icon}</li>
        ))}
      </ul>
      <div
        className={
          errorData.content.isValid
            ? styles["editor-containter"]
            : styles["editor-containter-error"]
        }
      >
        <Editor
          className={styles["editor"]}
          textAlignment={textAlignment}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          blockRendererFn={blockRendererFn}
          ref={editor}
          placeholder="Започни статия..."
        />
      </div>
      {!errorData.content.isValid && (
        <p className={styles["error-message-content"]}>
          {errorData.content.errorMessage}
        </p>
      )}
      <Button
        type="button"
        value="Създай статия"
        color="green-cyan"
        handler={createArticle}
      />
    </div>
  );
};
