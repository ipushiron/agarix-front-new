import { FC, useState } from 'react';
import css from './index.module.scss';

import classNames from 'classnames';
import ProfilesList from './profiles-list';
import { IProfile } from 'redux/profiles/types';

const Profile: FC<ProfileType> = ({
  blured,
  main,
  profilesList,
  currentSelectedIndex,
  additionalProfilesListShown,
  onNickChange,
  onSkinUrlChange,
  onTagChange,
  onProfileChange,
  disabled
}) => {

  const [loadingErrored, setLoadingErrored] = useState(false);

  const { nick, skinUrl, tag } = profilesList[currentSelectedIndex];

  return (
    <div className={classNames({
      [css.wrap]: true,
      [css.blured]: blured,
      [css.main]: main,
      [css.notMain]: !main,
      [css.disabled]: disabled
    })}>
      {main && <ProfilesList
        isMain={main as boolean}
        left={main}
        items={profilesList.slice(0, 5)}
        currentSelectedIndex={currentSelectedIndex}
        onProfileSelect={onProfileChange}
      />}
      {/* {additionalProfilesListShown && // notMain && additionalShown
      <ProfilesList 
        isMain={main as boolean}
        left={!main}
        items={profilesList.slice(5)}
        currentSelectedIndex={currentSelectedIndex}
        onProfileSelect={onProfileChange}
      />} */}
      <div>
        <div className={classNames({
          [css.profileWrap]: true,
          [css.errored]: loadingErrored
        })}>
          <div className={css.imgWrap}>
            <img
              src={skinUrl}
              alt=""
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={() => setLoadingErrored(true)}
              onLoad={() => setLoadingErrored(false)}
            ></img>
          </div>
          <div className={css.errorMessage}>Could not load image.</div>
        </div>
        <div className={css.profileDataWrap}>
          <input
            className={css.profileNick}
            value={nick}
            onChange={(e) => onNickChange(e.target.value)}
            placeholder="Nick"
          ></input>
          <input
            className={css.profileSkinUrl}
            value={skinUrl}
            onChange={(e) => onSkinUrlChange(e.target.value)}
            placeholder="Skin url"
          ></input>
          {main ? (
            <input
              className={css.tag}
              placeholder="tag"
              value={tag}
              onChange={(e) => onTagChange && onTagChange(e.target.value)}
            ></input>
          ) : null}
        </div>
      </div>
      {!main && (
        <div style={{ marginLeft: 32 }}>
          <ProfilesList
            isMain={main as boolean}
            left={main}
            items={profilesList.slice(0, 5)}
            currentSelectedIndex={currentSelectedIndex}
            onProfileSelect={onProfileChange}
          />
        </div>
      )}
    </div>
  )
}

type ProfileType = {
  main?: boolean,
  blured: boolean,
  disabled?: boolean,
  profilesList: Array<IProfile>,
  currentSelectedIndex: number,
  additionalProfilesListShown: boolean,
  onNickChange: (nick: string) => void,
  onSkinUrlChange: (skinUrl: string) => void,
  onTagChange?: (tag: string) => void,
  onProfileChange: (index: number) => void,
}

export default Profile;