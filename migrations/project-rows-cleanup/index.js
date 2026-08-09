import {at, defineMigration, unset} from "sanity/migrate";

const LEGACY_ROW_NAMES = Array.from(
  {length: 35},
  (_, index) => `row${index + 1}`,
);

export default defineMigration({
  title: "Remove migrated project row1-row35 fields",
  documentTypes: ["project"],
  migrate: {
    document(document) {
      if (!hasPopulatedRows(document.rows)) {
        return;
      }

      const populatedLegacyRows = LEGACY_ROW_NAMES.filter(
        (rowName) => Array.isArray(document[rowName]) && document[rowName].length > 0,
      );

      if (populatedLegacyRows.length === 0) {
        return;
      }

      return populatedLegacyRows.map((rowName) => at(rowName, unset()));
    },
  },
});

function hasPopulatedRows(rows) {
  return Array.isArray(rows) && rows.some((row) => row?.items?.length > 0);
}
