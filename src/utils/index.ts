import { Crop } from "react-image-crop";
import type { TIdTokenPayload, TRawUser } from "../types/auth";
import type {
  TDashboardPermission,
  TDashboardPermissions,
  TPermissionName,
  TPickingAppPermission,
  TPickingAppPermissions,
  TUser,
} from "../types/users";
import {
  dashboardPermissionNames,
  defaultDashboardPermissions,
  defaultPickingPermissions,
  pickingPermissionNames,
} from "../constants";

export const sleep = (time: number) =>
  new Promise(acc => setTimeout(acc, time));

export const XOR = (...operands: boolean[]) => {
  const sum = operands.reduce((prev, curr) => prev + (curr ? 1 : 0), 0);
  return sum > 0 && sum < operands.length;
};

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const gbpFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
});

export const dateFormatter = (dateString: string) => {
  const dateObj = new Date(dateString);
  const dateToday = new Date();
  const dateYesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  if (dateObj.toDateString() === dateToday.toDateString()) {
    return "Today at " + toTwelveHourFormat(dateObj);
  }

  if (dateObj.toDateString() === dateYesterday.toDateString()) {
    return "Yesterday at " + toTwelveHourFormat(dateObj);
  }

  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    // timeZone: "Europe/London",
  });
};

export const isoDateToTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};

const toTwelveHourFormat = (dateObj: Date) => {
  const hour = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes();
  const partOfDay = dateObj.getHours() < 12 ? "AM" : "PM";

  return (
    (hour < 10 ? `0${hour}:` : `${hour}:`) +
    (minutes < 10 ? `0${minutes} ` : `${minutes} `) +
    partOfDay
  );
};

/**
 * Convert a date to a given format.
 * @param date Can be "yesterday", "today", "tomorrow", a string date or a date object.
 * @param format One of "DD/MM/YYYY" or "YYYY/MM/DD".
 * @returns Returns string of date in given format.
 */
