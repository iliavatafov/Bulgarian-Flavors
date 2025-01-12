import { useCallback, useMemo, useState } from "react";

import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  ContentBlock,
  ContentState,
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
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { isValidURL } from "../utils/validations";

import { EditorLink } from "../components/Modals/ManageArticlesModal/EditorLink";
import { EditorImage } from "../components/Modals/ManageArticlesModal/EditorImage";
import { EditorVideo } from "../components/Modals/ManageArticlesModal/EditorVideo";

import styles from "../components/Modals/ManageArticlesModal/styles.module.css";

const useEditorActions = () => {
  const [textAlignment, setTextAlignment] = useState("left");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const findLinkEntities = (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
  ) => {
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
      component: EditorLink,
    },
  ]);

  const handleKeyCommand = useCallback(
    (command: string) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setEditorState(newState);
        return "handled";
      }

      return "not-handled";
    },
    [editorState]
  );

  const onBoldClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleInlineStyle(state, "BOLD")
    );
  }, []);

  const onItalicClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleInlineStyle(state, "ITALIC")
    );
  }, []);

  const onUnderlineClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleInlineStyle(state, "UNDERLINE")
    );
  }, []);

  const onHeadingClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleBlockType(state, "header-one")
    );
  }, []);

  const onUnorderedListClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleBlockType(state, "unordered-list-item")
    );
  }, []);

  const onOrderedListClick = useCallback(() => {
    setEditorState((state: EditorState) =>
      RichUtils.toggleBlockType(state, "ordered-list-item")
    );
  }, []);

  const onAlignClick = useCallback((alignment: string) => {
    setTextAlignment(alignment);
  }, []);

  const promptForURL = useCallback((defaultValue = ""): string | null => {
    const url = prompt("Enter the URL:", defaultValue);
    return url ? url.trim() : null;
  }, []);

  const onLinkClick = useCallback(() => {
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
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });

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
  }, [editorState]);

  const onImageClick = useCallback(() => {
    const url = promptForURL();
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
  }, [editorState, promptForURL]);

  const onVideoClick = useCallback(() => {
    const url = promptForURL("Enter the YouTube video URL:");
    if (url) {
      if (isValidURL(url)) {
        const embedUrl = url.replace("watch?v=", "embed/");
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "VIDEO",
          "IMMUTABLE",
          { src: embedUrl }
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
  }, [editorState, promptForURL]);

  const blockRendererFn = useCallback(
    (block: ContentBlock) => {
      const type = block.getType();
      if (type === "atomic") {
        const entity = block.getEntityAt(0);
        const entityType =
          entity && editorState.getCurrentContent().getEntity(entity).getType();

        if (entityType === "IMAGE") {
          return {
            component: EditorImage,
            editable: false,
            props: {
              editorState,
              setEditorState,
            },
          };
        } else if (entityType === "VIDEO") {
          return {
            component: EditorVideo,
            editable: false,
            props: {
              editorState,
              setEditorState,
            },
          };
        }
      }
      return null;
    },
    [editorState]
  );

  const actions = useMemo(
    () => [
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
      // {
      //   id: "5",
      //   icon: (
      //     <FontAwesomeIcon
      //       icon={faAlignLeft}
      //       className={styles.icon}
      //       onClick={() => onAlignClick("left")}
      //     />
      //   ),
      // },
      // {
      //   id: "6",
      //   icon: (
      //     <FontAwesomeIcon
      //       icon={faAlignCenter}
      //       className={styles.icon}
      //       onClick={() => onAlignClick("center")}
      //     />
      //   ),
      // },
      // {
      //   id: "7",
      //   icon: (
      //     <FontAwesomeIcon
      //       icon={faAlignRight}
      //       className={styles.icon}
      //       onClick={() => onAlignClick("right")}
      //     />
      //   ),
      // },
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
      {
        id: "12",
        icon: (
          <FontAwesomeIcon
            icon={faVideo}
            className={styles.icon}
            onClick={onVideoClick}
          />
        ),
      },
    ],
    [
      onBoldClick,
      onItalicClick,
      onUnderlineClick,
      onHeadingClick,
      onAlignClick,
      onUnorderedListClick,
      onOrderedListClick,
      onLinkClick,
      onImageClick,
      onVideoClick,
    ]
  );

  return {
    editorState,
    actions,
    textAlignment,
    handleKeyCommand,
    blockRendererFn,
    setEditorState,
    decorator,
  };
};

export default useEditorActions;
