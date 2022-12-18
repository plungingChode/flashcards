import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (p) => {
  return /^\d+$/.test(p);
};
