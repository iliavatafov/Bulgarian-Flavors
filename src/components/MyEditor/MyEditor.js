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
import styles from "./MyEditor.module.css";
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
import { isValidURL } from "../../utils/validations";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const Link = ({ contentState, entityKey, children }) => {
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

const inputInitialState = {
  title: "",
  author: "",
  date: "",
  imageURL: "",
  section: "",
};

export const MyEditor = () => {
  const [textAlignment, setTextAlignment] = useState("left");
  const [input, setInput] = useState(inputInitialState);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

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

  const getContentAsRawJSON = () => {
    console.log("titleRef", titleRef);
    console.log("authorRef", authorRef);
    console.log("dateRef", dateRef);
    console.log("imageURLRef", imageURLRef);
    console.log("sectionRef", sectionRef);

    console.log();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log(rawContentState);
    return JSON.stringify(rawContentState);
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
        <Input
          type="text"
          classes="articleTitle"
          name="articleTitle"
          label="Заглавие"
          placeHolder="Въведи заглавие..."
          reference={titleRef}
          require={true}
        />
        <div className={styles["inner-inputs-container"]}>
          <Input
            type="text"
            classes="inner-input"
            name="author"
            label="Автор"
            placeHolder="Въведи автор..."
            reference={authorRef}
            require={true}
          />
          <Input
            type="date"
            classes="inner-input"
            name="date"
            label="Дата"
            placeHolder="Въведи заглавие..."
            reference={dateRef}
            require={true}
          />
        </div>
        <div className={styles["inner-inputs-container"]}>
          <Input
            type="text"
            classes="inner-input"
            name="author"
            label="Основна снимка"
            placeHolder="Въведи URL..."
            reference={imageURLRef}
            require={true}
          />
          <select className="" name="section" reference={sectionRef}>
            <option value="wine-and-food">Вино и храна</option>
            <option value="next-destination">Следваща дестинация</option>
            <option value="tourism-initiatives">Инициативи за туризма</option>
          </select>
        </div>
      </div>

      <ul className={styles["actions-wrapper"]}>
        {actions.map((action) => (
          <li key={action.id}>{action.icon}</li>
        ))}
      </ul>
      <div className={styles["editor-containter"]}>
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
      <Button
        type="button"
        value="Създай статия"
        color="green-cyan"
        handler={getContentAsRawJSON}
      />
    </div>
  );
};
