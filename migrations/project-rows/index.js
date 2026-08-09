import {at, defineMigration, set} from "sanity/migrate";

const LEGACY_ROW_NAMES = Array.from(
  {length: 35},
  (_, index) => `row${index + 1}`,
);

export default defineMigration({
  title: "Copy project row1-row35 fields into the rows array",
  documentTypes: ["project"],
  migrate: {
    document(document) {
      const legacyRows = createRowsFromLegacyFields(document);

      if (legacyRows.length === 0 || hasPopulatedRows(document.rows)) {
        return;
      }

      return at("rows", set(legacyRows));
    },
  },
});

function createRowsFromLegacyFields(document) {
  return LEGACY_ROW_NAMES.flatMap((rowName, rowIndex) => {
    const items = (document[rowName] || [])
      .map((item, itemIndex) =>
        createMediaItem(item, rowIndex, itemIndex),
      )
      .filter(Boolean);

    if (items.length === 0) {
      return [];
    }

    return [
      {
        _key: `legacy-row-${String(rowIndex + 1).padStart(2, "0")}`,
        _type: "projectRow",
        items,
      },
    ];
  });
}

function createMediaItem(item, rowIndex, itemIndex) {
  const key =
    item?._key ||
    `legacy-media-${String(rowIndex + 1).padStart(2, "0")}-${itemIndex + 1}`;

  if (item?.video?.file?.asset?._ref) {
    return removeUndefinedValues({
      _key: key,
      _type: "projectVideo",
      file: item.video.file,
      thumbnail: item.video.thumbnail,
      autoplay: item.video.autoplay,
      aspectRatio: item.video.aspectRatio,
    });
  }

  if (item?.image?.asset?._ref) {
    return {
      _key: key,
      _type: "projectImage",
      image: item.image,
    };
  }

  return null;
}

function hasPopulatedRows(rows) {
  return Array.isArray(rows) && rows.some((row) => row?.items?.length > 0);
}

function removeUndefinedValues(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  );
}
