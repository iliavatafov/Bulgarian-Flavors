import { FC } from "react";
import { get } from "lodash";

import { useSelector, useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalSlice";

import { PROFILE_UPDATE_BUTTON_TEXT } from "../../../constants/auth";

import type { RootState } from "../../../store";
import type { ProfileModalContentProps } from "../../../types/authTypes";

import { ProfileModalTitle } from "./ProfileModalTitle";
import { Button } from "../../Button";

import styles from "./styles.module.css";

export const ProfileModalContent: FC<ProfileModalContentProps> = ({
  error,
}) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const dispatch = useDispatch();

  const updateProfileAction = () =>
    dispatch(modalActions.openModal("updateProfile"));

  return (
    <div className={styles["profile-body"]}>
      <ProfileModalTitle />
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      <div>
        <strong>E-mail:</strong> {get(currentUser, "currentUser", "")}
      </div>
      <Button
        handler={updateProfileAction}
        type="button"
        value={PROFILE_UPDATE_BUTTON_TEXT}
        color="green-cyan"
      />
    </div>
  );
};