export const formatDate = (
  date: "yesterday" | "today" | "tomorrow" | string | Date,
  format: "DD/MM/YYYY" | "YYYY/MM/DD"
) => {
  // Prepare the date obj.
  let dateObj: Date;
  if (date === "yesterday") {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    dateObj = yesterday;
  } else if (date === "today") {
    const today = new Date();
    dateObj = today;
  } else if (date === "tomorrow") {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateObj = tomorrow;
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  // Format date
  const dateOfMonth = dateObj.getDate();
  // const dayOfWeek = dateObj.getDay();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  if (format === "DD/MM/YYYY") {
    return `${dateOfMonth.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  } else {
    // } else if (format === "YYYY/MM/DD") {
    return `${year}/${month.toString().padStart(2, "0")}/${dateOfMonth
      .toString()
      .padStart(2, "0")}`;
  }
};

export const formatPhoneNumber = (phone: string) => {
  if (phone.startsWith("+44")) {
    return `${phone.slice(0, 3)} ${phone.slice(3)}`;
  }
  return phone;
};

export const cropImage = (
  imgRef: React.RefObject<HTMLImageElement>,
  crop: Crop
) => {
  // Ref of the original image
  const img = imgRef.current;
  if (!img) return;
  // Dynamically Create a Canvas Element
  const canvas = document.createElement("canvas");

  // Set the Width and Height you want your resized image to be
  const scaleX = img.naturalWidth / img.width;
  const scaleY = img.naturalHeight / img.height;
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Get the "context" of the canvas
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Draw your image to the canvas
  ctx.drawImage(
    img,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // Return the image as a JPEG file in the base64 format.
  return canvas.toDataURL("image/jpeg");
};

export const getChangeInPermissions = (
  oldDashboardPermissions: TDashboardPermissions,
  newDashboardPermissions: TDashboardPermissions,
  oldPickingAppPermissions: TPickingAppPermissions,
  newPickingAppPermissions: TPickingAppPermissions
) => {
  let permissionsToAdd: TPermissionName[] = [];
  let permissionsToRemove: TPermissionName[] = [];

  (Object.keys(defaultDashboardPermissions) as TDashboardPermission[]).forEach(
    p => {
      // No change in this permission.
      if (oldDashboardPermissions[p] === newDashboardPermissions[p]) return;
      // Permission was previously not granted.
      if (oldDashboardPermissions[p] === false) {
        permissionsToAdd.push(p);
        return;
      }
      // Permission was previously granted.
      permissionsToRemove.push(p);
    }
  );

  (Object.keys(defaultPickingPermissions) as TPickingAppPermission[]).forEach(
    p => {
      // No change in this permission.
      if (oldPickingAppPermissions[p] === newPickingAppPermissions[p]) return;
      // Permission was previously not granted.
      if (oldPickingAppPermissions[p] === false) {
        permissionsToAdd.push(p);
        return;
      }
      // Permission was previously granted.
      permissionsToRemove.push(p);
    }
  );

  return { permissionsToAdd, permissionsToRemove };
};

/**
 * Check if a given string is a valid JSON or not.
 * @param str string to check.
 * @returns true if `str` is a valid JSON, false otherwise.
 */
export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Pick specific key/value pairs from an object.
 * @param object The object from which key/values are to be picked.
 * @param keys An array of keys to pick from the input object.
 * @returns A new object with only the specified keys. Value for a key is
 * undefined in the returned object if that key doesn't exist in the input
 * object.
 */
export const pickKeys = (object: { [key: string]: any }, keys: string[]) => {
  let newObject = {} as { [key: string]: any };

  keys.forEach(key => {
    newObject = {
      ...newObject,
      [key]: object[key] ?? undefined,
    };
  });

  return newObject;
};

/**
 * Remove duplicates from an array of numbers.
 * @param arr Array to check.
 * @returns Array after removing dublicate numbers.
 */
export const removeDuplicates = (arr: number[]) => {
  let temp = {} as { [key: number]: number };
  arr.forEach(item => (temp[item] = item));
  return Object.values(temp);
};

/**
 * Check if there is atleast one value/expression in a list that evaluates to `true`.
 * @param operands Operands for this operation.
 * @returns `true` if atleast one operand evaluates to `true`, `false` otherwise.
 */
export const isAny = (...operands: any[]) => {
  for (let operand of operands) if (!!operand) return true;
  return false;
};

/**
 * Check if there is atleast one key in an object whose value evaluates to true.
 * @param obj Object to evaluate.
 * @returns `true` if atleast one key's value evaluates to `true`, `false` otherwise.
 */
export const isAnyKey = <T extends {}>(obj: T) => {
  for (let value of Object.values(obj)) if (!!value) return true;
  return false;
};

/**
 * Check if all the values/expressions in a list evaluate to `true`.
 * @param operands Operands for this operation.
 * @returns `true` if all the operands evaluate to `true`, `false` otherwise.
 */
export const isAll = (...operands: any[]) => {
  for (let operand of operands) if (!operand) return false;
  return true;
};

/**
 * Check if the values of all the keys in an object evaluate to true.
 * @param obj Object to evaluate.
 * @returns `true` if all the keys' values evaluate to `true`, `false` otherwise.
 */
export const isAllKey = <T extends {}>(obj: T) => {
  for (let value of Object.values(obj)) if (!value) return false;
  return true;
};

/**
 * Check if a given string is a valid URL or not.
 * @param str String to test.
 * @returns `true` if the given string is a valid URL, `false` otherwise.
 */
export const isUrl = (str: string) => {
  const urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
  return !!str.match(urlRegex);
};

/**
 * Check if a given string is a valid email address or not.
 * @param str String to test.
 * @returns `true` if the given string is a valid email address, `false` otherwise.
 */
export const isEmail = (str: string) => {
  const emailRegex = /^[\w-.]+(\+[\w-]+)?@([\w-]+\.)+[\w-]{2,4}$/i;
  return !!str.match(emailRegex);
};

/**
 * Check if a given string is a valid phone number that can be saved in userpool.
 * @param str String to test.
 * @returns `true` if the given string is valid, `false` otherwise.
 */
export const isValidPhoneNumber = (str: string) => {
  const phoneRegex = /^\+[0-9]{4,15}$/;
  return !!str.match(phoneRegex);
};

/**
 * Check if a given string is valid to be used as a password.
 * @param str String to test.
 * @returns `true` if the given string is valid, `false` otherwise.
 */
export const isValidPassword = (str: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%&]).{8,}$/;
  return !!str.match(passwordRegex);
};

/**
 * Extracts and returns parsed payload from a JWT token.
 * @param token String containing a JWT token.
 * @returns Parsed payload from the token.
 */
export const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      ?.atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const mapRawUserToUser = (rawUser: TRawUser): TUser => {
  const idToken = parseJwt(
    rawUser.signInUserSession!.idToken.jwtToken
  ) as TIdTokenPayload;

  let dashboardPermissions = { ...defaultDashboardPermissions };
  let pickingAppPermissions = { ...defaultPickingPermissions };
  dashboardPermissionNames.forEach(p => {
    const groups = idToken["cognito:groups"] ?? [];
    if (groups.includes(p)) dashboardPermissions[p] = true;
  });
  pickingPermissionNames.forEach(p => {
    const groups = idToken["cognito:groups"] ?? [];
    if (groups.includes(p)) pickingAppPermissions[p] = true;
  });

  return {
    username: idToken["cognito:username"],
    updatedAt: idToken.updated_at,
    enabled: true,
    status: "",
    email: idToken.email,
    phoneNumber: idToken.phone_number,
    firstName: idToken.given_name,
    lastName: idToken.family_name,
    role: idToken["custom:role"],
    profilePicture: idToken.picture,
    lastLogin: idToken["custom:lastLogin"],
    dashboardPermissions,
    pickingAppPermissions,
  };
};

export const base64ToBlob = (base64: string, type: string) => {
  const binary = atob(base64.replace(/\s/g, ""));
  const buffer = new ArrayBuffer(binary.length);
  let view = new Uint8Array(buffer);
  for (var i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  // create the blob object with the given content-type
  const blob = new Blob([view], { type });
  return blob;
};

export const blobToDataUrl = (blob: Blob) => {
  return URL.createObjectURL(blob);
};

export const base64ToDataUrl = (base64: string, type: string) => {
  const blob = base64ToBlob(base64, type);
  return blobToDataUrl(blob);
};
