import { fieldStateConfig } from "../config/authFlowConfig";
import { dashboardConfig } from "../config/dashboardConfig";
import {
  AUTH_STAGE,
  GET_MAX_VARIANTS,
  STATE_SIDEBAR
} from "../config/constants";
/* eslint-disable no-magic-numbers */
export const uniqueIdGenerator = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

/**
 * @name getFieldsForCurrentState
 * @name getSubmitTextForCurrentState
 * @name getHeaderTextForCurrentState
 * @param {*} authState
 * @param {*} authStage
 * @description helper functions to get the auth form configuration
 */

export const getFieldsForCurrentState = (authState, authStage) => {
  const num = parseInt(getCurrentAuthStageValue(authStage));
  const max = GET_MAX_VARIANTS[authState];
  const stateConfig = fieldStateConfig[authState];
  return num < max ? stateConfig[num]["fields"] : [];
};

export const getSubmitTextForCurrentState = (authState, authStage) => {
  const num = parseInt(getCurrentAuthStageValue(authStage));
  const max = GET_MAX_VARIANTS[authState];
  const stateConfig = fieldStateConfig[authState];
  return num < max ? stateConfig[num]["submit"] : "";
};

export const getHeaderTextForCurrentState = (authState, authStage) => {
  const num = parseInt(getCurrentAuthStageValue(authStage));
  const max = GET_MAX_VARIANTS[authState];
  const stateConfig = fieldStateConfig[authState];
  return num < max ? stateConfig[num]["headerText"] : "";
};

export const getCurrentAuthStageValue = authStage => {
  return Object.keys(AUTH_STAGE).filter(key => {
    if (authStage === AUTH_STAGE[key]) {
      return key;
    }
  });
};

export const getNextAuthStageValue = (authStage, authState) => {
  const current = getCurrentAuthStageValue(authStage);
  const num = parseInt(current);
  const max = GET_MAX_VARIANTS[authState];
  return num < max ? AUTH_STAGE[num + 1] : null;
};

/**
 * @name getFieldsForPage
 * @description Gives fields and header for the page selected
 */

export const getFieldsForPage = authStage => {
  let page = STATE_SIDEBAR[authStage];
  let sectionsArr = dashboardConfig[page]["sections"];
  return sectionsArr.reduce((accumulator, section) => {
    let fields = dashboardConfig[page][section];
    accumulator[section] = fields;
    return accumulator;
  }, {});
};

export const getHeaderForPage = authStage => {
  let page = STATE_SIDEBAR[authStage];
  return dashboardConfig[page]["header"];
}