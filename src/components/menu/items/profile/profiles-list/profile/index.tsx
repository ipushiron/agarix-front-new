import React, { FC, useState } from 'react';
import css from './index.module.scss';

import classNames from 'classnames';

const Profile: FC<ProfileType> = ({ skinUrl, index, currentSelectedIndex, onSelect }) => {
  const [errored, setErrored] = useState(false);

  return (
    <button
      key={index}
      onClick={() => onSelect(index)}
      className={classNames({
        [css.profile]: true,
        [css.selected]: index === currentSelectedIndex,
        [css.errored]: errored
      })}
    >
      <>
        <img
          src={skinUrl}
          onLoad={() => setErrored(false)}
          onError={() => setErrored(true)}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          alt=""
        ></img>
        <div className={css.errorMsg}>No skin</div>
      </>
    </button>
  )
}

export default Profile;

type ProfileType = {
  skinUrl: string,
  index: number,
  currentSelectedIndex: number,
  onSelect: (index: number) => void
}