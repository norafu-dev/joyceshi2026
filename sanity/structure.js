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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'about'
      ),
    ])
