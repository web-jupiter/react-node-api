import React from 'react';
import { DropZone, Checkbox } from 'react-formik-ui';

import ErrorBoundary from '../ErrorBoundary';

const ImageSelect = ({
  imageName,
  checkBoxName,
  imageSrcName,
  removePhoto
}) => (
  <ErrorBoundary>
    {imageSrcName ? (
      <div id={imageName} className="form__image-select">
        <button
          className="remove-img__btn"
          onClick={(e) => removePhoto(e, imageName)}
        >
          &times;
        </button>
        <Checkbox name={checkBoxName} />
        <DropZone
          className="loaded"
          name={imageName}
          style={{
            backgroundImage: `url(https://fototripr.com/api/v1/Images?name=${imageSrcName
              .split(' ')
              .join('%20')}&id=none)`,
            width: '180px'
          }}
          multiple={false}
        />
      </div>
    ) : (
      <div id={imageName} className="form__image-select">
        <button
          className="remove-img__btn"
          onClick={(e) => removePhoto(e, imageName)}
        >
          &times;
        </button>
        <Checkbox name={checkBoxName} />
        <DropZone name={imageName} multiple={false} />
      </div>
    )}
  </ErrorBoundary>
);

export default ImageSelect;
