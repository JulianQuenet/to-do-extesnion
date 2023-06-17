//@ts-check

export const RATING = {
  priority: "High",
  important: "Medium",
  normal: "Low",
};

export const TYPES = {
  "&#128203;": "Normal",
  "&#128187;": "Work",
  "&#128218;": "Studies",
  "&#127969;": "Home",
  "&#127867;": "Social",
  "&#9978;": "Outdoors",
  "&#127947;": "Exercise",
  "&#128134;": "Leisure",
  "&#9889;": "5-min",
};

/**
 * 
 * @returns {String}
 */
const createUUID = () => {
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  return uuid;
};

/**
 * @typedef {Object} Tasks
 * @prop {String} id
 * @prop {String} title
 * @prop {String} urgency
 * @prop {String} type
 * @prop {String} [due]
 * @prop {Boolean} completed
 */

/**
 * @typedef {Object} State
 */
export const State = {};

/**
 *
 * @param {State} state
 * @param {Object} task
 */
export const addTaskToState = (state, task) => {
  state[task.id] = task;
};

/**
 *
 * @param {Object} data
 * @returns {Tasks}
 */
export const createTaskObject = (data) => {
  const { title, urgency, due, type } = data;
  const task = {
    id: createUUID(),
    title,
    urgency,
    due: due || "",
    type,
    completed: false,
  };

  return task;
};


/**
 * 
 * @param {*} param 
 * @param {String} arg 
 * @returns 
 */
export const getNode = (param, arg) =>{
  const result = param.querySelector(`${arg}`)
  if(!(result instanceof HTMLElement)){
    throw new Error("Node not found in DOM")
  }
  return result
}