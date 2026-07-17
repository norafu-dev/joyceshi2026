// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About')
        ),
      S.listItem()
        .title('Archive')
        .child(
          S.document()
            .schemaType('archive')
            .documentId('archive')
            .title('Archive')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['about', 'archive'].includes(listItem.getId())
      ),
    ])
