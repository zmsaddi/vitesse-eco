import type { StructureResolver } from 'sanity/structure'

// Helper to create singleton items
const singletonItem = (S: any, typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(typeName))

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Vitesse Eco')
    .items([
      // === PRODUITS ===
      S.listItem()
        .title('🚲 Produits')
        .child(
          S.documentTypeList('product').title('Produits')
        ),

      S.listItem()
        .title('📂 Catégories')
        .child(
          S.documentTypeList('category').title('Catégories')
        ),

      S.listItem()
        .title('🏷️ Marques')
        .child(
          S.documentTypeList('brand').title('Marques')
        ),

      S.divider(),

      // === PROMOTIONS ===
      S.listItem()
        .title('🎟️ Codes Promo')
        .child(
          S.documentTypeList('promoCode').title('Codes Promo')
        ),

      S.listItem()
        .title('⭐ Témoignages')
        .child(
          S.documentTypeList('testimonial').title('Témoignages')
        ),

      S.divider(),

      // === PAGES ===
      singletonItem(S, 'homePage', '🏠 Page d\'accueil'),
      singletonItem(S, 'aboutPage', 'ℹ️ Page À Propos'),
      singletonItem(S, 'contactPage', '📞 Page Contact'),
      singletonItem(S, 'legalPages', '⚖️ Pages Légales'),

      S.divider(),

      // === PARAMÈTRES ===
      singletonItem(S, 'siteSettings', '⚙️ Paramètres du site'),
    ])
