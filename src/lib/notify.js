"use client";

import { toast as baseToast } from "react-toastify";

/**
 * Otach notifications.
 *
 * One shared entry point for every user-facing message so the whole storefront
 * keeps the same restrained, luxury-store voice and styling. The classes below
 * are themed in globals.css.
 */
const OTACH_TOAST_OPTIONS = {
  className: "otach-toast",
  progressClassName: "otach-toast-progress",
  autoClose: 4000,
};

function withOtachTheme(options) {
  return { ...OTACH_TOAST_OPTIONS, ...options };
}

export const toast = {
  success: (message, options) => baseToast.success(message, withOtachTheme(options)),
  error: (message, options) => baseToast.error(message, withOtachTheme(options)),
  info: (message, options) => baseToast.info(message, withOtachTheme(options)),
  warning: (message, options) => baseToast.warning(message, withOtachTheme(options)),
  dismiss: (id) => baseToast.dismiss(id),
};
