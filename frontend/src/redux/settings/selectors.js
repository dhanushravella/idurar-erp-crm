import { createSelector } from 'reselect';

export const selectSettings = (state) => state.settings;

export const selectCurrentSettings = createSelector(
  [selectSettings],
  (settings) => settings.current.result
);

export const selectCreatedSettings = createSelector(
  [selectSettings],
  (settings) => settings.create
);

export const selectUpdatedSettings = createSelector(
  [selectSettings],
  (settings) => settings.update
);

export const selectReadSettings = createSelector([selectSettings], (settings) => settings.read);
